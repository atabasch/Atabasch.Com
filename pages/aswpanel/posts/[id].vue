<template v-if="post">
    <PanelTitleBox :title="getPageTitle">
<!--        <NuxtLink :to="$getUrl.panel('/posts/create?type='+type.postTypeId)" class="btn btn-sm btn-primary">Yeni {{ type.postTypeTitleSingle }} Ekle</NuxtLink>-->
    </PanelTitleBox>
    <PostForm :post="{...post}" :type="type" @updated="onUpdate($event)" :taxonomies="taxonomies"/>
</template>

<script setup>
import {ref, toRaw, computed, reactive} from "vue";
import PostForm from "~/components/panel/form/Post"
import {storeType} from "../../../stores/type";
const {$showToast} = useNuxtApp()
definePageMeta({ layout: 'admin' })


const route = useRoute()
let {id} = route.params
const post = ref(null);
const type = ref({})
const taxonomies = ref([])

useHead({title: 'İçerik Düzenle'})


useAsyncData(async () => {
    await $fetch('/api/panel/post/'+id).then( async (response) => {
        if(response.status && response.post){
            post.value = toRaw(response.post)
            type.value = await storeType().getType.withPk(response.post.postTypeId)
            post.value.checkedTerms = post.value.terms.map(item => item.termId)
        }
    } ).catch(err => { console.log(err) })
    if(type.value.postTypeTaxonomies){
        let taxSlugs = JSON.parse(type.value.postTypeTaxonomies).join(',')
        let response = await useTaxonomy().getMulti(taxSlugs)
        if(response.status && response.taxonomies){
            taxonomies.value = response.taxonomies
        }
    }
})


const getPageTitle = computed(() => {
    return !post.value? 'İçerik Düzenle: ...' : 'Düzenle: ['+post.value.postTitle+']'
})

const onUpdate = (post) => {
    $showToast('İçerik güncellendi')
}
</script>

