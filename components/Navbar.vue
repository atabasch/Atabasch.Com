<template>
    <nav class="navbar navbar-expand-lg fixed-top border-bottom border-dark bg-dark-blue">
        <div class="container py-2">
            <NuxtLink class="navbar-brand text-primary coloredTitle" to="/"><span class="bi bi-laptop"></span> Atabasch</NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerNavbarContent" aria-controls="headerNavbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="headerNavbarContent">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item mx-2" v-for="(item, index) in (storeSite().getNavigation('header-menu')?.items || [])">
                        <NuxtLink :id="item.extraId || 'header-nav-'+item.navigationSlug"
                                  :class="'nav-link '+(item.extraClass || '')"
                                  :target="item.extraTarget || '_self'"
                                  :rel="item.extraRel || ''"
                                  :to="item.navigationTarget"
                                  v-html="(item.extraBefore || '')+(item.navigationName)+(item.extraAfter || '')"
                        ></NuxtLink>
                    </li>
                </ul>
                <ul class="navbar-nav" id="navbarUlRight">
<!--                    <li class="nav-item">-->
<!--                        <input type="search" class="form-control" placeholder="Aranacak bir şeyler yazın.">-->
<!--                    </li>-->
                    <li class="nav-item text-end justify-content-end" id="navSearchContainer">
                        <div class="input-group m-0 float-end">
                            <input type="search" v-model="searchedData" class="form-control form-control-sm" :class="{ 'active':searchedData.length > 2 }" @keyup.enter="searchToPosts()" placeholder="Aranacak bir şeyler yazın." aria-describedby="button-addon2">
                            <button class="btn btn-outline-secondary bi bi-search border-0" type="button" id="button-addon2" @click="searchToPosts()"></button>
                        </div>
<!--                        <a href="" class="nav-link"><i class="bi bi-search"></i></a>-->
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {storeSite} from "~/stores/site";
import Input from "./panel/form/CustomFieldItems/input";
import {ref} from "vue";
import {useRouter, useRuntimeConfig} from "nuxt/app";
const {public:config} = useRuntimeConfig()

const searchedData = ref(useRoute().query.s || '')
const searchToPosts = () => {
    if (searchedData.value.length > 2){
        useRouter().push({path: config.searchPageSlug, query: {s: searchedData.value }})
    }
}
</script>
