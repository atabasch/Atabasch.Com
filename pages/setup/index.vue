<template>

    <div class="row justify-content-center">
        <div class="col-6">
            <h2>Kurulum İşlemleri</h2><hr>

            <div class="card mb-3">
                <div class="card-header">Site Bilgileri</div>
                <div class="card-body">

                    <div class="mb-3">
                        <label class="form-label">Site Başlığı</label>
                        <input type="text" class="form-control form-control-sm" v-model="configData.site_title">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Açıklama</label>
                        <textarea name="" id="" cols="30" rows="3" class="form-control" v-model="configData.site_description"></textarea>
                    </div>


                </div>
            </div>


            <div class="card mb-3">
                <div class="card-header">Yönetici Bilgileri</div>
                <div class="card-body">
                    <div class="mb-2">
                        <label for="" class="form-label">Kullanıcı Adı</label>
                        <input type="text" class="form-control form-control-sm" v-model="user.userUsername">
                    </div>

                    <div class="mb-2">
                        <label for="" class="form-label">Parola</label>
                        <input type="password" class="form-control form-control-sm" v-model="user.userPassword">
                    </div>

                    <div class="mb-2">
                        <label for="" class="form-label">E-Posta</label>
                        <input type="email" class="form-control form-control-sm" v-model="user.userEmail">
                    </div>

                    <div class="mb-2">
                        <label for="" class="form-label">Görünür Ad</label>
                        <input type="text" class="form-control form-control-sm" v-model="user.userDisplayName">
                    </div>
                </div>
            </div>


            <div class="text-end">
                <button class="btn btn-primary" @click="sendToSetup()">Kurulumu Başlat</button>
            </div>

        </div>
    </div>

</template>

<script setup>
import {ref, toRaw} from "vue";
import useBuild from "../../composables/useBuild";
const { $getUrl } = useNuxtApp()

definePageMeta({
    layout: 'setup'
})

const configData = ref({
    site_title: '',
    site_description: ''
})
const user = ref({
    userUsername : '',
    userPassword : '',
    userEmail : '',
    userStatus : 1,
    userLevel : 4,
    userCover : '',
    userDisplayName : '',
    data: {
        userFirstname: '',
        userLastname: '',
        userBirthdate: null,
        userGender: 'none'
    }
})

const sendToSetup = () => {
    useBuild(toRaw(configData.value), toRaw(user.value)).then(result => {
        if(result.status){
            useRouter().replace( $getUrl.login() )
        }
    }).catch(err => {
        alert(err)
    })
}

</script>

<style scoped>

</style>
