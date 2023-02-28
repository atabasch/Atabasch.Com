<template>
    <div class="row">
        <div class="col-md-7">
            <PanelTitleBox title="Taxonomi Listesi"></PanelTitleBox>
            <table class="table table-striped table-bordered table-hovered bg-white">
                <thead>
                    <tr>
                        <th width="30">#</th>
                        <th>Taksonomi</th>
                        <th width="25"></th>
                        <th width="25"></th>
                        <th width="25"></th>
                        <th width="25"></th>
                    </tr>
                </thead>

                <tbody>

                    <tr v-for="(tax, index) in storeTaxonomy().getTaxonomies" :key="index">
                        <td>{{ tax.taxId }}</td>
                        <td><strong>{{ tax.taxTitle }} <code>{{ tax.taxSlug }}</code></strong>  <br>
                            <small class="text-secondary">{{ tax.taxDescription }}</small>
                        </td>
                        <td v-if="tax.taxStatus"><button class="btn btn-success btn-sm"><i class="bi bi-check"></i></button></td>
                        <td v-if="!tax.taxStatus"><button class="btn btn-danger btn-sm"><i class="bi bi-x"></i></button></td>
                        <td><NuxtLink :to="'/aswpanel/taxonomies/'+tax.taxSlug" @click="setCurrentTaxonomy(tax, index)" class="btn btn-primary btn-sm"><i class="bi bi-chevron-right"></i></NuxtLink></td>
                        <td><button @click="setCurrentTaxonomy(tax, index)" class="btn btn-success btn-sm"><i class="bi bi-pencil"></i></button></td>
                        <td><button @click="checkDeleteTaxonomy(tax, index)" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></button></td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col">
            <PanelTitleBox title="Taxonomi Ekle"></PanelTitleBox>
            <div class="mb-2">
                <label for="" class="form-label">Taksonomi Adı</label>
                <input type="text" class="form-control" v-model="taxonomy.taxTitle">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Url adı (slug)</label>
                <input type="text" class="form-control" v-model="taxonomy.taxSlug">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Tekil İsim</label>
                <input type="text" class="form-control" v-model="taxonomy.taxTitleSingular">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Çoğul adlandırma</label>
                <input type="text" class="form-control" v-model="taxonomy.taxTitlePlural">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Açıklama</label>
                <textarea rows="3" class="form-control" v-model="taxonomy.taxDescription"></textarea>
            </div>

            <div class="form-check mb-2">
                <input class="form-check-input" type="checkbox" value="1" v-model="taxonomy.taxStatus" id="status" checked>
                <label class="form-check-label" for="status" >Bu taxonomi altındaki içerikler yayınlansın</label>
            </div>

            <hr>

            <div class="text-end">
                <button class="btn btn-danger mx-1" v-if="taxonomy.taxId" @click="clearForm()">Vazgeç</button>
                <button class="btn btn-success mx-1" v-if="taxonomy.taxId" @click="sendToUpdate">Güncelle</button>
                <button class="btn btn-primary mx-1" v-if="!taxonomy.taxId" @click="sendToCreate">Oluştur</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import Swal from "sweetalert2"
import {ref} from "vue"
import {storeTaxonomy} from "@/stores/taxonomy";

definePageMeta({ layout: 'admin' })
useHead({title: 'Taksonomiler'})

const initTaxonomy = {
    taxTitle: '',
    taxSlug: '',
    taxTitleSingular: '',
    taxTitlePlural: '',
    taxDescription: '',
    taxStatus: true
}
const taxonomies = ref([])
const taxonomy = ref({...initTaxonomy} )

// İşlem görecek taxonomiyi belleğe al
const setCurrentTaxonomy = (item, index)  => {
    taxonomy.value = {...item, index}
}

// Taxonomi silinsin mi diye sor
const checkDeleteTaxonomy = (item, index)  => {
    taxonomy.value = {...item, index}
    Swal.fire({
        icon: 'warning',
        title: 'Taksonmi Silinecek!',
        html:   `<strong>${item.taxTitle}</strong> isimli taksonomiyi silmek üzeresiniz. Bu işlemi bir daha geri almak mümkün değildir. Hala silmek istediğinize emin misiniz?`,
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
const clearForm = () => { taxonomy.value = {...initTaxonomy} }

// İçeriği Kaydet
const sendToCreate = () => {
    useTaxonomy().create(toRaw(taxonomy.value)).then( (data) => {
        if(data.status){
            storeTaxonomy().addTaxonomy(data.taxonomy)
            clearForm()
            showToast('Taksonomi oluşturuldu')
        }else{
            showToast('Beklenmedik bir hata oluştu', 'error')
        }
    } ).catch(err => { showToast('Beklenmedik bir hata oluştu', 'error') })
}

// İçeriği güncelle
const sendToUpdate = () => {
    useTaxonomy().update(toRaw(taxonomy.value)).then( (data) => {
        if(data.status){
            storeTaxonomy().updateTaxonomy(data.taxonomy)
            clearForm()
            showToast('Taksonomi güncelleme başarılır')
        }else{
            showToast('Beklenmedik bir hata oluştu', 'error')
        }
    } ).catch(err => { showToast('Beklenmedik bir hata oluştu', 'error') })
}


// İçeriği Sil
const sendToDelete = () => {
    useTaxonomy().delete(toRaw(taxonomy.value)).then( (data) => {
        if(data.status){
            storeTaxonomy().deleteTaxonomy(data.taxonomy)
            clearForm()
            showToast("Taksonomi silindi")
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
