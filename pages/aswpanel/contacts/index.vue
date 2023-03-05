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
        <div class="bg-white border h-100 py-2 px-3">

            <template v-if="contact.contactId">
                <h1>{{ contact.contactTitle }}</h1>
                <small>{{ contact.contactSender }}</small>
                <div>{{ contact.contactContent }}</div>
            </template>

        </div>
    </div>
</div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";

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
