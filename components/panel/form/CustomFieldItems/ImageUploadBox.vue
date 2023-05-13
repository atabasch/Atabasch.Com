<template>
    <div class="ratio ratio-1x1">
        <input type="file"
               class="form-control d-none "
               @change="onChangedFile($event)"
               :required="field.fieldRequired && image === defaultImagePath"
               ref="fileInput"
        />
        <figure>
            <img :src="getImageSource" class="border cursor-pointer" style="width:100%; max-width: 100%; height: auto" @click="() => $refs.fileInput.click()"/>
            <figcaption class="d-flex flex-direction-column justify-content-between">
                <button class="btn btn-sm btn-success" v-if="getImageChanged" @click="uploadTheFile()">
                    <em class="bi bi-upload" v-if="!uploading"></em>
                    <span class="spinner-border spinner-border-sm" role="status" v-if="uploading"></span>
                    Yükle</button>
                <button class="btn btn-sm btn-danger" v-if="image || props.value" @click="removeTheFile()">Görseli Kaldır</button>
            </figcaption>
        </figure>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import useUpload from "../../../../composables/useUpload";
const {$showToast, $showAlert} = useNuxtApp();

const props = defineProps(['value', 'field'])
const emits = defineEmits(['uploaded', 'removed'])
let defaultImagePath = "/images/camera.png"
const image = ref(null)
const file = ref(null);
const imageChanged = ref(false)
const uploading = ref(false)

const getImageChanged = computed(() => imageChanged.value)
const getImageSource  = computed(() => (image.value || props.value) || defaultImagePath)


const onChangedFile = (e) => {
    if(!e.target.files.length){
        image.value = null
        file.value = null
        imageChanged.value = false
    }else{
        file.value = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file.value)
        reader.onload = e => {
            image.value = e.target.result
            imageChanged.value = true
        }
    }
}


const uploadTheFile = async () => {
    if(file.value){
        uploading.value = true
        useUpload(file.value).then(resp=>{
            if(resp.status){
                image.value = resp.url
                file.value = null
                imageChanged.value = false
                emits("uploaded", resp.url)
                uploading.value = false
            }
        })
    }
}


const removeTheFile = () => {
    $showAlert({
        title: 'Görseli Kaldır',
        body: 'Görseli kaldırmak istediğinize emin misiniz?',
        confirmText: 'Evet, kaldır!',
        cancelText: 'Hayır, vazgeç!',
        type: 'warning'
    }, () => {
        image.value = null
        emits("removed", null)
        imageChanged.value = false
    })
}
</script>

<style scoped>

</style>
