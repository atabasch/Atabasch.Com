<template>
    <div class="form-check form-switch">
        <input class="form-check-input"
               type="checkbox"
               role="switch"
               :id="'switch-'+props.field.fieldName"
               value="1"
               v-model="value"
               @change="updateValue()"
               :checked="getValue()"
        >
        <label class="form-check-label" :for="'switch-'+props.field.fieldName">{{ props.field.fieldDescription || props.field.fieldLabel }}</label>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
const props = defineProps(['modelValue', 'field'])
const emits = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

onMounted(() => {
    if([1, '1', 'on', true, 'true'].indexOf(props.modelValue) >= 0){
        emits('update:modelValue', true)
    }else{
        emits('update:modelValue', false)
    }
})

function getValue(){
    return ([1, '1', 'on', true, 'true'].indexOf(props.modelValue) >= 0)
}

function updateValue(){
    emits('update:modelValue', value.value)
}
</script>
