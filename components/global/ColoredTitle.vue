<template>
        <div class="d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse':rtl }">
            <component :is="getHeadComponent" :title="getTitle" :className="reverse? 'coloredTitleReverse' : 'coloredTitle'"/>
            <div>
                <NuxtLink v-if="more" :to="more.path" class="text-decoration-none" >{{ more.label || 'Tümünü Görüntüle' }}</NuxtLink>
                <slot/>
            </div>
        </div>
        <hr v-if="!borderless"/>
</template>

<script setup>
import {computed, toRef} from "vue";
import th1 from "../Title/ColoredH1"
import th2 from "../Title/ColoredH2"
import th3 from "../Title/ColoredH3"
import th4 from "../Title/ColoredH4"
import th5 from "../Title/ColoredH5"
import th6 from "../Title/ColoredH6"

const subComponents = [th1, th2, th3, th4, th5, th6]

const props = defineProps({
    title: {type:String, default: ''},
    size: {type:[String,Number], default: 3},
    more: {type:Object},
    reverse: {type:Boolean, default: false},
    rtl: {type:Boolean, default: false},
    borderless: {type:Boolean, default: false},
})

const title     = toRef(props, 'title')
const size      = toRef(props, 'size')
const more      = toRef(props, 'more')
const reverse   = toRef(props, 'reverse')
const rtl   = toRef(props, 'rtl')
const borderless   = toRef(props, 'borderless')


const getTitle = computed(() => {
    let parts = title.value.split(' ')
    return `${parts[0] || ''} <span>${parts.slice(1).join(' ')}</span>`
})

const getHeadComponent = computed(() => subComponents[size.value-1])
</script>

<style scoped>

</style>
