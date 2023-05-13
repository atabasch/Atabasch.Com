<template>
    <h3 class="coloredTitle mb-3">Mesleki <span>Beceriler</span></h3>
    <div class="aboutSkills border border-dark bg-dark-blue py-2 px-3">

        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4">

            <div class="skillItem col" v-for="(skill, key) in skills" :key="key">
                <span class="skillIcon"><i :class="useGetPostExtra(skill.extra, 'icon') + ' text-white'"></i></span>
                <h5 class="text-light-blue">{{ skill.postTitle }}</h5>
                <p>{{ skill.postDescription }}</p>

            </div>

        </div>
    </div>
</template>

<script setup>
import {useGetPostExtra} from "../../composables/useGetDatas";
const {skills} = defineProps(['skills']);
</script>

<style scoped>

.aboutSkills{

}
.aboutSkills .skillIcon{
    font-size: 46px;
}

.skillItem{
    text-align: center;
}
.skillItem:not(:last-child){
    border-right: 1px solid #222F43
}

@media screen and (max-width: 991px) {
    .skillItem{ border: none !important }
}
</style>
