<template>
    <PanelTitleBox :title="'Yeni Kullanıcı Oluştur'" />
    <panel-form-user @created="onCreate($event)" />
</template>

<script setup>
definePageMeta({layout: 'admin' })
useHead({ title: 'Yeni Kullanıcı hesabı Oluştur' })
const router = useRouter()

function onCreate(user){
    router.push({path: '/aswpanel/users/'+user.userId})
}
</script>

<style scoped>

</style>
