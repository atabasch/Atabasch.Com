<template>
    <p class="alert alert-warning p-2 fs-6" v-if="showMessage"><small>{{ field.fieldLabel }} değiştirildi. içeriği güncellemeyi unutma aksi durumda bu değişiklik gerçekleşmeyecek.</small></p>

    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">

        <div class="col">
            <ImageUploadBox :value="props.modelValue"
                            :field="props.field"
                            :required="field.fieldRequired"
                            @uploaded="uploadedTheFile($event)"
                            @removed="removedTheFile($event)" />
        </div>


    </div>

</template>

<script setup>
import {ref} from "vue";
import ImageUploadBox from "./ImageUploadBox.vue";

const props = defineProps(['modelValue', 'field'])
const emits = defineEmits(['update:modelValue'])
const showMessage = ref(false)


const setModelValue = (value=null) => {
    emits('update:modelValue', value)
    showMessage.value = true
}

const uploadedTheFile = async (url) => {
    setModelValue(url)
}

const removedTheFile = (url) => {
    setModelValue(url)
}






</script>
