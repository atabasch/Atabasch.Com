<template>
    <h5 :class="'coloredTitle'" v-html="props.title"></h5>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
