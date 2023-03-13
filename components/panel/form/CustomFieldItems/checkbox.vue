<template>
    <div>
        <div class="form-check form-check-inline" v-for="(item, key) in getOptions">
            <input class="form-check-input"
                   type="checkbox"
                   :id="'key-'+key"
                   :value="key"
                   v-model="checkedItems"
                   @change="e => $emit('update:modelValue', checkedItems)" />
            <label class="form-check-label" :for="'key-'+key">{{ item }}</label>
        </div>
    </div>
</template>

<script setup>
import {computed, defineProps, onMounted, ref} from "vue";
const props = defineProps(['modelValue', 'field'])
const checkedItems = ref([])

const getOptions = computed(() => {
    return props.field.fieldOptions.split(/\n/).reduce((obj, item) => {
        let parts = item.split(':')
        obj[parts[0]] = parts[1]
        return obj
    }, {})
})

onMounted(() => {

})
</script>
