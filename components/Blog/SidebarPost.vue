<template>
    <div class="box-dark-blue p-2 rounded mb-3">
        <NuxtLink :to="$getUrl.post(item.postSlug)" class="d-flex  text-decoration-none ">
            <figure class="img-filter-dark-blue rounded ratio ratio-4x3 img-figure">
                <img :src="post.postCover" class="rounded w-100">
                <figcaption></figcaption>
            </figure>
            <div class="ps-2 d-flex flex-column">
                <h5 class="fs-6"><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none">{{ post.postTitle }}</NuxtLink></h5>
                <span><i class="bi bi-calendar"></i> 4 Nisan 2022 </span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const post  = toRef(props, 'item')
</script>

<style scoped>
/**
todo: çok okunanların resimlerinin boyutlarını ayarlar
 */
</style>
