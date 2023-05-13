<template>
    <PanelTitleBox title="Özel Alanlar"/>

    <div class="border p-3 mb-3" v-for="(field, index) in props.fields" :key="index">
            <label class="form-label fw-bold fs-6">{{ field.fieldLabel }}{{ field.fieldRequired? '*' : '' }}</label>
            <component :is="getComponent($customTypes[field.fieldType].componentName)" :field="field" v-model="items[field.fieldName]"/>
            <div class="form-text" v-if="field.fieldDescription">{{ field.fieldDescription }}</div>
    </div>
</template>

<script setup>
import input from "./CustomFieldItems/input"
import select from "./CustomFieldItems/select"
import textarea from "./CustomFieldItems/textarea"
import radio from "./CustomFieldItems/radio"
import checkbox from "./CustomFieldItems/checkbox"
import switchCheckbox from "./CustomFieldItems/switch"
import image from "./CustomFieldItems/image"
import image_multiple from "./CustomFieldItems/images"


import {toRef} from "vue";
const props = defineProps(['fields', 'items'])
const items = toRef(props, "items")

let fields = {
    'input': input,
    'select': select,
    'textarea': textarea,
    'radio': radio,
    'checkbox': checkbox,
    'switch': switchCheckbox,
    'image': image,
    'image_multiple': image_multiple,
}
const getComponent = (name) => fields[name]
</script>

<style scoped>

</style>
