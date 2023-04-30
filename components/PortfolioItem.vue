<template>
    <div class="workItem box-dark-blue p-3 h-100">
        <NuxtLink :to="$getUrl.post(item.postSlug)">
            <figure class="img-filter-dark-blue ratio ratio-4x3">
                <img v-if="item.postCover" :src="item.postCover" class="img-fluid" />
                <figcaption></figcaption>
            </figure>
        </NuxtLink>
        <div class="p-2">
            <h4 class="my-3 title"><NuxtLink :to="$getUrl.post(item.postSlug)" class="link-light text-decoration-none">{{ item.postTitle }}</NuxtLink></h4>
            <p class="description">{{ item.postDescription.substr(0, 255) }}</p>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item = toRef(props, 'item')
</script>

<style scoped>
    .title{
        font-size: 24px;
        line-height: 32px;
        /*height: 64px;*/
        /*overflow: hidden;*/
    }

    .description {
        font-size: 18px;
        line-height: 28px;
        /*height: 84px;*/
        /*overflow: hidden;*/
    }
</style>
