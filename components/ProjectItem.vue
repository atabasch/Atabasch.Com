<template>
    <div class="box-dark-blue p-3 projectItem h-100">
        <h4><i class="bi bi-github"></i> <NuxtLink :to="$getUrl.post(item.postSlug)" class="text-decoration-none text-white">{{ project.postTitle }}</NuxtLink></h4><hr>
        <p>{{ project.postDescription }}</p>
        <div class="d-flex justify-content-end flex-wrap">
            <span href="" class="badge text-bg-primary m-1 p-1">Nuxt + Vue</span>
            <span href="" class="badge text-bg-warning m-1 p-1">JavaScript</span>
            <span href="" class="badge text-bg-danger m-1 p-1">Sequelize</span>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const project = toRef(props, 'item')
</script>

<style scoped>

</style>
