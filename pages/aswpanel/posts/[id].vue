<template>
    <PanelLoaderSpinners v-if="!loaded" center fullHeight />
    <template v-if="loaded">
        <PanelTitleBox :title="getPageTitle">
            <NuxtLink :to="$getUrl.panel('/posts/create?type='+qType)" class="btn btn-sm btn-primary">Yeni {{ type.postTypeTitleSingle }} Ekle</NuxtLink>
        </PanelTitleBox>
        <PostForm :post="{...getPost}" :type="type" @updated="onUpdate($event)" :taxonomies="taxonomies"/>
    </template>
</template>

<script setup>
import {ref, toRaw, computed, reactive} from "vue";
import PostForm from "~/components/panel/form/Post"
const {$showToast} = useNuxtApp()
definePageMeta({ layout: 'admin' })
useHead({title: 'İçerik Düzenle'})

const route = useRoute()
let {id} = route.params
const loaded = ref(false);
const post = ref(null);
const type = ref({})
const taxonomies = ref([])




usePost().getOne(id).then( async (response) => {
    if(response.status && response.post){
        post.value = toRaw(response.post)
        type.value = post.value.type
        post.value.checkedTerms = post.value.terms.map(item => item.termId)
        taxonomies.value = await useTaxonomy().getMultiFromJSON(type.value.postTypeTaxonomies || '')
        loaded.value = true
    }
} ).catch(err => { console.log(err) })

const getPageTitle = computed(() => {
    return !post.value? 'İçerik Düzenle: ...' : 'Düzenle: ['+post.value.postTitle+']'
})

const getPost = computed(() => {
    return post.value
})

const onUpdate = (post) => {
    $showToast('İçerik güncellendi')
}
</script>

