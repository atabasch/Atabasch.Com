<template>
    <PanelTitleBox :title="!field.fieldId? 'Özel Alan Oluştur' : `Düzenle: ${field.fieldLabel}`"/>
    <form @submit.prevent="sendToSave()">
        <div class="mb-2">
            <label for="" class="form-label">Başlık</label>
            <input type="text" class="form-control" v-model="field.fieldLabel"  />
        </div>

        <div class="row">
            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Anahtar Değer <code>name=""</code></label>
                    <input type="text" class="form-control" v-model="field.fieldName" />
                </div>
            </div>

            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Sıralama</label>
                    <input type="text" class="form-control" v-model="field.fieldOrder" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Tip</label>
                    <select class="form-control form-select" v-model="field.fieldType">
                        <option :value="i" v-for="(t,i) in  $customTypes" :key="i">{{ t.label }}</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Varsayılan Değer</label>
                    <input type="text" class="form-control" v-model="field.fieldDefaultValue"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Ait olduğu içerik tipi</label>
                    <select class="form-control form-select" v-model="field.postTypeId">
                        <option  v-for="(t,i) in  types" :key="t.postTypeId" :value="t.postTypeId">{{ t.postTypeTitle }}</option>
                    </select>
                </div>
            </div>
            <div class="col-6">
                <div class="mb-2">
                    <label for="" class="form-label">Zorunlu Alan</label>
                    <select class="form-control form-select" v-model="field.fieldRequired">
                        <option :value="true">Evet</option>
                        <option :value="false">Hayır</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="mb-2">
            <label for="" class="form-label">Açıklama</label>
            <textarea rows="3" class="form-control" v-model="field.fieldDescription"></textarea>
        </div>

        <div class="mb-2" v-if="['select', 'radio', 'checkbox'].indexOf(field.fieldType) > -1">
            <label for="" class="form-label">Seçenekler</label>
            <textarea rows="5" class="form-control" v-model="field.fieldOptions"></textarea>
            <small>1:Bir 2:İki şeklinde alt alta yazın</small>
        </div>

        <div class="text-end">
            <button class="btn btn-primary ms-2" v-if="!field.fieldId" type="submit">Oluştur</button>
            <button class="btn btn-success ms-2" v-if="field.fieldId" type="submit">Güncelle</button>
            <button class="btn btn-danger ms-2" v-if="field.fieldId" type="button" @click="sendToCancel()">Vazgeç</button>
        </div>
    </form>
</template>

<script setup>

import {toRef, toRaw} from "vue";

const emits = defineEmits(['created', 'updated', 'cancelled'])
const props = defineProps({
    types: { type: Array, default: [] },
    field: { type:Object},
})
const types = toRef(props, 'types')
const field = toRef(props, 'field')

function sendToSave(){
    if(typeof field.value.fieldId === 'undefined'){
        sendToCreate()
    }else{
        sendToUpdate()
    }
}

function sendToCreate(){
    useCustomField().create(toRaw(field.value)).then(response => {
        if(response.status && response.field){
            emits('created', {...response.field})
        }
    })
}

function sendToUpdate(){
    useCustomField().update(toRaw(field.value)).then(response => {
        if(response.status && response.field){
            emits('updated', {...response.field})
        }
    })
}

function sendToCancel(){
    emits('cancelled')
}
</script>

<style scoped>

</style>
