<template>
    <Breadcrumb :title="post.postTitle"/>

    <div class="pb-4">
        <button :class="'btn m-2 ms-0 '+(!currentTermId? 'btn-success' : 'btn-dark')" @click="getItemsByTerm(null)">Tümü</button>
        <button :class="'btn m-2 ms-0 '+(currentTermId==term.termId? 'btn-success' : 'btn-dark')" v-for="term in terms" :key="'portfolio-term-'+term.termId" @click="getItemsByTerm(term.termId)">{{ term.termTitle }}</button>
    </div>

    <div class="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4">
        <div class="col" v-for="(item, key) in getReferences" :key="key">
            <PortfolioItem :item="item"/>
        </div>
    </div>
    <div class="d-grid gap-2 col-1 mx-auto py-5" v-if="getReferences.length >= limit">
        <button type="button" class="btn btn-outline-secondary rounded-0" style="max-width: 300px" @click="loadPosts(true)">Daha Fazla</button>
    </div>

</template>

<script setup>
import {computed, onMounted, ref, toRef} from "vue";
import PortfolioItem from "../PortfolioItem";
import {useGetPosts, useGetTerms} from "../../composables/useGetDatas";
import {useRuntimeConfig} from "nuxt/app";
import Breadcrumb from "../Breadcrumb";

const {public: config} = useRuntimeConfig()


const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const post = toRef(props, 'post');
const items = ref([])
const terms = ref([])
const loading = ref(false);
const offset = ref(0);
const limit = ref(12);
const loadedLastPost = ref(false);
const currentTermId = ref(null);



const getItemsByTerm = (term=null) => {
    currentTermId.value = term;
    loadPosts();
}

const getReferences = computed(() => {
    return items.value
})

const loadTerms = () => {
    useGetTerms({
        name: config.referenceBranchSlug || 'branch'
    }).then(resp => {
        if (resp.status && resp.terms) {
            terms.value = resp.terms
        }
    })
}

const loadPosts = (more=false) => {
    offset.value = more ? offset.value + limit.value : 0;
    loading.value = true;
    useGetPosts({
        type: 'reference',
        offset: offset.value,
        limit: limit.value,
        term: currentTermId.value
    }).then(resp => {
        if (resp.status && resp.posts) {
            items.value = more ? [...items.value, ...resp.posts] : resp.posts;
            if(resp.posts.length < limit.value){
                loadedLastPost.value = true;
            }
            loading.value = false;
        }
    })
}

onMounted(() => {
    loadPosts();
    loadTerms()
})

</script>


<style>

</style>
