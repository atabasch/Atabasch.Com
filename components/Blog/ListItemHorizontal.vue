<template>
    <div class="row mb-5">
        <div class="col-12 col-md-5">
            <NuxtLink :to="$getUrl.post(item.postSlug)">
                <figure class="img-filter-dark-blue ratio ratio-4x3">
                    <img :src="item.postCover" :alt="item.postTitle" class="img-fluid" />
                    <figcaption></figcaption>
                </figure>
            </NuxtLink>
        </div>
        <div class="col p-sm-0">
            <div>
                <span class="fs-6 me-2"><i class="bi bi-clock"></i> {{ $getDateFormat(item.postPublishedAt, 'dateLong') }}</span>
                <span class="fs-6 me-2"><i class="bi bi-eye"></i> {{ item.postViews }}</span>
            </div>
            <h3 class="fs-4 my-2" :title="item.postTitle"><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none text-light-white">{{ item.postTitle }}</NuxtLink></h3>
            <p>{{ item.postDescription }}</p>
            <div>
                <NuxtLink :to="$getUrl.term(term.taxonomy.taxSlug, term.termSlug)" class="link-secondary me-2 text-decoration-none" v-for="term in useFilterTerms(item.terms, 'kategori')">#{{ term.termSlug }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";
import {useFilterTerms} from "../../composables/useGetDatas";
const props = defineProps({
    item: {
        type: Object
    }
})
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
