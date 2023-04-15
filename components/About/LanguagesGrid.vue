<template>
    <div class="text-center mb-3">
        <h3 class="coloredTitle">Dil <span>Bilgisi</span></h3>
    </div>
    <hr>
    <div class="d-flex flex-column flex-sm-row justify-content-between my-5">

        <div style="width: 200px" v-for="(i, k) in items" :key="k">
                <h5 class="coloredTitleReverse"><span>{{ i.postTitle }}</span></h5>
                <div class="d-flex justify-content-between">
                    <i v-for="n in 6" class="bi me-2" :class="{ 'bi-circle':n>Number(useGetPostExtra(i.extra, 'level', 1)), 'bi-circle-fill':n<=Number(useGetPostExtra(i.extra, 'level', 1)) }"></i>
                </div>
        </div>

    </div>
</template>

<script setup>
import {toRef} from "vue";
const props = defineProps(['items'])
const items = toRef(props, 'items')
</script>

<style scoped>

</style>
