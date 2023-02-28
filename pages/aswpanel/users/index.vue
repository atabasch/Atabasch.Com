<template>
    <PanelTitleBox title="Kullanıcı Hesapları">
        <NuxtLink :to="$getUrl.panel('/users/create')" class="btn btn-sm btn-primary">Yeni Hesap Oluştur</NuxtLink>
    </PanelTitleBox>
    <table class="table table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th></th>
                <th>Kullanıcı</th>
                <th>Ad & Soyad</th>
                <th style="width: 270px">E-Posta</th>
                <th style="width: 25px">Rol</th>
                <th style="width: 25px">D</th>
                <th style="width: 110px">Kayıt</th>
                <th style="width: 110px">Son Giriş</th>
                <th style="width: 125px">Cinsiyet</th>
                <th style="width: 90px"></th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="(user, index) in users" :key="index">
                <td></td>
                <td class="fw-bold"><NuxtLink :to="$getUrl.panel('/users/'+user.userId)" class="text-primary fw-medium text-decoration-none">{{ user.userUsername }}</NuxtLink></td>
                <td>{{ user.data.userFirstname + ' ' + user.data.userLastname }}</td>
                <td><a :href="'mailto:'+user.userEmail">{{ user.userEmail }}</a></td>

                <!-- LEVEL -->
                <td>
                    <div class="dropdown-left d-grid" style="width: 100px">
                        <button data-bs-toggle="dropdown" aria-expanded="false" :class="'text-start btn btn-sm btn-'+$userLevels[user.userLevel].color"><i :class="$userLevels[user.userLevel].icon"></i> {{ $userLevels[user.userLevel].label }}</button>
                        <ul class="dropdown-menu" style="width: 25px; padding: 0">
                            <li v-for="(v, i) in $userLevels" :key="i" class="d-grid">
                                <button @click="sendToChangeCol({userLevel: v.value.toString()}, index)" v-if="user.userLevel!==v.value" :class="'text-start btn btn-fluid btn-'+v.color"><i :class="v.icon"></i> {{ v.label }}</button>
                            </li>
                        </ul>
                    </div>
                </td>

                <!-- STATUS -->
                <td style="width: 20px;">
                        <button v-if="user.userStatus" class="btn text-start btn-sm btn-success" @click="sendToChangeCol({userStatus:false}, index)"><i class="bi bi-check2"></i></button>
                        <button v-if="!user.userStatus" class="btn text-start btn-sm btn-danger" @click="sendToChangeCol({userStatus:true}, index)"><i class="bi bi-x"></i></button>
                </td>

                <!-- USER DATES -->
                <td>{{ $getDateFormat(user.userCreatedAt, 'dateTimeMedium') }}</td>
                <td>{{ !user.userLoggedAt? '-' : $getDateFormat(user.userLoggedAt, 'dateTimeMedium') }}</td>

                <!-- USER GENDER -->
                <td>
                    <button v-if="user.data.userGender==='male'" class="w-100 text-start btn-sm btn btn-primary" @click="sendToChangeCol({data: {userGender: 'female'}  }, index)"><i class="bi bi-gender-male"></i> Erkek</button>
                    <button v-if="user.data.userGender==='female'" class="w-100 text-start btn-sm btn btn-danger" @click="sendToChangeCol({data: {userGender: 'none'}  }, index)"><i class="bi bi-gender-female"></i> Kadın</button>
                    <button v-if="user.data.userGender==='none'" class="w-100 text-start btn-sm btn btn-secondary" @click="sendToChangeCol({data: {userGender: 'male'}  }, index)"><i class="bi bi-gender-ambiguous"></i> Belirtilmedi</button>
                </td>

                <td>
                    <NuxtLink :to="$getUrl.panel('/users/'+user.userId)" class="btn btn-sm btn-outline-primary me-1 border-none"><i class="bi bi-pencil"></i></NuxtLink>
                    <button v-if="user.userStatus===false" @click="sendToDelete(user, index)" class="btn btn-sm btn-outline-danger me-1 border-none"><i class="bi bi-trash"></i></button>
                </td>



            </tr>

        </tbody>
    </table>
</template>

<script setup>
import {ref, computed} from "vue"
definePageMeta({layout:'admin'})
useHead({ title: 'Kullanıcı Hesap Listesi' })
// DATAS
const users = ref([])
const {$showToast, $showAlert} = useNuxtApp()

// FETCH
useFetch('/api/panel/user?include=data').then( async ({data: {value: {status, users: apiUsers}}, error}) => {
    users.value = apiUsers
} )

// COMPUTEDS
const getUsers = computed(() => users.value)

// METHODS
const sendToChangeCol = (datas, index) => {
    let user = users.value[index]
    let postDatas = {...datas, userId: user.userId }
    useFetch('/api/panel/user/update', { method:'POST',
        body: {
            user: toRaw(postDatas)
        } }).then( async ({data, error}) => {
        if(data.value.status && data.value.user){
            users.value.splice(index, 1, data.value.user)
            $showToast(data.value.message || 'Kullanıcı Güncellendi')
        }else{
            $showToast(data.value.message || 'Güncelleme Başarısız', 'error')
        }
    } ).catch(err => {
         $showToast('Beklenmedik bir sorun oluştu', 'error')
    })
}


const sendToDelete = (user, index) => {
    let localUsers = new Promise(async (resolve) => {
        let {status, users} = await $fetch('/api/panel/user?fields=userId,userUsername&level=1,2,3,4')
        let result = await users.reduce( (acc, item) => {
            acc[item.userId] = item.userUsername
            return acc
        }, {})
        delete result[user.userId]
        resolve(result)
    })

    $showAlert({
        type: 'warning',
        title: `Kullanıcı Silinecek!`,
        body: `<strong>${user.userUsername}</strong> kullanıcısını silmek üzeresiniz. Bu işlemi geri almak mümkün olmayacak. Silmek istediğinize emin misiniz? <hr>`,
        confirmText: 'Eminim, Sil',
        options: {
            input: 'select',
            inputOptions: localUsers,
            inputLabel: 'Silinen kullanıcı hesabına ait olan içerikler hangi hesaba aktarılsın?'
        }
    }, function(result){

        useFetch('/api/panel/user/delete', {method: 'POST', body: {user: toRaw(user), authorId:result.value}}).then(async ({data}) => {
            if(data.value.status){
                users.value.splice(index, 1)
                $showToast(data.value.message || 'Kullanıcı Silindi')
            }else{
                $showToast(data.value.message || 'Kullanıcı Silinemedi', 'error')
            }
        }).catch(err => { $showToast('Beklenmedik bir hata oluştu', 'error') })

    }) // function result
} // sendToDelete


</script>

<style scoped>

</style>
