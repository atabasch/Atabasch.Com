<template>
    <div class="row">
        <Breadcrumb :title="post.postTitle"/>


        <div class="col-12 col-lg-8">
            <article class="postSingle">
                <header class="postSingleHeader">
                    <p>{{ post.postDescription }}</p>

                    <div class="d-flex">
                        <div class="border-end pe-3"><em class="bi bi-person-lines-fill"></em> {{ post.user.displayName }}</div>
                        <div class="border-end px-3"><em class="bi bi-clock"></em> {{ timeToDate(post.postPublishedAt) }}</div>
                        <div class="border-end px-3"><em class="bi bi-eye"></em> {{ post.postViews }}</div>
                        <!-- todo: Burada yorum sayısı gelecek -->
                        <div class=" px-3"><em class="bi bi-chat-dots"></em> {{ 0 }}</div>
                    </div>

                    <figure class="text-center postSingleCover my-4" v-if="post.postCover">
                        <img :src="post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
                    </figure>
                    <p>
                        <span v-for="(category, index) in post.taxonomies.kategori" :key="index">
                            <NuxtLink class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none fw-normal px-2 py-2 mx-1" :to="$getUrl.term('kategori',category.slug)">{{ category.title }}</NuxtLink>
                        </span>
                    </p>
                    <hr>
                </header>

                <section class="postSingleContent" v-html="post.postContent"></section>
                <hr>

                <footer class="postSingleFooter">
                    <p>
                        <span v-for="(keyword, index) in post.postKeywords.split(',')" :key="index">
                            <NuxtLink class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none fw-meidum px-2 py-2 mx-1" :to="$getUrl.search(keyword)">{{ keyword }}</NuxtLink>
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
import BlogSidebar from "../../Blog/Sidebar";
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
