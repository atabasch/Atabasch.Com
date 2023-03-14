<template>
<PanelTitleBox title="İletişim Mesajları"/>
<div class="row">
    <div class="col-3">

        <div class="list-group">
            <NuxtLink to="#" class="list-group-item list-group-item-action" :class="{'active': (contact.contactId || null)===c.contactId}" aria-current="true" v-for="(c,i) in getContacts" :key="i" @click.prevent="getTheContact(c)">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1 fw-bold">{{ c.contactSender }}</h6>
                    <small v-html="$getDateFormat(c.contactCreatedAt, 'date')"></small>
                </div>
                <p class="m-0">{{ c.contactTitle }}</p>
                <div class="text-end">
                    <small :class="'badge text-bg-'+$contactSubjects[c.contactSubject].color" v-html="$contactSubjects[c.contactSubject].label"></small>
                </div>
            </NuxtLink>
        </div>


    </div>
    <div class="col">
        <div class="bg-white border pt-2 px-3 pb-4  mb-3">

            <template v-if="contact.contactId">
                <h1>{{ contact.contactTitle }}</h1>
                <small>{{ contact.contactSender }}</small>
                <div>{{ contact.contactContent }}</div>
            </template>

        </div>

        <div class="bg-white border py-2 px-3">
            <h4>Cevap Yaz</h4><hr>

            <div class="mb-2">
                <label for="" class="form-label">Başlık</label>
                <input type="text" class="form-control">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Mesaj</label>
                <textarea rows="10" class="form-control"></textarea>
            </div>

            <div class="mb-2 text-end">
                <button class="btn btn-primary"><i class="bi bi-envelope"></i> Gönder</button>
            </div>
        </div>

    </div>
</div>
</template>

<script setup>
import {computed, ref} from "vue";

definePageMeta({layout: 'admin' })
useHead({title: 'İletişim Mesajları'})

const contacts = ref([])
const contact = ref({})

useContact().getAll().then(result => {
    if(result.status){
        contacts.value = result.contacts
    }
})

// COMPUTEDS
const getContacts = computed(() => contacts.value)

// METHODS
function getTheContact(cObj){
    useContact().getOne(cObj.contactId).then(response => {
        if(response.status){
            contact.value = response.contact
        }
    })
}
</script>

<style scoped>

</style>
