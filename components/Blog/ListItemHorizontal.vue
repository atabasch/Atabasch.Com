<template>
    <div class="row mb-5">
        <div class="col-12 col-md-5">
            <NuxtLink :to="$getUrl.post(item.postSlug)">
                <figure class="img-filter-dark-blue ratio ratio-4x3">
                    <img :src="item.postCover" :alt="item.postTitle" class="img-fluid" />
                    <figcaption></figcaption>
                </figure>
            </NuxtLink>
        </div>
        <div class="col p-0">
            <div>
                <span class="fs-6 fw-"><i class="bi bi-clock"></i> 3 dakika'da oku</span>
            </div>
            <h3 class="fs-4 my-2" :title="item.postTitle"><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none">{{ item.postTitle }}</NuxtLink></h3>
            <p>{{ item.postDescription }}</p>
            <div>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket1</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket2</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket3</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps({
    item: {
        type: Object
    }
})
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
