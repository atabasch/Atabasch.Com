<template>
 <PanelTitleBox :title="'Ayarlar'"></PanelTitleBox>

<div class="row">
    <div class="col"><input type="text" v-model="config.configKey" class="form-control" placeholder="Anahtar" /></div>
    <div class="col"><input type="text" v-model="config.configValue" class="form-control" placeholder="Değer" /></div>
    <div class="col"><input type="text" v-model="config.configDescription" class="form-control" placeholder="Açıklama" /></div>
    <div class="col"><input type="number" v-model="config.configOrder" class="form-control" placeholder="Sıra Numarası" max="255" min="1" /></div>
    <div class="col-1 d-grid"><button class="btn btn-primary" @click="sendToCreate()">Kaydet</button></div>
</div>

    <hr>

<table class="table table-striped table-bordered table-hover bg-white">
    <thead>
        <tr>
            <th width="100">Sıra</th>
            <th>Ayar</th>
            <th width="280"></th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(c, i) in configs" :key="i">

            <td><input type="number" class="form-control form-control-sm" v-model="c.configOrder" min="1" max="255"></td>
            <td>
                <input type="text" class="form-control form-control-sm" v-model="c.configValue">
                <span class="form-text">{{ c.configDescription }}</span>
            </td>
            <td><code>{{ c.configKey }}</code></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3" class="text-end">
                <button class="btn btn-success" @click="sendToUpdateAll()">Ayarları Güneclle</button>
            </td>
        </tr>
    </tfoot>
</table>
</template>

<script setup>
import PanelTitleBox from "../../components/global/PanelTitleBox";
import {ref, reactive, toRaw} from "vue";

definePageMeta({layout: 'admin'})
useHead({ title: 'Sistem Ayarları' })

const initialConfig = {
    configKey:'',
    configValue:null,
    configDescription: null,
    configOrder: 255
}
const config = reactive({...initialConfig})
const configs = ref([])

useConfig().getAll().then(result => {
    if(result.status && result.configs){
        configs.value = result.configs
    }
})

// METHODS
function addToConfigs(config){
    configs.value.push(config)
}

function sendToCreate(){
    useConfig().create(toRaw(config)).then(result => {
        if(result.status && result.config){
            addToConfigs(result.config)
            resetForm()
            //todo: Ayar eklenince toast uyarısı ver.
        }
    })
}


function sendToUpdateAll(){
    useConfig().updateAll(toRaw(configs.value)).then(result => {
        if(result.status){
            useConfig().getAll().then(result => {
                if(result.status && result.configs){
                    configs.value = result.configs
                    //todo: Ayar güncellendiğinde toast ile uyarı v er.
                }
            })
        }
    })
}



function resetForm(){
    Object.assign(config, initialConfig)
}

</script>

<style scoped>

</style>
