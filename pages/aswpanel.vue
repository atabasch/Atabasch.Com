<template>
    <NuxtPage />
</template>

<script setup>
definePageMeta({
    middleware: 'panel-auth-control'
})
</script>
