<template>
   <div>
       <div v-if="loaded">
           <PanelTitleBox :title="postType.postTypeTitle">
               <NuxtLink :to="$getUrl.panel('/posts/create?type='+qType)" class="btn btn-sm btn-primary">Yeni {{ postType.postTypeTitleSingle }} Ekle</NuxtLink>
           </PanelTitleBox>
           <PostList v-if="items" :items="items" />
       </div>
   </div>
</template>

<script setup>
import PostList from "@/components/panel/PostList"
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
    usePost().getAll(qType).then( (response) => {
        items.value = toRaw(response.posts)
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
