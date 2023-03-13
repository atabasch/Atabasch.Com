<template>
    <h4 :class="'coloredTitle'" v-html="props.title"></h4>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style scoped>

</style>
