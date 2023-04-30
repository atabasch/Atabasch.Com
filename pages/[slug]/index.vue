<template>
    <component :is="getTheComponent" v-if="post" :post="post"></component>
</template>

<script setup>
import {computed, ref} from "vue";
import {useHead} from "@unhead/vue";



import Page from "../../components/Templates/Page.vue";
import Post from "../../components/Templates/Post.vue";

const {$getHeadDatasByPost} = useNuxtApp()
const post  = ref(false)



useHead(() => $getHeadDatasByPost(post.value))





useAsyncData(async () => {
    const response = await $fetch("/api/site/post", {
        params: {
            slug: useRoute().params.slug
        }
    });
    if(response.status && response.post){
        post.value = response.post;
    }
})

const componentList = ref({
    post: Post,
    page: Page,
    default: Page
})

const getTheComponent = computed(() => {

    return componentList.value[post.value.type.slug] || componentList.value.default
})
</script>

<style scoped>
</style>
