<template>
    <Breadcrumb :title="getTerm?.termTitle || ''"/>
    <component :is="getTheComponent" :items="items" :currentPage="getCurrentPageNumber"></component>
</template>

<script setup>
import {navigateTo, useAsyncData, useRoute, useRuntimeConfig} from "nuxt/app";
import {computed, ref, watch} from "vue";
const {$getHeadDatasByTerm} = useNuxtApp()


// Componentler
import Breadcrumb from "../../components/Breadcrumb";
import Default from "../../components/Templates/Taxonomy/Default.vue";
import {useHead} from "@unhead/vue";
import {useGetPosts, useGetTerm} from "../../composables/useGetDatas";



// Route işlemleri
const route = useRoute()
const {slug: paramTaxonomy, term: paramTerm} = route.params

// Tanımlamalar
const term = ref(false)
const items = ref([])
const {public: config} = useRuntimeConfig()
useHead(() => $getHeadDatasByTerm(term.value))

const components = {
    default: Default
}

// Computeds
const getTheComponent   = computed(() => components[paramTaxonomy] || components.default)
const getTerm           = computed(() => term.value)

const getItems = (term) => {
    useGetPosts({
        term: term,
        page: getCurrentPageNumber.value,
        limit: config.postsPerPage || 10
    }).then(data => {
        if(data.status && data.posts){
            items.value = data.posts
        }
    })
}

useAsyncData(async () => {
    let {status: rStatus, term: rTerm} = await useGetTerm({ term: paramTerm })
    if(rStatus && rTerm){
        term.value = rTerm
        getItems(paramTerm)
    }else{
        navigateTo('/404')
    }
})



const getCurrentPageNumber = computed(() => {
    return parseInt(route.query.page || 1)
})

watch(() => route.query, async () => {
    getItems(paramTerm)
})

</script>

<style scoped>

</style>
