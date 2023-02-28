<template>
    <PanelTitleBox :title="'Düzenle: '" />
    <panel-form-user @updated="onUpdate($event)" v-if="user" :user="user" />
</template>

<script setup>
import {ref} from "vue"
definePageMeta({layout: 'admin' })
useHead({ title: 'Kullanıcı Hesabını Düzenle' })
const route = useRoute()
const router = useRouter()
const {id} = route.params

const user = ref(null)

useFetch('/api/panel/user/'+id).then( async ({data, error}) => {
    if(data.value.status && data.value.user){
        user.value = data.value.user
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
