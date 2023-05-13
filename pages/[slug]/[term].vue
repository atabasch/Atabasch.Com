<template>

    <Breadcrumb :title="getTerm?.termTitle || ''"/>
    <component :is="getTheComponent"></component>
</template>

<script setup>
import {navigateTo, useAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";
import {computed, onMounted, ref, watch} from "vue";
import storePosts from "../../stores/posts"
const {$getHeadDatasByTerm} = useNuxtApp()


// Componentler
import Breadcrumb from "../../components/Breadcrumb";
import Default from "../../components/Templates/Taxonomy/Default.vue";
import {useHead} from "@unhead/vue";
import {useGetTerm} from "../../composables/useGetDatas";



// Route işlemleri
const route = useRoute()
const {slug: paramTaxonomy, term: paramTerm} = route.params

// Tanımlamalar
const term = ref(false)
const {public: config} = useRuntimeConfig()
useHead(() => $getHeadDatasByTerm(term.value))

const components = {
    default: Default
}

// Computeds
const getTheComponent   = computed(() => components[paramTaxonomy] || components.default)
const getTerm           = computed(() => term.value)




useAsyncData(async () => {
    storePosts().setPageNumber(parseInt(route.query.page || 1))
    let {status: rStatus, term: rTerm} = await useGetTerm({ term: paramTerm })
    if(rStatus && rTerm){
        term.value = rTerm
        await storePosts().loadPostsByTerm(paramTerm)
    }else{
        navigateTo('/404')
    }
})

watch(() => route.query, async () => {
    storePosts().setPageNumberAndLoadPosts(parseInt(route.query.page || 1), paramTerm)
})

onUnmounted(() => {
    storePosts().resetStates()
})



</script>

<style scoped>

</style>
