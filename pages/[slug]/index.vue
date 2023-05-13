<template>
<!--    <Transition>-->
<!--    <div v-if="!pageLoaded" class="bg-dark-blue" style="position: fixed; top:0; bottom:0; right:0; width: 100%;height: 100%; z-index: 9999; display: flex; justify-content: center; align-items: center">-->
<!--        <LoaderSpinners/>-->
<!--    </div>-->
<!--    </Transition>-->
    <component :is="getTheComponent" v-if="post" :post="post"></component>
    <Error404 v-if="notFound" />
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useHead} from "@unhead/vue";
import Error404 from "../../components/404.vue"

const pageLoaded = ref(false)
const notFound = ref(false)
const postViewsHandler = ref(null)



import Blog from "../../components/Templates/Blog.vue";
import Contact from "../../components/Templates/Contact.vue";
import References from "../../components/Templates/References.vue";

import SinglePage from "../../components/Templates/Single/Page.vue";
import SinglePost from "../../components/Templates/Single/Post.vue";
import SingleTechnology from "../../components/Templates/Single/Technology.vue";
import SingleReference from "../../components/Templates/Single/Reference.vue";
import Search from "../../components/Templates/Search";

import LoaderSpinners from "../../components/panel/LoaderSpinners";
import usePost from "../../composables/usePost";



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

const singleComponentList = ref({
    post: SinglePost,
    page: SinglePage,
    technology: SingleTechnology,
    reference: SingleReference,
    default: SinglePage
})

const componentList = ref({
    blog: Blog,
    contact: Contact,
    reference: References,
    search: Search,
    default: SinglePage
})

const getTheComponent = computed(() => {
    if(!post.value.extra?.template){
        return singleComponentList.value[post.value.type.slug] || singleComponentList.value.default
    }else{
        if(post.value.extra.template === 'default'){
            return singleComponentList.value[post.value.type.slug] || singleComponentList.value.default
        }else{
            return componentList.value[post.value.extra.template] || componentList.value.default
        }
    }

})

onMounted(() => {
    postViewsHandler.value = setTimeout(() => {
        usePost().updatePostViews(post.value.postId)
    }, 7000);
})

// component kapanırken çalışır
onBeforeUnmount(() => {
    clearTimeout(postViewsHandler.value)
    postViewsHandler.value  = null
})
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
