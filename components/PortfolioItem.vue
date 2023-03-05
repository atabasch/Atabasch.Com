<template>
    <div class="workItem box-dark-blue p-3">
        <a href="">
            <figure class="img-filter-dark-blue">
                <img :src="'https://picsum.photos/id/3'+item.id+'0/600/450'" class="img-fluid" />
                <figcaption></figcaption>
            </figure>
        </a>
        <div class="p-2">
            <h4><a href="" class="link-light text-decoration-none">emeyz.com</a></h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vitae risus eget maximus. Pellentesque suscipit</p>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps(['item'])
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
