<template>
    <h1 :class="'coloredTitle'" v-html="props.title"></h1>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
