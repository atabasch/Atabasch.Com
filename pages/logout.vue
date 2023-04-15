<template>
</template>

<script setup>
import useUser from "../composables/useUser";
// INITIALIZE
definePageMeta({ layout: 'logon' })
useHead({ title: 'Çıkış Yap' })

await useUser().logout()
useRouter().replace('/login')
</script>
