<template>

        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">Atabasch</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item"><NuxtLink to="/aswpanel" class="nav-link" active-class="active"> Başlangıç</NuxtLink></li>

            <li v-if="storeType().getTypes.length"><hr/></li>
            <li class="nav-item" v-for="(type, ind) in storeType().getTypes">
                <NuxtLink :to="$getUrl.panel('/posts/type/'+type.postTypeId)" class="nav-link" active-class="active"> {{ type.postTypeTitle }}</NuxtLink>
            </li>

            <li v-if="storeTaxonomy().getTaxonomies.length"><hr/></li>
            <li class="nav-item" v-for="(tax, ind) in storeTaxonomy().getTaxonomies">
                <NuxtLink :to="'/aswpanel/taxonomies/'+tax.taxSlug" class="nav-link" active-class="active"> {{ tax.taxTitle }}</NuxtLink>
            </li>

            <li><hr/></li>

            <li class="nav-item"><NuxtLink to="/aswpanel/settings" class="nav-link" active-class="active">Ayarlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/types" class="nav-link" active-class="active"> İçerik Tipleri</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/fields" class="nav-link" active-class="active"> Özel Alanlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/taxonomies" class="nav-link" active-class="active"> Taksonomiler</NuxtLink></li>

            <li><hr/></li>

            <li class="nav-item"><NuxtLink to="/aswpanel/users" class="nav-link" active-class="active"> Kullanıcılar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/comments" class="nav-link" active-class="active"> Yorumlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/contacts" class="nav-link" active-class="active"> İletişim</NuxtLink></li>

            <li><hr/></li>

            <li class="nav-item"><NuxtLink to="/" class="nav-link" active-class="active"> Siteye Dön</NuxtLink></li>

        </ul>
        <hr>
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>mdo</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div>
</template>

<script setup>
import {storeTaxonomy} from "~/stores/taxonomy";
import {storeType} from "~/stores/type";
</script>

<style scoped>
.nav a{
    color: white !important;
}
</style>
