<template>
    <div class="row">
        <Breadcrumb :title="post.postTitle" :items="[{title:'Referanslar', to:'/referanslar'}]"/>


        <div class="col-12">
            <article class="postSingle">
                <header class="postSingleHeader">
                    <figure class="text-center postSingleCover" v-if="post.extra.project_image || post.postCover">
                        <img :src="post.extra.project_image || post.postCover" :alt="post.postTitle" class="w-full h-auto rounded img-fluid"/>
                    </figure>
                </header>





                <section class=" row pt-5">



                    <div class="col-12 col-lg-8 postSingleContent">
                        <h2 class="fs-3 text-light-white mb-4 fw-bold">Proje Detayları</h2>
                        <div v-html="post.postContent"></div>

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
                                              :to="$getUrl.term(item.taxonomy.slug, item.slug)">{{ item.title }}</NuxtLink>

                                </p>
                            </div>

                            <div><hr>
                                <h6 class="mb-1 text-white">Teknolojiler</h6>
                                <p class="mb-1">
                                    <NuxtLink v-for="(item, index) in post.taxonomies.teknoloji"
                                        :key="index"
                                              class="badge bg-dark-subtle border border-dark-subtle text-dark-emphasis text-decoration-none p-2 px-2 m-1 ms-0 rounded-0"
                                              :to="$getUrl.term(item.taxonomy.slug, item.slug)">{{ item.title }}</NuxtLink>

                                </p>
                            </div>

                            <div v-if="post.extra.client || post.extra.is_the_project_mine"><hr>
                                <h6 class="mb-1 text-white">Müşteri</h6>
                                <p class="mb-1">{{ !post.extra.is_the_project_mine? post.extra.client : 'Bana Ait' }}</p>
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
import {onMounted, ref, toRef} from "vue";
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


onMounted(() => {
    useGetPosts({
        type: 'reference',
        limit: 4,
    }).then(resp => {
        if (resp.status && resp.posts) {
            references.value = resp.posts;
        }
    })
})

</script>


<style>

</style>
