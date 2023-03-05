<template>
    <div class="box-dark-blue p-2 rounded mb-3">
        <NuxtLink :to="'/'" class="d-flex  text-decoration-none ">
            <figure class="img-filter-dark-blue rounded">
                <img :src="'https://picsum.photos/id/4'+item.postId+'5/100/100'" class="rounded">
                <figcaption></figcaption>
            </figure>
            <div class="ps-2 d-flex flex-column">
                <h5 class="fs-6">Bu bir deneme başlığıdır ve burada listelenecek olan en çok okunan içeriğine aittir.</h5>
                <span><i class="bi bi-calendar"></i> 4 Nisan 2022 </span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item  = toRef(props, 'item')
</script>

<style scoped>

</style>
