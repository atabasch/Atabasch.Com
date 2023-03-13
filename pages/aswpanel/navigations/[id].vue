<template>
    <div class="row">
        <div class="col-12 col-md-7">
            <PanelTitleBox :title="'Navigasyon: ' + navigation.navigationName"/>
            <table class="table table-striped table-bordered table-hovered bg-white">
                <thead>
                <tr>
                    <th>Menü</th>
                    <th>Hedef</th>
                    <th width="25"></th>
                    <th width="25"></th>
                </tr>
                </thead>
                <tbody>
                <template v-if="navigation">
                    <tr v-for="(item, index) in navigation.items" :key="index">
                        <td class="fw-bold">{{ item.navigationName }}</td>
                        <td><code>{{ item.navigationTarget }}</code></td>
                        <td><button class="btn btn-success btn-sm" @click="setNavigation(item, index)"><i class="bi bi-pencil"></i></button></td>
                        <td><button class="btn btn-danger btn-sm" @click="sendDelete(item, index)"><i class="bi bi-trash"></i></button></td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div><!-- col-12 col-md-7" -->


        <div class="col">
            <PanelTitleBox :title="!item.navigationId? 'Yeni Bağlantı Ekle' : 'Düzenle: '+item.navigationName"/>
            <form @submit.prevent="sendSave()">
                <div class="mb-2">
                    <div class="form-label">Başlık</div>
                    <input type="text" class="form-control" v-model="item.navigationName" required minlength="3">
                </div>

                <div class="mb-2">
                    <div class="form-label">Hedef</div>
                    <input type="text" class="form-control" v-model="item.navigationTarget">
                    <p class="form-text">Bağlantıya tıklandığında gidilecek konum</p>
                </div>

                <div class="mb-2">
                    <div class="form-label">Sıra</div>
                    <input type="number" class="form-control" v-model="item.navigationOrder" required min="1" max="255">
                </div>

                <h6>Ekstra Özellikler</h6><hr>
                <div class="row mb-2">

                    <div class="col-6 mb-2">
                        <div class="form-label">Bağlantı yazısı öncesi</div>
                        <input type="text" class="form-control" v-model="item.navigationExtra.before">
                        <small class="form-text">{{ '<a href="#">[...] Bağlantı yazısı</a>' }}</small>
                    </div>

                    <div class="col-6 mb-2">
                        <div class="form-label">Bağlantı yazısı sonrası</div>
                        <input type="text" class="form-control" v-model="item.navigationExtra.after">
                        <small class="form-text">{{ '<a href="#">Bağlantı yazısı [...]</a>' }}</small>
                    </div>

                    <div class="col-6 mb-2">
                        <div class="form-label">Bağlantı Kimliği (id)</div>
                        <input type="text" class="form-control" v-model="item.navigationExtra.id">
                        <small class="form-text">{{ '<a href="#" id="[...]">...</a>' }}</small>
                    </div>

                    <div class="col-6 mb-2">
                        <div class="form-label">Bağlantı sınıfı (class)</div>
                        <input type="text" class="form-control" v-model="item.navigationExtra.class">
                        <small class="form-text">{{ '<a href="#" class="[...]">...</a>' }}</small>
                    </div>

                    <div class="col-6 mb-2">
                        <div class="form-label">Bağlantı Hedefi</div>
                        <select class="form-select" v-model="item.navigationExtra.target">
                            <option value="_self">Aynı pencerede açılsın</option>
                            <option value="_blank">Yeni pencerede açılsın</option>
                        </select>
                        <small class="form-text">{{ '<a href="#" target="[...]"></a>' }}</small>
                    </div>

                    <div class="col-6 mb-2">
                        <div class="form-label">Rel</div>
                        <select class="form-select" v-model="item.navigationExtra.rel">
                            <option value="">Herhangi bir şey ekleme</option>
                            <option v-for="(i,k) in relList" :key="k" :value="i">{{ i }}</option>
                        </select>
                        <small class="form-text">{{ '<a href="#" rel="[...]"></a>' }}</small>
                    </div>

                </div>


                <hr/>
                <div class="mb-2 text-end">
                    <button v-if="!item.navigationId" class="btn btn-primary ms-2" type="submit">Oluştur</button>
                    <button v-if="item.navigationId" class="btn btn-danger ms-2" type="button" @click="clearForm()">Vazgeç</button>
                    <button v-if="item.navigationId" class="btn btn-success ms-2" type="submit">Güncelle</button>
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
useHead({ title: 'Navigasyon Elemanları' })
const {id} = useRoute().params

const initExtra = {
    before: null,
    after: null,
    id: null,
    class: null,
    target: '_self',
    rel: '_self'
}
const initNavigation = {
    navigationName: "",
    navigationSlug: "",
    navigationType: "item",
    navigationParent: 0,
    navigationTarget: null,
    navigationOrder: 1,
    navigationExtra: {...initExtra}
}
const relList = ['alternate', 'author', 'bookmark', 'external', 'help', 'license', 'next', 'nofollow', 'noopener', 'noreferrer', 'prev', 'search', 'tag']
const navigation = ref({})
const item = ref({...initNavigation})

/**
 * ====================
 * === FETCH
 * ====================
 */
useNavigation().getOneWithItems(id).then(result => {
    if(result.status && result.navigation){
        navigation.value = result.navigation
        item.value.navigationParent = navigation.value.navigationId
    }
})

/**
 * ====================
 * === METHODS
 * ====================
 */
const setNavigation = (nav, index) => {
    item.value = {...nav, index:index, navigationExtra: JSON.parse(nav.navigationExtra)}
}

const clearForm = () => {
    item.value = {...initNavigation,
        navigationExtra: {...initExtra},
        navigationParent: navigation.value.navigationId
    }
}

// SAVE
const sendSave = () => {
    if(item.value.navigationName.length > 2) {
        if(!item.value.navigationId){
            sendCreate()
        }else{
            sendUpdate()
        }
    }
} //  sendSave

// NAVIGASYON OLUŞTURMAK
const sendCreate = () => {
    useNavigation().create(toRaw(item.value)).then(res => {
        if(res.status && res.navigation){
            navigation.value.items.push({...res.navigation})
            clearForm();
            $showToast('Navigasyon Bağlantısı Oluşturuldu')
        }else{
            $showToast(res.message || 'Bağlantı oluşturma başarısız', 'error')
        }
    }).catch((err) => {
        console.log(err)
        $showToast('Baağlantı oluşturma başarısız oldu', 'error') })
}

// NAVİGASYONU GÜNCELLEME
const sendUpdate = () => {
    useNavigation().update(toRaw(item.value)).then(res => {
        if(res.status && res.navigation){
            navigation.value.items.splice( item.value.index, 1, {...res.navigation} )
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
        title: 'Menü Silinmek Üzere',
        body: `<strong>${nav.navigationName}</strong> menüsü silinecek. Bu işlem bir daha geri alınamaz. Silmek istediğinizden emin misiniz?`
    }, function(){
        useNavigation().delete(toRaw(nav.navigationId)).then(res => {
            if(res.status && res.navigation){
                navigation.value.items.splice( index, 1)
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
