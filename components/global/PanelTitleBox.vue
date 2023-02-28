<template>
    <div class="w-100 d-flex">
        <div class="flex-grow-1">
            <h2 class="h3">{{ title }}</h2>
        </div>
        <div>
            <slot />
        </div>
    </div>
    <hr class="w-100 mt-0"/>
</template>

<script setup>
const {title} = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>

</style>
