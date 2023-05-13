<template>
    <div class="row">
        <Breadcrumb :title="(route.query.s || '') + ': için sonuçlar'"/>
        <div class="col-12 col-lg-8">
            <template v-if="posts" v-for="(post, key) in posts" :key="key">
                <BlogListItemHorizontal :item="post" />
            </template>

            <div class="d-flex justify-content-center" v-if="!loadedLastPost">
                <button class="btn btn-outline-secondary rounded-0 text-center" @click="loadMore()" style="min-width: 250px">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
                    <span v-if="!loading">Daha fazla içerik yükle</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, toRef, watch} from "vue";
import {useGetPosts} from "../../composables/useGetDatas";
import {useRoute, useRuntimeConfig} from "nuxt/app";
const {public: config} = useRuntimeConfig()

const posts = ref([])
const loading = ref(false);
const offset = ref(0);
const limit = ref(10);
const loadedLastPost = ref(false);
const route = useRoute();



const loadPosts = () => {
    loading.value = true;
    useGetPosts({
        type: 'post',
        offset: offset.value,
        limit: limit.value,
        search: route.query.s || ''
    }).then(resp => {
        if (resp.status && resp.posts) {
            posts.value = [...posts.value, ...resp.posts]
            if(resp.posts.length < limit.value){
                loadedLastPost.value = true;
            }
            loading.value = false;
        }
    })
}

const loadMore = () => {
    offset.value += config.postsPerPage;
    loadPosts();
}

onMounted(() => {
    loadPosts();
})

watch(() => route.query.s, () => {
    posts.value = []
    loadPosts();
})
</script>

<style scoped>

</style>
