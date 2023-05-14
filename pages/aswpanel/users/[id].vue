<template>
    <div>
        <PanelTitleBox :title="'Düzenle: '" />
        <panel-form-user @updated="onUpdate($event)" v-if="user" :user="user" />
    </div>
</template>

<script setup>
import {ref} from "vue"
definePageMeta({layout: 'admin' })
useHead({ title: 'Kullanıcı Hesabını Düzenle' })
const route = useRoute()
const router = useRouter()
const {id} = route.params

const user = ref(null)

useUser().getOne(id).then( async (result) => {
    if(result.status && result.user){
        user.value = result.user
    }else{
        router.push({ path: '/aswpanel/users' })
    }
} ).catch(err => {
    router.push({ path: '/aswpanel/users' })
})


function onUpdate(user){
    // router.push({path: '/aswpanel/user/'+user.userId})
}
</script>

<style scoped>

</style>
