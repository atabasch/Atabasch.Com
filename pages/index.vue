<template>

    <AboutSummaryBox/>
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
        <ColoredTitle :title="'Portfolio'" :size="3"  :more="{label: 'Tümünü Görüntüle', path: '/blog'}">
        </ColoredTitle>

        <div class="row g-4">
            <div class="col-12 col-sm-6 col-lg-4" v-for="(item, key) in data.references" :key="key">
                <PortfolioItem :item="item"/>
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
import {reactive, ref} from "vue";
import ColoredTitle from "../components/global/ColoredTitle";




const data = reactive({
    skills: [],
    technologies: [],
    languages: [],
    projects: [],
    references: [],
    posts: [],
    categories: []

})


useAsyncData(function(){
    $fetch('/api/site/home').then(async (response) => {
        data.skills = response.skills
        data.technologies = response.technologies
        data.languages = response.languages
        data.projects = response.projects
        data.references = response.references
        data.posts = response.posts
        data.categories = response.categories
    })
})




</script>

<style scoped>
</style>
