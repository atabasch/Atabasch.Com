<template>
    <h3 :class="props.className" v-html="props.title"></h3>
</template>

<script setup>
const props = defineProps(['title', 'className'])
</script>

<style scoped>

</style>
