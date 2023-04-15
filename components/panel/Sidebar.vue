<template>

        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">Atabasch</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item"><NuxtLink to="/aswpanel" class="nav-link" active-class="active"><em class="bi bi-speedometer2"></em> Başlangıç</NuxtLink></li>
            <li><hr class="mt-1 mb-3"/></li>



            <template v-for="(type, index) in storeType().getTypes">

                <li class="nav-item">
                    <button class="btn btn-toggle d-inline-flex align-items-center border-0 collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-post-type-'+type.postTypeId" aria-expanded="true">
                        <em class="bi bi-chevron-right"></em>
                        {{ type.postTypeTitle}}
                    </button>

                    <div class="ps-4 collapse" :id="'collapse-post-type-'+type.postTypeId">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><NuxtLink :to="$getUrl.panel('/posts/create?type='+type.postTypeId)" class="link-body-emphasis d-inline-flex text-decoration-none" active-class="active">Yeni {{ type.postTypeTitleSingle }}</NuxtLink></li>
                            <li><NuxtLink :to="$getUrl.panel('/posts/type/'+type.postTypeId)" class="link-body-emphasis d-inline-flex text-decoration-none" active-class="active">{{ type.postTypeTitleSingle }} Listesi</NuxtLink></li>
                            <li v-for="(tax, ind) in type.taxonomies"><NuxtLink :to="'/aswpanel/taxonomies/'+tax.taxSlug" class="link-body-emphasis d-inline-flex text-decoration-none rounded" active-class="active"> {{ tax.taxTitle }}</NuxtLink></li>
                        </ul>
                    </div>

                </li>

            </template>

            <li><hr class="mt-1 mb-3"/></li>

            <li class="nav-item"><NuxtLink to="/aswpanel/settings" class="nav-link" active-class="active"><em class="bi bi-gear"></em> Ayarlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/types" class="nav-link" active-class="active"><em class="bi bi-blockquote-left"></em> İçerik Tipleri</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/fields" class="nav-link" active-class="active"><em class="bi bi-input-cursor-text"></em> Özel Alanlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/taxonomies" class="nav-link" active-class="active"><em class="bi bi-tags"></em> Taksonomiler</NuxtLink></li>

            <li><hr class="mt-1 mb-3"/></li>

            <li class="nav-item"><NuxtLink to="/aswpanel/users" class="nav-link" active-class="active"><em class="bi bi-people"></em> Kullanıcılar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/navigations" class="nav-link" active-class="active"><em class="bi bi-signpost-split"></em> Menüler</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/comments" class="nav-link" active-class="active"><em class="bi bi-chat-quote"></em> Yorumlar</NuxtLink></li>
            <li class="nav-item"><NuxtLink to="/aswpanel/contacts" class="nav-link" active-class="active"><em class="bi bi-envelope"></em> İletişim</NuxtLink></li>

            <li><hr class="mt-1 mb-3"/></li>

            <li class="nav-item"><NuxtLink to="/" class="nav-link" active-class="active"><em class="bi bi-browser-edge"></em> Siteye Dön</NuxtLink></li>

        </ul>
        <hr>
        <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                <strong>{{ useAuth().get('userUsername') }}</strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a class="dropdown-item" href="#">Profil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><NuxtLink class="dropdown-item" to="#" @click.prevent.stop="logout()">Oturumu Kapat</NuxtLink></li>
            </ul>
        </div>
</template>

<script setup>
import {storeTaxonomy} from "~/stores/taxonomy";
import {storeType} from "~/stores/type";
import useAuth from "../../composables/useAuth";

const logout = () => {
    useAuth().logout()
    useRouter().replace('/')
}
</script>

<style scoped>
.nav a,
button{
    color: rgba(255,255,255,0.7) !important;
}
.nav a:hover,
button:hover{
    color: rgba(255,255,255,1) !important;
}
</style>
