<template>
    <div class="row">
        <Breadcrumb :title="post.postTitle" :items="[{title:'Referanslar', to:'/referanslar'}]"/>


        <div class="col-12">
            <article class="postSingle">
                <header class="postSingleHeader">

                    <div id="referenceCarrousel" class="carousel slide " data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div :class="'carousel-item ' + (key===0 && 'active' || '') "  v-for="(image, key) in getImagesForCarousel" :key="'swiper-item-'+key+1" data-bs-interval="4000">
                                <NuxtLink :href="image" rel="noreferrer" target="_blank" class="ratio ratio-21x9"  data-pswp-width="1600"  data-pswp-height="900">
                                    <img :src="image" :alt="post.postTitle" class="object-fit-cover" loading="lazy"/>
                                </NuxtLink>
                            </div>
                        </div>

                        <button class="carousel-control-prev" type="button" data-bs-target="#referenceCarrousel" data-bs-slide="prev">
                            <span class="bi bi-chevron-left fs-1" aria-hidden="true"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#referenceCarrousel" data-bs-slide="next">
                            <span class="bi bi-chevron-right fs-1" aria-hidden="true"></span>
                        </button>
                    </div><!-- .carousel slider -->


                </header>





                <section class=" row pt-5">



                    <div class="col-12 col-lg-8 postSingleContent">
                        <h2 class="fs-3 text-light-white mb-4 fw-bold">Proje Detayları</h2>
                        <div v-html="post.postContent"></div>

                        <hr class="my-5"/>


                        <footer class="postSingleFooter">
                            <p>
                                <span v-for="(keyword, index) in post.postKeywords.split(',')" :key="index">
                                    <NuxtLink class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none fw-meidum px-2 py-2 mx-1" :to="`/keyword/${keyword}`">{{ keyword }}</NuxtLink>
                                </span>
                            </p>
                        </footer>
                    </div>





                    <div class="col-12 col-lg-4">
                        <div class="box-dark-blue p-3">
                            <ColoredTitle title="Proje Bilgileri" :size="4" borderless/>

                            <div><hr>
                                <h6 class="mb-1 text-white">İş Alanı</h6>
                                <p class="mb-1">
                                    <NuxtLink v-for="(item, index) in post.taxonomies.branch"
                                              :key="index"
                                              class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none p-2 px-2 m-1 ms-0 rounded-0"
                                              :to="$getUrl.branch('branch', item.slug)">{{ item.title }}</NuxtLink>

                                </p>
                            </div>

                            <div><hr>
                                <h6 class="mb-1 text-white">Teknolojiler</h6>
                                <p class="mb-1">
                                    <NuxtLink v-for="(item, index) in post.taxonomies.teknoloji"
                                        :key="index"
                                              class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none p-2 px-2 m-1 ms-0 rounded-0"
                                              :to="$getUrl.post(item.slug)">{{ item.title }}</NuxtLink>

                                </p>
                            </div>

                            <div v-if="post.extra.client || post.extra.is_the_project_mine"><hr>
                                <h6 class="mb-1 text-white">Müşteri</h6>
                                <p class="mb-1" v-html='(!post.extra.is_the_project_mine? post.extra.client : `<span class="markedSpanForMyProject mt-2" style="position: static;">Atabasch</span>`)'></p>
                            </div>

                            <div v-if="post.extra.url"><hr>
                                <h6 class="mb-1 text-white">Bağlantı</h6>
                                <p class="mb-1"><a :href="post.extra.url" target="_blank" rel="nofollow" class="text-decoration-none" >{{ getCleanUrl(post.extra.url).substr(0,26) }}</a> </p>
                            </div>

                            <div v-if="post.extra.year"><hr>
                                <h6 class="mb-1 text-white">Proje Yılı</h6>
                                <p class="mb-1">{{ post.extra.year }}</p>
                            </div>

                        </div>
                    </div>





                </section>

            </article>
        </div>


        <div class="col-12 mt-5">
            <ColoredTitle title="Diğer Referanslar" :size="4" />
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
                <div v-for="item in references" :key="'reference-post-'+item.postId">
                    <PortfolioItem :item="item" />
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const lightbox = ref(null)

onMounted(() => {
    if(!lightbox.value){
        lightbox.value = new PhotoSwipeLightbox({
            gallery: '#referenceCarrousel',
            children: 'a',
            pswpModule: () => import('photoswipe'),
            bgOpacity: 0.9,
            closeOnScroll: false,
            spacing: 0.5,
            loop: true,
            wheelToZoom: true,
            padding: { top: 20, bottom: 40, left: 100, right: 100 },
            escKey: true,
            arrowKeys: true,
            maxWidthToAnimate: 800
        });
        lightbox.value.init();
    }
})




import {computed, onMounted, ref, toRef} from "vue";
import {useGetPosts} from "../../../composables/useGetDatas";
import PortfolioItem from "../../PortfolioItem.vue";
import ColoredTitle from "../../global/ColoredTitle";

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const post = toRef(props, 'post');
const references = ref([]);

const getCleanUrl = (url) => {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
}

useGetPosts({
    type: 'reference',
    limit: 4,
    sort: 'random',
    not_in: post.value.postId
}).then(resp => {
    if (resp.status && resp.posts) {
        references.value = resp.posts;
    }
})



const getImagesForCarousel = computed(() => {

    let images = []
    if(post.value.extra.project_image || post.value.postCover){
        images.push(post.value.extra.project_image || post.value.postCover)
    }
    if(post.value.extra.project_images){
        images = [...images, ...(post.value.extra.project_images.split(',') || [])]
    }
    return images
})




</script>


<style>

</style>
