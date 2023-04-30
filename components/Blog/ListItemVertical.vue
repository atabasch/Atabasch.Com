<template>
    <div class="box-dark-blue mb-5">
        <NuxtLink :to="$getUrl.post(item.postSlug)">
            <figure class="img-filter-dark-blue">
                <img :src="item.postCover" class="img-fluid" />
                <figcaption></figcaption>
            </figure>
        </NuxtLink>
        <div class="p-3">
            <span class="fs-6 fw-"><i class="bi bi-clock"></i> 3 dakika'da oku</span>
            <h2><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none">{{ item.postTitle }}</NuxtLink></h2>
            <p>{{ item.postDescription }}</p>
            <div>
                <!-- todo: makaleye bağlı etiketleri çek -->
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket1</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket2</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket3</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
