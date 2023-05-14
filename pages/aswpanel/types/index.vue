<template>
<div>
    <div class="row">

        <div class="col-12 col-md-7">
            <PanelTitleBox title="İçerik Tipleri"/>
            <table class="table table-striped table-bordered table-hovered bg-white">
                <thead>
                <tr>
                    <th>Başlık</th>
                    <th>Taksonomiler</th>
                    <th width="25">D</th>
                    <th width="25"></th>
                    <th width="85"></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="storeType().getTypes">
                    <tr v-for="(item, index) in storeType().getTypes" :key="index">
                        <td class="fw-bold">{{ item.postTypeTitle }} <code>{{ item.postTypeSlug }}</code></td>
                        <td>{{ item.postTypeTaxonomies }}</td>
                        <td>
                            <button v-if="item.postTypeStatus" class="btn btn-sm btn-success"><i class="bi bi-check2"></i></button>
                            <button v-if="!item.postTypeStatus" class="btn btn-sm btn-danger"><i class="bi bi-x"></i></button>
                        </td>
                        <td>
                            <NuxtLink :to="$getUrl.panel('/posts/type/'+item.postTypeSlug)" class="btn btn-sm btn-primary"><i class="bi bi-chevron-right"></i></NuxtLink>
                        </td>
                        <td>
                            <button class="btn btn-outline-success btn-sm me-1" @click="setTheType(item, index)"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-outline-danger btn-sm" @click="sendToDelete(item, index)"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div><!-- col-12 col-md-7" -->

        <div class="col">
            <PanelTitleBox title="İçerik Tipi Oluştur"/>
            <PanelFormPostType :type="type" :update="update" @created="onCreate($event)" @updated="onUpdate($event)" @cancelled="onCancel()"></PanelFormPostType>
        </div><!-- col -->

    </div><!-- row -->
</div>
</template>

<script setup>
import {ref} from "vue"
import {storeType} from "../../../stores/type";

definePageMeta({ layout: 'admin' })
useHead({ title: 'İçerik Tipleri' })

const {$showToast, $showAlert} = useNuxtApp()
const initType = {
    postTypeSlug: '',
    postTypeTitle: '',
    postTypeTitleSingle: '',
    postTypeTitlePlural: '',
    postTypeDescription: '',
    postTypeIcon: '',
    postTypeTaxonomies: [],
    postTypeStatus: true,
}

const type = ref({...initType})
const update = ref(false)

// METHODS
function setTheType(item, index){
    type.value  = {...item}
    update.value = true
}

function onCreate(type){
    storeType().putType(type)
    onCancel()
}


function onUpdate(type){
    storeType().updateType(type)
    onCancel()
}

function onCancel(){
    type.value = {...initType}
    update.value = false
}

function sendToDelete(item, index){
    $showAlert({
        title : 'İçerik Tipi Silinecek',
        body: `<strong>${item.postTypeTitle}</strong> başlıklı içerik tipi silinecek bu işlem bir daha geri alınamaz. Silmek istediğinize emin misiniz?`,
        confirmText: 'Eminim Sil'
    }, function(result){
        usePostType().delete(item.postTypeId).then( async (response) => {
            if(response.status){
                $showToast(response.message || 'İçerik tipi silindi')
                storeType().deleteType(index)
            }else{
                $showToast(response.message || 'İçerik tipi silinemedi', 'error')
            }
        } ).catch(err => { $showToast('Beklenmedik bir hata oluştu', 'error') })
    })
}

</script>

<style scoped>

</style>
