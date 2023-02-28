<template>
    <PanelTitleBox title="Yeni Kategori Oluştur"></PanelTitleBox>
    <div class="w-100 w-md-50">
        <div class="mb-2">
            <label for="" class="form-label">Kategori Adı</label>
            <input type="text" class="form-control" v-model="category.name">
        </div>


        <div class="mb-2">
            <label for="" class="form-label">Açıklama</label>
            <textarea name="" id="" cols="30" rows="3" class="form-control" v-model="category.description"></textarea>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="1" v-model="category.status" id="categoryStatus" checked>
            <label class="form-check-label" for="categoryStatus" >Bu kategoriye ait içerikler yayınlansın.</label>
        </div>

        <hr />

        <div class="text-end">
            <button class="btn btn-danger mx-2" v-if="props.category" @click="sendToCancel">Vazgeç</button>
            <button class="btn btn-primary" v-if="!props.category" @click="sendToSave">Oluştur</button>
            <button class="btn btn-success" v-if="props.category" @click="sendToUpdate">Güncelle</button>
        </div>


    </div>
</template>

<script setup lang="ts">
import {ref, defineEmits, defineProps, toRaw, watch} from "vue"

const initCategory = {
    name: '',
    description: '',
    status: true,
    total: 0,
    createdAt: Date.now()
}

const emits = defineEmits(['created', 'updated', 'cancelled']);
const props = defineProps({ category: Object })
const category = ref({...Object.assign(initCategory)})

const resetCategory = () => {
    category.value = {...Object.assign(initCategory)};
}

const sendToSave = async ()=>{
    useFetch('/api/panel/category/create', { method: 'POST', body: {category: toRaw(category.value)} }).then( ({data, error}) => {
        if(data.value.category){
            emits('created', data.value.category);
            resetCategory();
        }
    } );
}

const sendToUpdate = async ()=>{
    useFetch('/api/panel/category/update', { method: 'POST', body: {category: toRaw(category.value)} }).then( ({data, error}) => {
        if(data.value.category){
            emits('updated', data.value.category);
            resetCategory();
        }
    } );
}

const sendToCancel = async () => {
    resetCategory();
    emits('cancelled');
}

watch(() => props.category, (curCategory, oldCategory) => {
    if(curCategory){
        category.value = {...curCategory}
    }
})
</script>

<style scoped>

</style>
