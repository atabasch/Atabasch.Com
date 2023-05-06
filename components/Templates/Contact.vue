<template>
    <Breadcrumb :title="post.postTitle"/>
    <article class="postSingle">
        <header class="postSingleHeader">

            <figure class="text-center postSingleCover" v-if="post.postCover">
                <img :src="post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
            </figure>
        </header>

        <section class="postSingleContent" v-if="post.postContent">
            <div v-html="post.postContent"></div>
            <hr/>
        </section>

        <ContactForm />

        <footer class="postSingleFooter">

        </footer>
    </article>

</template>

<script setup>
import {toRef} from "vue";

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const post = toRef(props, 'post');
</script>
