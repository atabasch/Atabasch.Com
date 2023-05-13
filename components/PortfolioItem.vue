<template>
    <div class="workItem h-100">
        <NuxtLink :to="$getUrl.post(item.postSlug)">
            <figure class="img-filter-dark-blue ratio ratio-4x3">
                <img v-if="item.postCover" :src="item.postCover" class="img-fluid object-fit-cover" />
                <span class="markedSpanForMyProject" v-if="item.extra.find(e => { return e.extraName==='is_the_project_mine' && e.extraValue==='1' })">Atabasch</span>
                <figcaption></figcaption>
            </figure>
        </NuxtLink>
        <h5 class="mt-3 title">
            <NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none text-white">{{ item.postTitle }}</NuxtLink>
        </h5>
        <p class="description">{{ item.postDescription.substr(0, 255) }}</p>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item = toRef(props, 'item')
</script>

<style scoped>
    .title{
        font-size: 18px;
        line-height: 25px;
        height: 25px;
        overflow: hidden;
    }

    .description {
        font-size: 15px;
        line-height: 22px;
        padding: 0;
        margin: 0;
        margin-top: -5px;
        height: 44px;
        overflow: hidden;
    }


</style>
