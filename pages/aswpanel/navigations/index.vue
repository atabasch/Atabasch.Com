<template>
<div class="row">
    <div class="col-12 col-md-7">
        <PanelTitleBox title="Menüler"/>
        <table class="table table-striped table-bordered table-hovered bg-white">
            <thead>
            <tr>
                <th>Menü</th>
                <th>Slug</th>
                <th width="25"></th>
                <th width="25"></th>
                <th width="25"></th>
            </tr>
            </thead>
            <tbody>
            <template v-if="navigations">
                <tr v-for="(item, index) in navigations" :key="index">
                    <td class="fw-bold">{{ item.navigationName }}</td>
                    <td><code>{{ item.navigationSlug }}</code></td>
                    <td><NuxtLink :to="$getUrl.panel('/navigations/'+item.navigationId)" class="btn btn-primary btn-sm"><i class="bi bi-chevron-right"></i></NuxtLink></td>
                    <td><button class="btn btn-success btn-sm" @click="setNavigation(item, index)"><i class="bi bi-pencil"></i></button></td>
                    <td><button class="btn btn-danger btn-sm" @click="sendDelete(item, index)"><i class="bi bi-trash"></i></button></td>
                </tr>
            </template>
            </tbody>
        </table>
    </div><!-- col-12 col-md-7" -->


    <div class="col">
        <PanelTitleBox :title="!navigation.navigationId? 'Yeni Menü Oluştur' : 'Düzenle: '+navigation.navigationName"/>
        <form @submit.prevent="sendSave()">
            <div class="mb-2">
                <div class="form-label">Menü Adı</div>
                <input type="text" class="form-control" v-model="navigation.navigationName" required minlength="3">
            </div>

            <div class="mb-2">
                <div class="form-label">Menü Slug</div>
                <input type="text" class="form-control" v-model="navigation.navigationSlug" required minlength="3">
                <p class="form-text">Türkçe karakter bulunmayan küçük harfler ve (-)tire den oluşan bir isim</p>
            </div>

            <div class="row">
                <div class="mb-2 col-6">
                    <div class="form-label">Menü Kimliği <code>id="[...]"</code></div>
                    <input type="text" class="form-control" v-model="navigation.navigationExtra.id" required minlength="3">
                </div>

                <div class="mb-2 col-6">
                    <div class="form-label">Menü Sınıfı <code>class="[...]"</code></div>
                    <input type="text" class="form-control" v-model="navigation.navigationExtra.class" required minlength="3">
                </div>
            </div>

            <hr/>

            <div class="mb-2 text-end">
                <button v-if="!navigation.navigationId" class="btn btn-primary ms-2" type="submit">Oluştur</button>
                <button v-if="navigation.navigationId" class="btn btn-danger ms-2" type="button" @click="clearForm()">Vazgeç</button>
                <button v-if="navigation.navigationId" class="btn btn-success ms-2" type="submit">Güncelle</button>
            </div>
        </form>
    </div>


</div>
</template>

<script setup>

/**
 * ====================
 * === IMPORTS
 * ====================
 */
import {ref, toRaw} from "vue";
import useNavigation from "../../../composables/useNavigation";
const {$showToast, $showAlert} = useNuxtApp();

/**
 * ====================
 * === INITIALIZE
 * ====================
 */
definePageMeta({ layout: 'admin' })
useHead({ title: 'Navigasyonlar' })

const initExtra = {
    id: '',
    class: ''
}
const initNavigation = {
    navigationName: '',
    navigationSlug: '',
    navigationType: 'menu',
    navigationParent: 0,
    navigationExtra: {...initExtra}
}
const navigations = ref([])
const navigation = ref({...initNavigation})

/**
 * ====================
 * === FETCH
 * ====================
 */
useNavigation().getAll().then(result => {
    if(result.status && result.navigations){
        navigations.value = result.navigations
    }
})

/**
 * ====================
 * === METHODS
 * ====================
 */
const setNavigation = (nav, index) => {
    navigation.value = {
        index,
        ...nav,
        navigationExtra: JSON.parse(nav.navigationExtra)
    }
}

const clearForm = () => {
    navigation.value = {
        ...initNavigation,
        navigationExtra: {...initExtra}
    }
}

// SAVE
const sendSave = () => {
    if(navigation.value.navigationName.length > 2 && navigation.value.navigationSlug.length > 2) {
        if(!navigation.value.navigationId){
            sendCreate()
        }else{
            sendUpdate()
        }
    }
} //  sendSave

// NAVIGASYON OLUŞTURMAK
const sendCreate = () => {
        useNavigation().create(toRaw(navigation.value)).then(res => {
            if(res.status && res.navigation){
                navigations.value.push({...res.navigation})
                clearForm();
                $showToast('Navigasyon Menüsü Oluşturuldu')
            }else{
                $showToast(res.message || 'Menü oluşturma başarısız', 'error')
            }
        }).catch(() => { $showToast('Menü oluşturma başarısız oldu', 'error') })
}

// NAVİGASYONU GÜNCELLEME
const sendUpdate = () => {
    useNavigation().update(toRaw(navigation.value)).then(res => {
        if(res.status && res.navigation){
            navigations.value.splice( navigation.value.index, 1, {...res.navigation} )
            clearForm();
            $showToast('Navigasyon Menüsü Güncellendi')
        }else{
            $showToast(res.message || 'Menü güncelleme başarısız', 'error')
        }
    }).catch(() => { $showToast('Menü güncelleme başarısız oldu', 'error') })
} // sendUpdate


// NAVİGASYONU SİLMEK
const sendDelete = (nav, index) => {
    $showAlert({
        title: 'Menü Siinmek Üzere',
        body: `<strong>${nav.navigationName}</strong> menüsü ve bu menüye ait tüm elemanlar silinecek. Bu işlem bir daha geri alınamaz. Silmek istediğinizden emin misiniz?`
    }, function(){
        useNavigation().delete(toRaw(nav.navigationId)).then(res => {
            if(res.status && res.navigation){
                navigations.value.splice( index, 1)
                $showToast('Navigasyon Menüsü Silindi')
            }else{
                $showToast(res.message || 'Menü silme işlemi başarısız', 'error')
            }
        }).catch(() => { $showToast('Menü silme işlemi başarısız oldu', 'error') })
    })
} // sendDelete
</script>

<style scoped>

</style>
