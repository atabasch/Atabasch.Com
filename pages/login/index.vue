<template>
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="sendToLogin()">
            <h3 class=" text-center"><i class="bi bi-laptop"></i> Atabasch</h3>
            <hr>



            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInput" placeholder="Kullanıcı Adı" v-model="user.name">
                <label for="floatingInput">Kullanıcı Adı</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Parola" v-model="user.password">
                <label for="floatingPassword">Parola</label>
            </div>

            <div class="checkbox mb-3 form-check">
                <label>
                    <input type="checkbox" :value="true" v-model="user.remember"> Beni Hatırla
                </label>
            </div>

            <div v-if="alert.showed" class="alert alert-danger" role="alert">{{ alert.message }}</div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Giriş Yap</button>


        </form>
    </main>
</template>

<script setup>
// IMPORTS
import {ref, toRaw} from "vue";
import useAuth from "../../composables/useAuth";


// INITIALIZE
definePageMeta({ layout: 'logon' })
useHead({ title: 'Giriş Yap' })
let {to: toPath} = useRoute().query


const user = ref({
    name: '',
    password: '',
    remember: false
})
const alert = ref({
    showed: false,
    message: 'Kullanıcı girişi başarısız oldu'

})

// METHODS
const sendToLogin = () => {
    if(user.value.name.length > 2 && user.value.password.length > 5){
         useUser().login(toRaw(user.value)).then(result => {
             if(result.status && result.token){
                useAuth().set(result.user, result.token)
                useRouter().push(toPath || '/')
             }else{
                 alert.value.showed = true
                 alert.value.message = result.message || 'Kullanıcı girişi başarısız oldu'
             }
         }).catch((err) => {
             alert.value.showed = true
             alert.value.message = 'Beklenmedik bir hata oluştu: ' + err
         })
    }
}

</script>
