<template>
    <div class="box-dark-blue p-3 projectItem h-100">
        <h4 title=""><i class="bi bi-github"></i> <NuxtLink :to="$getUrl.post(project.postSlug)" class="text-decoration-none text-white">{{ project.postTitle }}</NuxtLink></h4><hr>
        <p>{{ project.postDescription }}</p>
        <div class="d-flex justify-content-end flex-wrap">
            <span
                class="badge text-bg-primary m-1 p-1 text-decoration-none"
                v-for="(term) in project.terms.filter(term => term.taxonomy.taxSlug===config.referenceTechnologySlug)"
                :key="'project-term-'+term.termSlug"
            >{{ term.termTitle }}</span>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";
import { useRuntimeConfig} from "nuxt/app";
const {public: config} = useRuntimeConfig()
const props = defineProps(['item'])
const project = toRef(props, 'item')
</script>

<style scoped>

</style>
