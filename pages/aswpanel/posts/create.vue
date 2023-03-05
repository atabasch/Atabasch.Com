<template>
<div v-if="postType">
    <PanelTitleBox :title="`Yeni ${postType.postTypeTitleSingle} Oluştur`"></PanelTitleBox>
        <PostForm  @created="onCreate($event)" :type="postType" :taxonomies="taxonomies" />
</div>
</template>

<script setup>
import PostForm from "~/components/panel/form/Post"
import {storeType} from "@/stores/type"
import {ref} from "vue";

definePageMeta({ layout: 'admin' })
useHead({title: 'İçerik Ekle'})
const router = useRouter()
const route = useRoute()
const {$showToast} = useNuxtApp()

const {type: qType} = route.query
const postType = ref(null);
const taxonomies = ref([]);

postType.value = await storeType().getType.withPk(qType)
if(postType.value.postTypeTaxonomies){
    let taxSlugs = JSON.parse(postType.value.postTypeTaxonomies).join(',')
    let response = await useTaxonomy().getMulti(taxSlugs)
    if(response.status && response.taxonomies){
        taxonomies.value = response.taxonomies
    }
}

const onCreate = (post) => {
    $showToast('İçerik ekleme başarılı oldu')
    router.push({path: '/aswpanel/posts/'+post.postId})
}
</script>

