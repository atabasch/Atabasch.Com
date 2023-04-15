<template>
    <div class="box-dark-blue p-4">
        <h5 class="coloredTitle"><span>Kategoriler</span></h5>
        <hr>
        <ul class="menuList">
            <li v-for="(i,k) in categories" :key="k"><a href="#">{{ i.termTitle }} <span class="badge text-bg-primary float-end" style="width: 40px">{{ i.count }} </span></a></li>
        </ul>
    </div>


    <div class="box-dark-blue p-4 mt-4">
        <ColoredTitle title="Çok Okunanlar" :size="5" />
        <BlogSidebarPost v-for="n in 5" :item="{postId:n}" />
    </div>
</template>

<script setup>

import {ref} from "vue";
import ColoredTitle from "../global/ColoredTitle";
import {useGetTerms} from "../../composables/useGetDatas";

const categories = ref([])


useGetTerms({
    name: 'kategori',
    columns: 'termId,termTitle,termSlug'
}).then(({status, terms}) => {
    if(status && terms){
        categories.value = terms
    }
})
</script>

<style scoped>
.menuList{
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.menuList li:not(:last-child){
    border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
}
.menuList a{
    display: block;
    text-decoration: none;
    padding: 12px 8px;
    font-size: 18px;
}
.menuList a:hover{
    background-color: rgba(0,0,0,0.2);
}

</style>
