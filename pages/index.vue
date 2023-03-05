<template>

    <AboutSummaryBox/>
    <div style="margin-top: -50px">
        <AboutSkillsGrid />
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

const technologies = ref([
    {title: 'HTML',         percent: 100,   text: 'Web sayfalarının iskeletini oluşturan işaretleme dili.'},
    {title: 'CSS',          percent: 75,    text: 'İnternet siteleri için makyaj malzemesi'},
    {title: 'JavaScript',   percent: 70,    text: 'Kullanıcı etkileşimi ve yeni nesil Back-end'},
    {title: 'PHP',          percent: 80,    text: 'Web için kullanılan en popüler programlama dillerinden bir tanesi'},
    {title: 'Mysql',        percent: 90,    text: 'Yazılım hizmetinin verilerinin saklandığı hafıza'},
    {title: 'WordPress',    percent: 70,    text: 'Hızlı web siteleri oluşturmak için hazır bir sistem'},
    {title: 'Nuxt & Vue',   percent: 70,    text: 'Hızlı web siteleri oluşturmak için hazır bir sistem'},
    {title: 'React Native',    percent: 70,    text: 'Hızlı web siteleri oluşturmak için hazır bir sistem'},
])

const languages = ref([
    { code:'TR', title: 'Türkçe', level: 6 },
    { code:'DE', title: 'Deutsch', level: 3 },
    { code:'EN', title: 'English', level: 1 },
])


</script>

<style scoped>
</style>
