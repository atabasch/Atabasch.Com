<template>
    <div class="col-12 my-4">
        <h1 :title="props.title" class="coloredTitleReverse">{{ props.title }}</h1>
        <hr>
        <nav style="--bs-breadcrumb-divider: '›';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><NuxtLink to="/">Atabasch</NuxtLink></li>
                <li class="breadcrumb-item" v-for="(item, index) in items" :key="'breadcrump-item-'+index"><NuxtLink :to="item.to">{{ item.title }}</NuxtLink></li>
                <li class="breadcrumb-item active" aria-current="page">{{ props.title}}</li>
            </ol>
        </nav>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: Object,
        required: true
    },
    items: {
        type: Array,
        required: false,
        default: () => []
    }
})
</script>

<style scoped>

</style>
