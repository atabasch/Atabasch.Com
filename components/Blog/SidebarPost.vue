<template>
    <div class="box-dark-blue rounded mb-3 card">
        <NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none row g-0">

            <div class="col-3">
                <figure class="img-filter-dark-blue h-100">
                    <img :src="item.postCover" class="img-fluid rounded-start object-fit-cover h-100" />
                    <figcaption></figcaption>
                </figure>
            </div>

            <div class="d-flex flex-column col-9">
                <div class="card-body py-2 px-3">
                    <h5 class="fs-6 card-title"><NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none sidebarPostTitle">{{ item.postTitle }}</NuxtLink></h5>
                    <p class="card-text"><small class="text-body-secondary"><i class="bi bi-eye"></i> {{ item.postViews }} </small></p>
                </div>
            </div>

        </NuxtLink>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const {item} = defineProps(['item'])
</script>

<style scoped>
.sidebarPostTitle{
    display: inline-block;
    padding: 0;
    margin: 0;
    line-height: 24px;
    font-size: 17px;
    font-weight: 600;
    height: 48px;
    overflow: hidden;
}
</style>
