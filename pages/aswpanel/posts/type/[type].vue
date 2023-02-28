<template>
    <div v-if="loaded">
        <PanelTitleBox :title="postType.postTypeTitle">
            <NuxtLink :to="$getUrl.panel('/posts/create?type='+qType)" class="btn btn-sm btn-primary">Yeni {{ postType.postTypeTitleSingle }} Ekle</NuxtLink>
        </PanelTitleBox>
        <PostList v-if="items" :items="items" />
    </div>
</template>

<script setup>
import PostList from "@/components/panel/PostList"
import {storeType} from "@/stores/type"
import {ref, watch} from "vue";

const route = useRoute()
const {type:qType} = route.params

definePageMeta({ layout: 'admin' })

const loaded = ref(false);
const postType = ref({});
const items = ref(false);

useAsyncData(async function(){
    usePostType().getOne(qType).then(response => {
        if(response.status){
            postType.value = response.type
            console.log("dsgds")
        }
        loaded.value = true
    })
    useFetch('/api/panel/post?type=' + qType).then( ({data, error}) => {
        items.value = toRaw(data.value.posts)
    } )
})

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
