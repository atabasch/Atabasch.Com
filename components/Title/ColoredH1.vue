<template>
    <h1 :class="props.className" v-html="props.title"></h1>
</template>

<script setup>
const props = defineProps(['title','className'])
</script>

<style scoped>

</style>
