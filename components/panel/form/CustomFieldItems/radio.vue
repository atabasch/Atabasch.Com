<template>
    <div>
        <div class="form-check form-check-inline" v-for="(item, key) in getOptions">
            <input class="form-check-input" type="radio" :id="'key-'+key" :value="key" @input="e => $emit('update:modelValue', e.target.value)" :checked="props.modelValue===key">
            <label class="form-check-label" :for="'key-'+key">{{ item }}</label>
        </div>
    </div>
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
