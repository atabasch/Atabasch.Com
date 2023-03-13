<template>
    <div class="row">

        <div class="col-12 col-md-8">
            <PanelTitleBox title="Özel Alanlar"/>
            <table class="table table-striped table-bordered table-hovered bg-white">
                <thead>
                <tr>
                    <th width="10"><i class="bi bi-exclamation"></i></th>
                    <th>Başlık</th>
                    <th>Name</th>
                    <th>İçerik Türü</th>
                    <th>Tip</th>
                    <th width="85"></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="fields">
                    <tr v-for="(item, index) in fields" :key="index">
                        <td><i class="bi bi-exclamation-circle text-primary" v-if="item.fieldRequired"></i></td>
                        <td class="fw-bold">{{ item.fieldLabel }}</td>
                        <td><code>{{ item.fieldName }}</code></td>
                        <td>{{ item.postType.postTypeTitle }}</td>
                        <td>{{ $customTypes[item.fieldType].label }}</td>
                        <td>
                            <button class="btn btn-outline-success btn-sm me-1" @click="setTheField(item, index)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-outline-danger btn-sm" @click="sendToDelete(item, index)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div><!-- col-12 col-md-7" -->

        <div class="col">
            <PanelFormCustomField :types="postTypes" :field="field" @created="onCreate($event)" @updated="onUpdate($event)" @cancelled="onCancel()" />
        </div><!-- col -->

    </div><!-- row -->
</template>

<script setup>
// IMPORTS
import {ref} from "vue"
import useCustomField from "../../../composables/useCustomField";
import usePostType from "../../../composables/usePostType";
const {$showToast, $showAlert} = useNuxtApp()

// CONFIGS
definePageMeta({ layout: 'admin' })
useHead({ title: 'Özel Alanlar' })

// INITIALIZE
const initField = {
    fieldLabel: '',
    fieldName: '',
    fieldOrder: 99,
    fieldType: 'text',
    fieldDefaultValue: '',
    postTypeId: null,
    fieldRequired: false,
    fieldDescription: '',
    fieldOptions: '',
}
const update = ref(false)
const fields = ref([])
const field = ref({...initField})
const postTypes = ref([])

// INITIALIZE
fetchCustomFields()

usePostType().getAll().then(result => {
    if(result.status && result.types){
        postTypes.value = result.types
    }
})

// METHODS
function fetchCustomFields(){
    useCustomField().getAll().then(result => {
        if(result.status && result.fields){
            fields.value = result.fields
        }
    })
}
function setTheField(item, index){
    update.value = true
    field.value = {...item, index}
}


function sendToDelete(item, index){
    $showAlert({
        title : 'Özel Alan Silinecek',
        body: `<strong>${item.fieldLabel}</strong> başlıklı özel alan silinecek bu işlem bir daha geri alınamaz. Silmek istediğinize emin misiniz?`,
        confirmText: 'Eminim Sil'
    }, function(result){
        useCustomField().delete(item.fieldId).then( async (response) => {
            if(response.status){
                $showToast(response.message || 'Özel Alan Silindi')
                fields.value.splice(index, 1);
            }else{
                $showToast(response.message || 'Özel Alan Silinemedi', 'error')
            }
        } ).catch(err => { $showToast('Beklenmedik bir hata oluştu', 'error') })
    })
}// send To Delete

function onCreate(item){
    fetchCustomFields()
    $showToast('Özel Alan Oluşturuldu')
    onCancel()
} // onCreate

function onUpdate(item){
    fetchCustomFields()
    $showToast('Özel Alan Güncellendi')
    onCancel()
} // onUpdate

function onCancel(){
    update.value = false
    field.value = {...initField}
} // onCancel


</script>

<style scoped>

</style>
