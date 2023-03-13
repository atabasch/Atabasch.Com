<template>
    <textarea :type="field.fieldType"
           class="form-control"
           :value="props.modelValue"
           @input="e => $emit('update:modelValue', e.target.value)"
           :required="field.fieldRequired"
            rows="3"></textarea>
</template>

<script setup>
import {defineProps} from "vue";
const props = defineProps(['modelValue', 'field'])
</script>
