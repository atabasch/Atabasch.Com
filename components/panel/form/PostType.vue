<template>
    <div class="mb-2">
        <label for="" class="form-label">Başlık</label>
        <input type="text" class="form-control" v-model="type.postTypeTitle"/>
    </div>

        <div class="row mb-2">
            <div class="col-6">
                <label for="" class="form-label">Tip Kodu</label>
                <input type="text" class="form-control" v-model="type.postTypeSlug"/>
                <div class="form-text">Tamamı küçük harf, boşluksuz ve türkçe karakter içermeden yazılan benzersiz metinsel değerler olmalıdır.</div>
            </div>
            <div class="col-6">
                <label for="" class="form-label">İkon </label>
                <input type="text" class="form-control" v-model="type.postTypeIcon"/>
                <div class="form-text">(Bootstrap 5) <a href="https://icons.getbootstrap.com" target="_blank">https://icons.getbootstrap.com</a></div>
            </div>
        </div>

    <div class="mb-2">
        <label for="" class="form-label">Tekil Başlık</label>
        <input type="text" class="form-control" v-model="type.postTypeTitleSingle"/>
    </div>

    <div class="mb-2">
        <label for="" class="form-label">Çoğul Başlık</label>
        <input type="text" class="form-control" v-model="type.postTypeTitlePlural"/>
    </div>

    <div class="mb-2">
        <label for="" class="form-label">Açıklama</label>
        <textarea rows="2" class="form-control" v-model="type.postTypeDescription"></textarea>
    </div>



    <div class="mb-2">
        <label for="" class="form-label">Bağlı Taksonomiler</label>
        <ul class="list-group">
            <li class="list-group-item" v-for="(t, i) in taxonomies" :key="i">
                <input class="form-check-input me-1" type="checkbox" :value="t.taxSlug" :id="'taxListItem'+t.taxId" v-model="type.postTypeTaxonomies">
                <label class="form-check-label stretched-link" :for="'taxListItem'+t.taxId">{{ t.taxTitle }}</label>
            </li>
        </ul>
    </div>

    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="postTypeStatusCheck" v-model="type.postTypeStatus">
        <label class="form-check-label" for="postTypeStatusCheck">İçerik tipi kullanılabilir</label>
    </div>

    <div class="mb-2 text-end">
        <hr>
        <button v-if="props.update" class="btn btn-danger me-1" @click="sendToCancel()">Vazgeç</button>
        <button v-if="props.update" class="btn btn-success me-1" @click="sendToUpdate()">Güncelle</button>
        <button v-if="!props.update" class="btn btn-primary" @click="sendToCreate()">Oluştur</button>
    </div>

</template>

<script setup>
// IMPORTS
import {watch, ref, toRef, reactive} from "vue"
import useTaxonomy from "../../../composables/useTaxonomy";
const {$showToast} = useNuxtApp()

// INITIALIZE
const emits = defineEmits(['created', 'updated', 'cancelled'])
const props = defineProps({
    type: {
        type: Object
    },
    update: {
        type: Boolean,
        default: false
    }
})
const type = toRef(props, 'type')
const taxonomies = ref([])

// FETCH
useTaxonomy().getAll().then(response => {
    if(response.status){
        taxonomies.value = response.taxonomies
    }
})

// METHODS
function sendToCreate(){
    usePostType().create(toRaw(type.value)).then(async (response) => {
        if(response.status && response.type){
            $showToast('İçerik tipi oluşturuldu')
            emits('created', {...response.type})
        }else{
            $showToast('İçerik tipi oluşturulamadı', 'error')
        }
    }).catch( err => {
        $showToast('İçerik tipi oluşturulamadı', 'error')
    })
}

function sendToUpdate(){
    usePostType().update(toRaw(type.value)).then(response => {
        if(response.status && response.type){
            $showToast('İçerik tipi güncellendi')
            emits('updated', {...response.type})
        }else{
            $showToast('İçerik tipi güncellenemedi', 'error')
        }
    }).catch(err => { $showToast('Beklenmedik bir sorun oluştu', 'error') })
}

function sendToCancel(){
    emits('cancelled')
}

watch(type, (nv, ov) => {
    if(type.value.postTypeId){
        type.value.postTypeTaxonomies = (typeof nv.postTypeTaxonomies !== 'object')? [] : JSON.parse(nv.postTypeTaxonomies)
    }
})

</script>

<style scoped>

</style>
