<template>
    <div class="row">
        <div class="col-12 my-4">
            <h1 :title="post.postTitle" class="coloredTitleReverse">{{ post.postTitle }}</h1>
            <hr>
            <nav style="--bs-breadcrumb-divider: '›';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><NuxtLink to="/">Anasayfa</NuxtLink></li>
                    <li class="breadcrumb-item"><NuxtLink to="/blog">Blog</NuxtLink></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ post.postTitle }}</li>
                </ol>
            </nav>
        </div>


        <div class="col-12 col-lg-8">
            <article class="postSingle">
                <header class="postSingleHeader">
                    <p>{{ post.postDescription }}</p>

                    <div class="d-flex">
                        <div class="border-end pe-3"><em class="bi bi-person-lines-fill"></em> {{ post.user.displayName }}</div>
                        <div class="border-end px-3"><em class="bi bi-clock"></em> {{ timeToDate(post.postPublishedAt) }}</div>
                        <div class="border-end px-3"><em class="bi bi-eye"></em> {{ post.postViews }}</div>
                        <div class=" px-3"><em class="bi bi-chat-dots"></em> {{ 0 }}</div>
                    </div>

                    <figure class="text-center postSingleCover my-4" v-if="post.postCover">
                        <img :src="post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
                    </figure>
                    <p>
                        <span v-for="(category, index) in post.taxonomies.kategori" :key="index">
                            <router-link class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none fw-normal px-2 py-2 mx-1" :to="`/${category.taxonomy.slug}/${category.slug}`">{{ category.title }}</router-link>
                        </span>
                    </p>
                    <hr>
                </header>

                <section class="postSingleContent" v-html="post.postContent"></section>
                <hr>

                <footer class="postSingleFooter">
                    <p>
                        <span v-for="(keyword, index) in post.postKeywords.split(',')" :key="index">
                            <router-link class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none fw-meidum px-2 py-2 mx-1" :to="`/keyword/${keyword}`">{{ keyword }}</router-link>
                        </span>
                    </p>
                </footer>
            </article>
        </div>
        <div class="col-12 col-lg-4">
            <BlogSidebar/>
        </div>
    </div>

</template>

<script setup>
import BlogSidebar from "../Blog/Sidebar";
import {toRef} from "vue";

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const post = toRef(props, 'post');

// timestamp to date
const timeToDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
}

</script>


<style>

</style>
