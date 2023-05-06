<template>
    <Breadcrumb :title="post.postTitle"/>

    <article class="postSingle">
        <header class="postSingleHeader">
            <figure class="text-center postSingleCover" v-if="post.postCover">
                <img :src="post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
            </figure>
        </header>

        <section class="postSingleContent" v-html="post.postDescription"></section>
        <section class="postSingleContent" v-html="post.postContent"></section>
    </article>

    <hr>
    <TechnologiesGrid :items="items" title="Tüm Teknolojiler" />
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useGetPosts} from "../../../composables/useGetDatas";
import TechnologiesGrid from "../../About/TechnologiesGrid.vue";

const {post} = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const items = ref([])

onMounted(()=>{
    useGetPosts({
        type: 'technology',
        limit: 100
    }).then(resp=>{
        if(resp.status && resp.posts){
            items.value = resp.posts
        }
    })
})


</script>
