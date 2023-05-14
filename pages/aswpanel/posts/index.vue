<template>
    <div>
        <PanelTitleBox :title="'İçerik Listesi'"></PanelTitleBox>
        <PostList v-if="items" :items="items" />
    </div>
</template>

<script setup>
import PostList from "../../../components/panel/PostList"
import {ref} from "vue";
const { $getUrl } = useNuxtApp()

definePageMeta({ layout: 'admin' })
useRouter().replace($getUrl.panel(''))

const items = ref([]);
</script>

<style scoped>
.statusList{
    display: none;
}
.statusCol:hover .statusList{
    display: block;
}
</style>
