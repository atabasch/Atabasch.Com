<template>
    <p class="alert alert-warning p-2 fs-6" v-if="showMessage"><small>{{ field.fieldLabel }} değiştirildi. içeriği güncellemeyi unutma aksi durumda bu değişiklik gerçekleşmeyecek.</small></p>

    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">

        <div class="col" v-for="(img, key) in getImages" :key="'field-images-img-'+key">
            <ImageUploadBox :value="img"
                            :field="props.field"
                            :required="field.fieldRequired"
                            @uploaded="uploadedTheFile($event, key)"
                            @removed="removedTheFile($event, key)" />
        </div>


        <div class="col">
            <div class="ratio ratio-1x1">
                <button class="btn btn-secondary rounded-0" @click="addImageBox()"><em class="bi bi-plus-circle fs-1"></em></button>
            </div>

        </div>

    </div>

</template>

<script setup>
import {computed, ref, toRef} from "vue";
import ImageUploadBox from "./ImageUploadBox.vue";

const props = defineProps(['modelValue', 'field'])
const emits = defineEmits(['update:modelValue'])
const showMessage = ref(false)
const modelValue = toRef(props, 'modelValue', [null])
const imageItems = ref([null])

const getImages = computed(() => {
    imageItems.value = Array.isArray(modelValue.value)? modelValue.value : modelValue.value.split(',')
    return imageItems.value
})

const setModelValue = (value=null) => {
    emits('update:modelValue', value)
    showMessage.value = true
}

const uploadedTheFile = async (url, key) => {
    imageItems.value[key] = (url)
    setModelValue(imageItems.value.join(','))
}

const removedTheFile = (url, key) => {
    imageItems.value.splice(key, 1)
    setModelValue(imageItems.value.join(','))
}

const addImageBox = () => {
    imageItems.value.push(null)
}


</script>
