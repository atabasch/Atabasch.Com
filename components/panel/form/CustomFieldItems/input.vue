<template>
    <input :type="field.fieldType"
           class="form-control"
           :value="props.modelValue"
           @input="e => $emit('update:modelValue', e.target.value)"
            :required="field.fieldRequired"/>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps(['modelValue', 'field'])
</script>
