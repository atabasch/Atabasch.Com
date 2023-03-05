<template>
        <div class="d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse':reverse }">
            <h3 :class="'coloredTitle h'+size" v-html="getTitle"></h3>
            <div>
                <NuxtLink v-if="more" :to="more.path" class="text-decoration-none" >{{ more.label || 'Tümünü Görüntüle' }}</NuxtLink>
                <slot/>
            </div>
        </div>
        <hr/>
</template>

<script setup>
import {computed, toRef} from "vue";

const props = defineProps({
    title: {type:String, default: ''},
    size: {type:Number, default: 3},
    more: {type:Object},
    reverse: {type:Boolean, default: false}
})

const title = toRef(props, 'title')
const size = toRef(props, 'size')
const more = toRef(props, 'more')
const reverse = toRef(props, 'reverse')


const getTitle = computed(() => {
    let parts = title.value.split(' ')
    return `${parts[0] || ''} <span>${parts.slice(1).join(' ')}</span>`
})
</script>

<style scoped>

</style>
