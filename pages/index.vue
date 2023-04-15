<template>

    <AboutSummaryBox/>
    <div style="margin-top: -50px">
        <AboutSkillsGrid :skills="skills" />
    </div>
    <!-- KULLANILAN TEKNOLOJİLER -->
    <div class="my-5">
        <AboutTechnologiesGrid :items="technologies" />
    </div>
    <AboutLanguagesGrid :items="languages" />

    <div>
        <ProjectsGrid></ProjectsGrid>
    </div>


    <div class="py-5">
        <ColoredTitle :title="'Portfolio'" :size="3">
            <nav class="nav">
                <a class="nav-link active" aria-current="page" href="#">Front-end</a>
                <a class="nav-link" href="#">Back-end</a>
                <a class="nav-link" href="#">Tasarım</a>
            </nav>
        </ColoredTitle>

        <div class="row g-4">
            <div class="col-12 col-sm-6 col-lg-4" v-for="n in 6">
                <PortfolioItem :item="{id:n}"/>
            </div>
        </div>

    </div>




    <div class="py-5">
        <ColoredTitle :title="'Blog Yazıları'" :size="3" :more="{label: 'Tümünü Görüntüle', path: '/blog'}" />
        <div class="row">
            <div class="col-8">
                <BlogListItemVertical />
                <BlogListItemHorizontal v-for="n in 3" :item="{postId: n}" />
            </div><!-- .coll-8 -->


            <div class="col">
                <BlogSidebar />
            </div>
        </div>
    </div>




    <Footer />
</template>

<script setup>
import AboutSkillsGrid from "../components/About/SkillsGrid"
import AboutTechnologiesGrid from "../components/About/TechnologiesGrid"
import AboutLanguagesGrid from "../components/About/LanguagesGrid"
import ProjectsGrid from "../components/About/ProjectsGrid"
import {ref} from "vue";
import ColoredTitle from "../components/global/ColoredTitle";
import useAuth from "../composables/useAuth";
import {useGetPosts} from "../composables/useGetDatas";


const options = {
    skills: {
        type: 'skills',
        limit:4,
        columns: 'postId,postTitle,postDescription',
        orderBy: 'postId',
        sort: 'ASC'
    },
    technology: {
        type: 'technology',
        limit:10,
        columns: 'postId,postTitle,postDescription',
        orderBy: 'postId',
        sort: 'ASC'
    },
    language: {
        type: 'language',
        limit:3,
        columns: 'postId,postTitle',
        orderBy: 'postId',
        sort: 'ASC'
    }
}




const skills = ref([]);
const technologies = ref([])
const languages = ref([])
// useGetPosts(options.skills).then(({status, posts}) => {
//     if(status && posts )
//         skills.value = posts
// })
//
// useGetPosts(options.technology).then(({status, posts}) => {
//     if(status && posts ){
//         technologies.value = posts
//     }
// })
//
// useGetPosts(options.language).then(({status, posts}) => {
//     if(status && posts )
//         languages.value = posts
// })

useAsyncData(function(){
    $fetch('/api/site/home').then(async (response) => {
        skills.value = response.skills
        technologies.value = response.technologies
        languages.value = response.languages
    })
})




</script>

<style scoped>
</style>
