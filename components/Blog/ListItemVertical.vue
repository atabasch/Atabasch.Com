<template>
    <div class="box-dark-blue mb-5">
        <NuxtLink :to="$getUrl.post(item.postSlug)">
            <figure class="img-filter-dark-blue ratio ratio-16x9 ">
                <img :src="item.postCover" class="img-fluid object-fit-cover" />
                <figcaption></figcaption>
            </figure>
        </NuxtLink>
        <div class="p-3">
            <div>
                <span class="fs-6 me-2"><i class="bi bi-clock"></i> {{ $getDateFormat(item.postPublishedAt, 'dateLong') }}</span>
                <span class="fs-6 me-2"><i class="bi bi-eye"></i> {{ item.postViews }}</span>
            </div>
            <h2><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none text-light-white">{{ item.postTitle }}</NuxtLink></h2>
            <p>{{ item.postDescription }}</p>
            <div>
                <NuxtLink :to="$getUrl.term(term.taxonomy.taxSlug, term.termSlug)" class="link-secondary me-2 text-decoration-none" v-for="term in useFilterTerms(item.terms, 'kategori')">#{{ term.termSlug }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
