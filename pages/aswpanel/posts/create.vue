<template>
<PanelLoaderSpinners v-if="!loaded" center fullHeight />
<div v-if="loaded">
    <PanelTitleBox :title="`Yeni ${postType.postTypeTitleSingle} Oluştur`"></PanelTitleBox>
    <PostForm  @created="onCreate($event)" :type="postType" :taxonomies="taxonomies" />
</div>
</template>

<script setup>
// IMPORTS
import PostForm from "~/components/panel/form/Post"
import {ref} from "vue";
import usePostType from "../../../composables/usePostType";
const {$showToast}  = useNuxtApp()

// INITIALIZE
definePageMeta({ layout: 'admin' })
useHead({title: 'İçerik Ekle'})

const {type: qType} = useRoute().query
const postType      = ref(null);
const taxonomies    = ref([]);
const loaded       = ref(false);

// FETCH
usePostType().getOne(qType).then(async (resp) => {
    if(resp.status && resp.type){
        postType.value   = await resp.type
        taxonomies.value = await useTaxonomy().getMultiFromJSON(resp.type.postTypeTaxonomies || '')
        loaded.value = true
    }
})

// METHODS
const onCreate = (post) => {
    $showToast('İçerik ekleme başarılı oldu')
    useRouter().push({path: '/aswpanel/posts/'+post.postId})
}
</script>

