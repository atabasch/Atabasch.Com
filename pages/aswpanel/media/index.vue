<template>
<div>
    <PanelTitleBox title="Medya Dosyaları">
        <!--        <NuxtLink :to="$getUrl.panel('/media/create')" class="btn btn-sm btn-primary">Dosya Yükle</NuxtLink>-->
    </PanelTitleBox>

    <div class="row">
        <div class="col-6 col-sm-8 col-lg-9">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-5">
                <div class="col p-2" v-for="(file, index) in items" :key="'media-file-'+index">
                    <nuxt-link to="#" @click.stop="setCurrent(file)" href="" class="ratio ratio-4x3">
                        <img :src="file.mediaPath" class="img-fluid object-fit-cover" loading="lazy">
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="col" v-if="current.mediaId">
            <img :src="current.mediaPath" :alt="current.mediaName" class="img-fluid mb-2">

            <div class="mb-2">
                <label for=""><strong>Başlık:</strong></label>
                <input type="text" class="form-control" v-model="current.mediaName">
            </div>

            <hr/>
            <p class="mb-2">
                <strong>Genişlik:</strong> {{current.mediaData.width}}px <br/>
                <strong>Yükseklik:</strong> {{current.mediaData.height}}px <br/>
                <strong>Tür:</strong> {{current.mediaType}}<br/>
                <strong>Boyut:</strong> {{current.mediaData.size}}<br/>
            </p>
            <hr/>

            <div class="mb-2">
                <label for=""><strong>Bağlantı:</strong></label>
                <input type="text" readonly class="form-control" v-model="current.mediaPath">
            </div>

            <hr>
            <div class="text-end">
                <button class="btn btn-dark btn-sm mx-1 float-start" @click="setCurrent(null)">Kapat</button>
                <button class="btn btn-danger btn-sm mx-1">Sil</button>
                <button class="btn btn-primary btn-sm mx-1">Güncelle</button>
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import useMedia from "../../../composables/useMedia";


definePageMeta({layout:'admin'})
useHead({ title: 'Medya Dosyaları' })

const items = ref([])
const current = ref({})

const setCurrent = (file)=>{
    current.value = !file? {} : file
}

useMedia().getAll().then(resp=>{
    if(resp.status && resp.files){
        items.value = resp.files
    }
})

</script>

<style scoped>

</style>
