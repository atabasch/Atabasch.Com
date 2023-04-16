<template>
    <h5 :class="props.className" v-html="props.title"></h5>
</template>

<script setup>
const props = defineProps(['title', 'className'])
</script>

<style scoped>

</style>
