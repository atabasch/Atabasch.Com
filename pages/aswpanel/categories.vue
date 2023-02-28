<template>
<div class="row">
    <div class="col-7">
        <PanelTitleBox title="Kategori Listesi"></PanelTitleBox>
        <table class="table table-striped table-bordered table-hovered">

            <thead>
            <tr>
                <th>Kategori</th>
                <th>Açıklama</th>
                <th width="25">Durum</th>
                <th width="25">İçerik</th>
                <th>Oluşturma</th>
                <th width="25"></th>
                <th width="25"></th>
            </tr>
            </thead>

            <tbody>

            <tr v-for="(item, index) in getItems" :key="index">
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.total }}</td>
                <td v-html="getTheDate(item.createdAt)"></td>
                <td><button class="btn btn-success" @click="setCurrentCategory(item, index)">Düzenle</button></td>
                <td><button class="btn btn-danger" @click="willCategoryDeleted(item, index)">Sil</button></td>
            </tr>

            </tbody>

        </table>
    </div>
    <div class="col-5">
        <CategoryForm
            :category="currentCategory.index!==null? currentCategory.value : null"
            @created="pushToItems($event)"
            @updated="updateTheItem($event)"
            @cancelled="setCurrentCategory(null)"/>
    </div>
</div>
</template>

<script setup>
import {reactive, computed, toRaw} from "vue";
import Swal from "sweetalert2"
import CategoryForm from "~/components/panel/form/Category"
definePageMeta({
    layout: 'admin'
})


const currentCategory = reactive({index:null, value:{}});
const items     = useState('items', () => [])
const getItems  = computed(() => items.value );

// Sayfa açılınca çalıştırılacak method
useFetch('/api/panel/category').then( ({data, error}) => {
    items.value = toRaw(data.value.categories)
} ).catch(err => {
    console.log("errr: ", err)
})

// Kategori silinecek uyarısı
const willCategoryDeleted = (item, index) => {
    Swal.fire({
        title: 'Emin misiniz?',
        html: `<strong>${item.title}</strong> başlıklı kategoriyi silmek üzeresiniz. Bu işlem bir daha geri alınamayacak. İşlemi yapmak istediğinizden emin misiniz?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Vazgeç',
        confirmButtonText: 'Emini, Sil!'
    }).then((result) => {
        if (result.isConfirmed) {
            useFetch('/api/panel/category/delete', { body: { id: item.id }, method: 'POST' }).then( ({data, error}) => {
                Swal.fire({position: 'top-right', icon: 'success', title: 'Kategori silindi.', showConfirmButton: false, timer: 2500, toast: true});
                items.value.splice(index, 1);
            } )
        }
    })
}

// OLuşturulan kategoriyi listeye eklemek
const pushToItems = (category) => {
    items.value.unshift(category);
    Swal.fire({position: 'top-right', icon: 'success', title: 'Kategori oluşturuldu.', showConfirmButton: false, timer: 2500, toast: true});
}

// Güncellen kategoriyi yenilemek
const updateTheItem = (category) => {
    items.value.splice(currentCategory.index, 1, category);
    Swal.fire({position: 'top-right', icon: 'success', title: 'Kategori güncellendi.', showConfirmButton: false, timer: 2500, toast: true});
    setCurrentCategory(null);
}

// Veritabanından gelen Tarihi formatlamak
const getTheDate = (time) => {
    let date = new Date(time);
    return date.toLocaleString('tr-TR', {hour12:false, dateStyle: 'medium'});
}

// Kategori düzenleme işlemi için currentCategory güncelleme
const setCurrentCategory = (category, index=null) => {
    if(category === null){
        currentCategory.index = null;
        currentCategory.value = {}
    }else{
        currentCategory.index = index;
        currentCategory.value = category
    }
}
</script>

<style scoped>

</style>
