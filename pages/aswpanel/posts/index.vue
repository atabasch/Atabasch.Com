<template>
    <PanelTitleBox :title="'İçerik Listesi'"></PanelTitleBox>
    <PostList v-if="items" :items="items" />
</template>

<script setup>
import PostList from "@/components/panel/PostList"
const route = useRoute()
import {ref, onMounted} from "vue";

definePageMeta({ layout: 'admin' })

const items = ref([]);
// useFetch('/api/panel/post?type=' + (route.query.type || 'post')).then( ({data, error}) => {
//     console.log(data)
//     items.value = toRaw(data.value.posts)
// } )




//
</script>

<style scoped>
.statusList{
    display: none;
}
.statusCol:hover .statusList{
    display: block;
}
</style>
