<template>
    <h6 :class="'coloredTitle'" v-html="props.title"></h6>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
