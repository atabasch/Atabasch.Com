<template>
    <article class="postSingle">
        <header class="postSingleHeader">
            <ColoredTitle :title="post.postTitle" size="1" reverse/>
            <figure class="text-center postSingleCover" v-if="post.postCover">
                <img :src="post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
            </figure>
        </header>

        <section class="postSingleContent" v-html="post.postContent"></section>

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
