<template>
    <Navbar  />
    <div class="d-flex flex-column w-100 position-absolute justify-content-between" style="min-height: calc(100vh - 85px)">
        <div class="container">
            <Error404/>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
import {storeSite} from "./stores/site"
import {useAsyncData} from "nuxt/app";
import Footer from "./components/Footer";
import Error404 from "./components/404";

useHead({
    title: 'Sayfa Bulunamadı - Atabasch',
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

