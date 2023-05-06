<template>
    <div class="row">
        <Breadcrumb :title="post.postTitle"/>


        <div class="col-12 col-lg-8">
            <template v-if="posts" v-for="(post, key) in posts" :key="key">
                <BlogListItemVertical v-if="key<1" :item="post" />
                <BlogListItemHorizontal v-else :item="post" />
            </template>

            <div class="d-flex justify-content-center" v-if="!loadedLastPost">
                <button class="btn btn-outline-secondary rounded-0 text-center" @click="loadMore()" style="min-width: 250px">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
                    <span v-if="!loading">Daha fazla içerik yükle</span>
                </button>
            </div>

        </div>
        <div class="col-12 col-lg-4">
            <BlogSidebar/>
        </div>
    </div>

</template>

<script setup>
import BlogSidebar from "../Blog/Sidebar";
import {onMounted, ref, toRef} from "vue";
import {useGetPosts} from "../../composables/useGetDatas";
import {useRuntimeConfig} from "nuxt/app";
const {public: config} = useRuntimeConfig()

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const post = toRef(props, 'post');
const posts = ref([])
const loading = ref(false);
const offset = ref(0);
const limit = ref(10);
const loadedLastPost = ref(false);


const loadPosts = () => {
    loading.value = true;
    useGetPosts({
        type: 'post',
        offset: offset.value,
        limit: limit.value,
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

</script>


<style>

</style>
