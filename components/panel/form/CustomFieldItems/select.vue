<template>
    <select @change="e => $emit('update:modelValue', e.target.value)" class="form-control form-select" :required="field.fieldRequired">
        <option v-for="(item, key) in getOptions" :key="key" :value="key" :selected="props.modelValue===key">{{ item }}</option>
    </select>
</template>

<script setup>
import {computed, defineProps} from "vue";
const props = defineProps(['modelValue', 'field'])

const getOptions = computed(() => {
    return props.field.fieldOptions.split(/\n/).reduce((obj, item) => {
        let parts = item.split(':')
        obj[parts[0]] = parts[1]
        return obj
    }, {})
})
</script>
