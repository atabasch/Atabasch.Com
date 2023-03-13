<template>
    <div class="d-flex align-items-center" :class="{'justify-content-center':props.center}" :style="!props.fullHeight? '' : 'height: calc(100vh - 50px)'">
        <div class="d-inline-block py-2 " style="width: 240px">
            <div v-for="(i,k) in items" :key="k" :class="'spinner-grow mx-1 text-'+i" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps({
    center: {
        type:Boolean,
        default: false
    },
    fullHeight: {
        type:Boolean,
        default: false
    }
})

let spinner = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
]
let items = ref([])
let count = ref(0)
let setSpinners = setInterval(function(){
    if(count.value<spinner.length){
        items.value.push(spinner[count.value])
        count.value++
    }else{
        clearInterval(setSpinners)
    }
}, 25)

</script>

<style scoped>

</style>
