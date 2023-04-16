<template>
    <h2 :class="props.className" v-html="props.title"></h2>
</template>

<script setup>
const props = defineProps(['title', 'className'])
</script>

<style scoped>

</style>
