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
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="" class="nav-link"><i class="bi bi-search"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {storeSite} from "~/stores/site";

</script>

<style scoped>

</style>
