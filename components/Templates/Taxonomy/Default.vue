<template>
    <div class="row">
        <div class="col-12 col-lg-8">
            <template v-if="getPosts" v-for="(post, key) in getPosts" :key="key">
                <BlogListItemVertical v-if="key<1" :item="post" />
                <BlogListItemHorizontal v-else :item="post" />
            </template>
<!--            <template v-if="getPosts.length < 1">-->
<!--                <p class="mt-3 mb-5 alert alert-warning border-0 text-center fs-5 fw-normal">Listelenecek içerik bulunamadı</p>-->
<!--            </template>-->

            <div class="overflow-hidden">
                <NuxtLink v-if="getPrevPageNumber" :to="route.path+'?page='+getPrevPageNumber" class="btn btn-dark float-start"><em class="bi bi-chevron-left"></em> Önceki Sayfa</NuxtLink>
                <NuxtLink v-if="getNextPageNumber" :to="route.path+'?page='+getNextPageNumber" class="btn btn-dark float-end"><em class="bi bi-chevron-right"></em> Sonraki Sayfa</NuxtLink>
            </div>

        </div>
        <div class="col-12 col-lg-4">
            <BlogSidebar/>
        </div>
    </div>
</template>

<script setup>
import BlogSidebar from "../../Blog/Sidebar";
import {useRoute, useRuntimeConfig} from "nuxt/app";
import {computed, ref, toRef} from "vue";
const {public: config} = useRuntimeConfig()
const route = useRoute()
const props = defineProps({
    items: {
        type: Array,
        default: []
    },
    currentPage: {
        type: Number,
        default: 1
    },
})

const getPosts = computed(() => {
    return props.items
})


const getPrevPageNumber = computed(() => {
    return props.currentPage < 2 ? null : props.currentPage - 1;
})
const getNextPageNumber = computed(() => {
    return getPosts.value.length < config.postsPerPage ? null : props.currentPage + 1;
})

</script>

<style scoped>

</style>
