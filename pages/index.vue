<template>
<div>

    <AboutSummaryBox :post="data.about"/>
    <div style="margin-top: -50px">
        <AboutSkillsGrid :skills="data.skills" />
    </div>
    <!-- KULLANILAN TEKNOLOJİLER -->
    <div class="my-5">
        <AboutTechnologiesGrid :items="data.technologies" rtl />
    </div>

    <div>
        <AboutLanguagesGrid :items="data.languages" />
    </div>

    <div>
        <ProjectsGrid :items="data.projects" />
    </div>


    <div class="py-5">
        <ColoredTitle :title="'Portfolio'" :size="3"  :more="{label: 'Tümünü Görüntüle', path: '/referanslar'}" />
        <div class="row g-4">
            <div class="col-12 col-sm-6 col-lg-4" v-for="(item, key) in data.references" :key="key">
                <PortfolioItem :item="item"/>
            </div>
        </div>
    </div>




    <div class="py-5">
        <ColoredTitle :title="'Blog Yazıları'" :size="3" :more="{label: 'Tümünü Görüntüle', path: '/blog'}" />
        <div class="row">
            <div class="col-12 col-lg-7 col-xl-8">
                <template v-if="data.posts" v-for="(post, key) in data.posts" :key="key">
                    <BlogListItemVertical v-if="key<1" :item="post" />
                    <BlogListItemHorizontal v-else :item="post" />
                </template>
            </div><!-- .coll-8 -->


            <div class="col">
                <BlogSidebar />
            </div>
        </div>
    </div>

</div>
</template>

<script setup>
import AboutSkillsGrid from "../components/About/SkillsGrid"
import AboutTechnologiesGrid from "../components/About/TechnologiesGrid"
import AboutLanguagesGrid from "../components/About/LanguagesGrid"
import ProjectsGrid from "../components/About/ProjectsGrid"
import {reactive, ref} from "vue";
import ColoredTitle from "../components/global/ColoredTitle";




const data = reactive({
    about: [],
    skills: [],
    technologies: [],
    languages: [],
    projects: [],
    references: [],
    posts: [],
    categories: [],
    top_views: [],

})


useAsyncData(function(){
    $fetch('/api/site/home').then(async (response) => {
        data.about = response.about
        data.skills = response.skills
        data.technologies = response.technologies
        data.languages = response.languages
        data.projects = response.projects
        data.references = response.references
        data.posts = response.posts
        data.top_views = response.top_views
        data.categories = response.categories
    })
})




</script>

<style scoped>
</style>
