<template>
    <div class="box-dark-blue p-4">
        <h5 class="coloredTitle"><span>Kategoriler</span></h5>
        <hr>
        <ul class="menuList">
            <li v-for="(i,k) in (storeSite().getTaxonomy('kategori')?.terms || [])" :key="k">
                <NuxtLink :to="`/${storeSite().getTaxonomy('kategori').taxSlug}/${i.termSlug}`">{{ i.termTitle }} <span class="badge text-bg-primary float-end" style="width: 40px">{{ i.count }} </span></NuxtLink>
            </li>
        </ul>
    </div>


    <div class="box-dark-blue p-4 mt-4">
        <ColoredTitle title="Çok Okunanlar" :size="5" />
        <BlogSidebarPost v-for="(item,key) in (storeSite().getTopPosts || [])" :key="'top-views-post-'+key" :item="item" />
    </div>
</template>

<script setup>
import ColoredTitle from "../global/ColoredTitle";
import {storeSite} from "~/stores/site";
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
