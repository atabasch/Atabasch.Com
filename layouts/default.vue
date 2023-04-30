<template>
    <Navbar  />
<div class="container">
    <slot />
</div>
</template>

<script setup>
import {storeSite} from "@/stores/site"
import {useAsyncData} from "nuxt/app";

useHead({
    title: 'Atabasch - Furkan Atabaş',
    link: [
        { rel:'stylesheet', href: '/styles/default.css' },
        { rel:'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
        { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap'},

    ],
    htmlAttrs: {
        lang: 'tr',
        'data-bs-theme': 'dark'
    },
    bodyAttrs: {
        class: '',
    }
})

let useStoreSite = storeSite()
useAsyncData(async () => {
    $fetch('/api/site/init').then(async (response) => {
        if(response.status){
            await useStoreSite.fillDatasFromInit({...response})
        }
    })

})
</script>

