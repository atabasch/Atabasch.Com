<template>
    <h2 :class="'coloredTitle'" v-html="props.title"></h2>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
