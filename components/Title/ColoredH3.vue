<template>
    <h3 :class="'coloredTitle'" v-html="props.title"></h3>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
