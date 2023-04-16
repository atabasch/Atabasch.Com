<template>
    <h4 :class="props.className" v-html="props.title"></h4>
</template>

<script setup>
const props = defineProps(['title', 'className'])
</script>

<style scoped>

</style>
