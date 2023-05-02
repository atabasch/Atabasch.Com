<template>

<main class="d-flex flex-nowrap">
    <div id="sidebarcontent" class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
        <Sidebar />
    </div>
    <div class="d-flex flex-column mt-2 mx-3 flex-grow-1">
        <div style="">
            <slot />
        </div>
    </div>
</main>
</template>

<script setup >
import {storeTaxonomy} from "@/stores/taxonomy"
import {storeType} from "@/stores/type"
import "sweetalert2/src/sweetalert2.scss"
import Sidebar from "@/components/panel/Sidebar";
import {onMounted} from "vue";


useHead({
    htmlAttrs: {
        lang: 'tr',
        'data-bs-theme': 'light'
    },
    bodyAttrs: {
        class: '',
        style: 'background-color: #F6F7F9;'
    }
})
const useType = storeType()
useAsyncData(function(){
    useTaxonomy().getAll().then( async (response) => {
        if(response.status && response.taxonomies){
            await storeTaxonomy().fillTaxonomies(response.taxonomies)
        }
    } )

    usePostType().getAll().then( async (response) => {
        if(response.status && response.types){
            await useType.fillTypes(response.types)
        }
    } )
})


</script>

<style scoped lang="scss">
main{
    height: 100vh;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: auto;
}

#sidebarcontent{
    position: sticky;
    top:0;
    bottom:0;
}
</style>
