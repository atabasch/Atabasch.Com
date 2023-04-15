<template>
<div class="row">
    <div class="col-12 col-md-9">
        <div class="row">
            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">Kullanıcı Adı</label>
                <input class="form-control" type="text" v-model="user.userUsername">
            </div>

            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">E-Posta Adresi</label>
                <input class="form-control" type="email" v-model="user.userEmail">
            </div>

            <div class="col-12 mb-3">
                <label for="" class="form-check-label mb-2">Hesap Şifresi</label>
                <input class="form-control" type="password" v-model="user.userPassword">
            </div>

            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">İsim</label>
                <input class="form-control" type="text" v-model="user.data.userFirstname">
            </div>

            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">Soyisim</label>
                <input class="form-control" type="text"  v-model="user.data.userLastname">
            </div>


            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">Doğum Tarihi</label>
                <input class="form-control" type="date"  v-model="user.data.userBirthdate">
            </div>

            <div class="col-12 col-md-6 mb-3">
                <label for="" class="form-check-label mb-2">Cinsiyet</label>
                <select class="form-select" v-model="user.data.userGender">
                    <option v-for="(v,i) in $userGenders" :key="i" :value="v.value">{{ v.label }}</option>
                </select>
            </div>



            <div class="col-12 mb-3">
                <label for="" class="form-check-label mb-2">Kullanıcılara görünecek isim</label>
                <select class="form-select" v-model="user.userDisplayName" :disabled="!getDisplayNameOptions">
                    <option v-for="(v,i) in getDisplayNameOptions" :key="i">{{ v }}</option>
                </select>
            </div>
        </div><!-- .col -->
    </div><!-- .col-12 ... -->

    <!-- ---------------------- -->

    <div class="col">
        <div class="row">

            <div class="mb-2">
                <label for="" class="form-label">Kapak Fotoğrafı</label>
                <div class="coverPlaceholderArea ratio ratio-4x3" @click="$refs.refInputCover.click()">
                    <div v-if="!user.userCover"><strong>Tıkla & Seç</strong></div>
                    <img :src="user.userCover" class="img-fluid" v-if="user.userCover" />
                </div>
                <input type="file" class="form-control d-none" ref="refInputCover" @change="changeCover($event)">
            </div>


            <div class="col-12 mb-3">
                <label for="" class="form-check-label mb-2">Hesap Durumu</label>
                <select class="form-select" v-model="user.userStatus">
                    <option value="1">Aktif </option>
                    <option value="0">Pasif </option>
                </select>
            </div>

            <div class="col-12 mb-3">
                <label for="" class="form-check-label mb-2">Seviye</label>
                <select class="form-select" v-model="user.userLevel">
                    <option v-for="(v, i) in Object.values($userLevels)" :key="i" :value="v.value">{{ v.label}}</option>
                </select>
            </div>

            <div class="col-12 text-end">
                <button v-if="!user.userId" class="btn btn-primary" @click="sendToCreate()" :disabled="!isActiveForSend"><i class="bi bi-check2"></i> Hesabı Oluştur</button>
                <button v-if="user.userId" class="btn btn-success" @click="sendToUpdate()" :disabled="!isActiveForSend"><i class="bi bi-check2"></i> Hesabı Güncelle</button>
            </div>


        </div><!-- .row -->
    </div><!-- .col -->
</div><!-- .row -->
</template>

<script setup>
// IMPORTS
import {ref, computed, reactive, defineEmits, defineProps, toRaw} from "vue"
const {$showToast} = useNuxtApp()


// INIT
const emits = defineEmits(['created', 'updated'])
const props = defineProps({
    user: {
        type: Object,
        default: () => ({
            userUsername : '',
            userPassword : '',
            userEmail : '',
            userStatus : 1,
            userLevel : 1,
            userCover : '',
            userDisplayName : '',
            data: {
                userFirstname: '',
                userLastname: '',
                userBirthdate: null,
                userGender: 'none'
            }
        })
    }
})

const user = reactive({...props.user})

// COMPUTEDS
const getDisplayNameOptions = computed(() => {
    if(user.userUsername.length > 0 &&
        user.data.userFirstname.length > 0 &&
        user.data.userLastname.length > 0){
        return [
            `${user.userUsername}`,
            `${user.data.userFirstname}`,
            `${user.data.userLastname}`,
            `${user.data.userFirstname} ${user.data.userLastname}`,
            `${user.data.userLastname} ${user.data.userFirstname}`,
            `${user.data.userFirstname} ${user.data.userLastname[0] || ''}.`,
            `${user.data.userFirstname[0] || ''}. ${user.data.userLastname}`,
            `${user.data.userLastname} ${user.data.userFirstname[0] || ''}.`,
            `${user.data.userLastname[0] || ''}. ${user.data.userFirstname}`
        ]
    }else{
        return false
    }
})

const isActiveForSend = computed(() => {
    return  user.userUsername.length > 2 &&
            user.userEmail.length > 7 &&
            user.userPassword.length > 7 &&
            user.userDisplayName.length > 2
})

// METHODS
const sendToCreate = () => {
    useUser().create(toRaw(user)).then(async (result) => {
        if(result.status && result.user){
            $showToast('Kullanıcı hesabı oluşturuldu')
            emits('created', {...result.user})
        }else{
            $showToast(result.message || 'Beklenmedik bir hata oluştu', 'error')
        }
    }).catch(err => $showToast('Beklenmedik bir hata oluştu', 'error') )
}

const sendToUpdate = () => {

}

const changeCover = (event) => {
    if(event.target.files.length){
        let coverFile = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = (e) => {
            user.userCover = reader.result
        }
        reader.readAsDataURL(coverFile)
    }
}

</script>

<style scoped>

</style>
