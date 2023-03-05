<template>
    <form action="" ref="form" @submit.prevent="sendTheContact()">
<div class="row">
    <template v-if="sent.showAlert">
        <div class="col-12">
            <p :class="'p-3 text-center h5 text-white alert alert-' + (!sent.status? 'danger' : 'success')">
                {{ sent.message }}
            </p>
        </div>
    </template>

    <template v-if="sent.showForm">

        <div class="col-12 col-md-6">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="contactSender" placeholder="Ad ve Soyad"  v-model="contact.contactSender" required>
                <label for="contactSender">Ad ve Soyad</label>
            </div>
        </div>

        <div class="col-12 col-md-6">
            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="contactEmail" placeholder="E-Posta Adresi"  v-model="contact.contactEmail" required>
                <label for="contactEmail">E-Posta Adresi</label>
            </div>
        </div>

        <div class="col-12 col-md-6">
            <div class="form-floating mb-3">
                <select class="form-control form-select " id="contactSubject" placeholder="İletişimin Amacı"  v-model="contact.contactSubject" required>
                    <option v-for="(v, i) in $contactSubjects" :value="i">{{ v.label }}</option>
                </select>
                <label for="contactSubject">İletişimin Amacı</label>
            </div>
        </div>

        <div class="col-12 col-md-6">
            <div class="form-floating mb-3">
                <input type="tel" class="form-control" id="contactPhone" placeholder="Telefon Numarası"  v-model="contact.contactPhone">
                <label for="contactPhone">Telefon Numarası</label>
            </div>
        </div>

        <div class="col-12">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="contactTitle" placeholder="Konu Başlığı"  v-model="contact.contactTitle" required>
                <label for="contactTitle">Konu Başlığı</label>
            </div>
        </div>

        <div class="col-12">
            <div class="form-floating mb-3">
                <textarea style="min-height: 250px" class="form-control" id="contactContent" placeholder="Mesaj" v-model="contact.contactContent" required></textarea>
                <label for="contactContent">Mesaj</label>
            </div>
        </div>

        <div class="col-12 text-end">
            <button class="btn btn-primary text-white pe-4" type="submit"><i class="bi bi-send-fill text-white mx-1"></i> Gönder</button>
        </div>
    </template>


</div>
    </form>
</template>

<script setup>
import {reactive, ref} from "vue";

const form = ref(null)
const sent = reactive({showAlert:false, showForm:true, status:false, message: ''})
const contact = reactive({
    contactTitle:   '',
    contactSender:  '',
    contactSubject: 'help',
    contactEmail:   '',
    contactPhone:   '',
    contactContent: '',
    contactMedia:   null,
    contactExtra:   null,
})

// METHODS
function sendTheContact(){
    useContact().create(contact).then( response => {
        sent.showAlert = true
        sent.status = response.status
        sent.message = response.message
        sent.showForm = !response.status // true dönerse form görünmesin false getirse hala görünsünsent.show = !response.status
    } ).catch(() => {
        sent.showAlert = true
        sent.status = false
        sent.message = 'Beklenmedik bir hat aoluştu. Lütfen daha sonra tekrar deneyin.'
    })
}
</script>

<style scoped>

</style>
