<template>
<div>
    <div class="row">
        <div class="col-md-7">
            <PanelTitleBox :title="taxonomy.taxTitle"></PanelTitleBox>
            <table class="table table-striped table-bordered table-hovered bg-white">
                <thead>
                <tr>
                    <th width="30">#</th>
                    <th>İsim</th>
                    <th width="50">Durum</th>
                    <th width="25"></th>
                    <th width="25"></th>
                </tr>
                </thead>

                <tbody>

                <tr v-for="(term, index) in getTerms" :key="index">
                    <td>{{ term.termId }}</td>
                    <td><strong>{{ term.termTitle }} <code>{{ term.termSlug }}</code></strong>  <br>
                        <small class="text-secondary">{{ term.termDescription }}</small>
                    </td>
                    <td>{{ term.taxStatus }}</td>
                    <td><button @click="setCurrentItem(term, index)" class="btn btn-success btn-sm"><i class="bi bi-pencil"></i></button></td>
                    <td><button @click="checkDeleteItem(term, index)" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button></td>
                </tr>

                </tbody>
            </table>
        </div>

        <div class="col">
            <PanelTitleBox :title="`Yeni ${taxonomy.taxTitleSingular}`"></PanelTitleBox>
            <div class="mb-2">
                <label for="" class="form-label">Başlık</label>
                <input type="text" class="form-control" v-model="term.termTitle">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Açıklama</label>
                <textarea rows="3" class="form-control" v-model="term.termDescription"></textarea>
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Sıra Numarası</label>
                <input type="number" class="form-control" v-model="term.termOrder">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Üst Eleman</label>
                <select  class="form-select" v-model="term.termParent">
                    <option value="0">Üst elemanı yok</option>
                    <option :value="v.termId" v-for="(v,i) in getTermsForParent" :key="i">{{ v.termTitle }}</option>
                </select>
            </div>

            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" value="1" v-model="taxonomy.taxStatus" id="status" checked>
                <label class="form-check-label" for="status" >Eleman Durumu</label>
            </div>



            <hr>

            <div class="text-end">
                <button class="btn btn-danger mx-1" v-if="term.termId" @click="clearForm()">Vazgeç</button>
                <button class="btn btn-success mx-1" v-if="term.termId" @click="sendToUpdate">Güncelle</button>
                <button class="btn btn-primary mx-1" v-if="!term.termId" @click="sendToCreate">Oluştur</button>
            </div>
        </div>

    </div>
</div>
</template>

<script setup>
import Swal from "sweetalert2"
import {ref, computed} from "vue"
import useTaxonomy from "../../../composables/useTaxonomy";

definePageMeta({
    layout: 'admin'
})


const initValue = {
    term: {
        taxId: 0,
        termTitle: '',
        termSlug: '',
        termDescription: '',
        termParent: 0,
        termOrder: 0,
    }
}

const {params: urlParams} = useRoute()
const taxonomy = ref({} )
const terms = ref([])
const term = ref({...initValue.term} )



// Taksonomileri getir
useTaxonomy().getOne(urlParams.taxonomy).then( response => {
    if(response.status){
        taxonomy.value = response.taxonomy
        terms.value = response.terms
        term.value.taxId = taxonomy.value.taxId
    }
} )


// Taxonomies COmputed
const getTerms = computed( () => terms.value )
const getTermsForParent = computed( () => terms.value.filter(i => i.termId!==term.value.termId) )

// İşlem görecek taxonomiyi belleğe al
const setCurrentItem = (item, index)  => {
    term.value = {...item, index}
}

// Taxonomi silinsin mi diye sor
const checkDeleteItem = (item, index)  => {
    term.value = {...item, index}
    Swal.fire({
        icon: 'warning',
        title: 'Eleman (Terim) Silinecek!',
        html:   `<strong>${item.termTitle}</strong> isimli elemanı silmek üzeresiniz. Bu işlemi bir daha geri almak mümkün değildir. Hala silmek istediğinize emin misiniz?`,
        showCancelButton: true,
        cancelButtonText: 'Vazgeç',
        showConfirmButton: true,
        confirmButtonText: 'Eminim, Sil'
    }).then( result => {
        if(result.isConfirmed){
            sendToDelete()
        }else{
            clearForm()
        }
    } )
}


// Güncellenen içeriği iptal et
const clearForm = () => {
    term.value = {...initValue.term, taxId: taxonomy.value.taxId}
}

// İçeriği Kaydet
const sendToCreate = () => {
    useTaxonomy().term.create(toRaw(term.value)).then( (response) => {
        if(response.status){
            terms.value.unshift(response.term)
            clearForm()
            showToast('Yeni eleman oluşturuldu')
        }else{
            showToast('Beklenmedik bir hata oluştu', 'error')
        }
    } ).catch(err => { showToast('Beklenmedik bir hata oluştu', 'error') })
}

// İçeriği güncelle
const sendToUpdate = () => {
    useTaxonomy().term.update(toRaw(term.value)).then( (data) => {
        if(data.status){
            terms.value.splice(term.value.index, 1, data.term)
            clearForm()
            showToast(data.message || 'Eleman güncelleme başarılı')
        }else{
            showToast(data.message || 'Beklenmedik bir hata oluştu', 'error')
        }
    } ).catch(err => { showToast('Beklenmedik bir hata oluştu', 'error') })
}


// İçeriği Sil
const sendToDelete = () => {
    useTaxonomy().term.delete(toRaw(term.value)).then( (data) => {
        if(data.status){
            terms.value.splice(term.value.index, 1)
            clearForm()
            showToast("Terim silindi")
        }else{
            showToast('Beklenmedik bir hata oluştu', 'error')
        }
    } ).catch(err => { showToast('Beklenmedik bir hata oluştu', 'error') })
}

const showToast = (msg='', icon='success') => {
    Swal.fire({
        icon: icon,
        title: msg,
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2500
    });
}

</script>

<style scoped>

</style>
