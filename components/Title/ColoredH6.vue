<template>
    <h6 :class="props.className" v-html="props.title"></h6>
</template>

<script setup>
const props = defineProps(['title', 'className'])
</script>

<style scoped>

</style>
