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
                <NuxtLink v-if="storePosts().getPrevPageNumber" :to="route.path+'?page='+storePosts().getPrevPageNumber" class="btn btn-dark float-start"><em class="bi bi-chevron-left"></em> Önceki Sayfa</NuxtLink>
                <NuxtLink v-if="storePosts().getNextPageNumber" :to="route.path+'?page='+storePosts().getNextPageNumber" class="btn btn-dark float-end"><em class="bi bi-chevron-right"></em> Sonraki Sayfa</NuxtLink>
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
import {computed, ref} from "vue";
const {public: config} = useRuntimeConfig()
const route = useRoute()

import storePosts from "../../../stores/posts"

const getPosts = computed(() => {
    return storePosts().getPosts
})

</script>

<style scoped>

</style>
