<template>
    <h2 class="text-light-blue">Projeler</h2><hr>
    <div class="row g-3">

        <div class="col-12 col-sm-6 col-lg-4">
            <ProjectItem/>
        </div>


        <div class="col-12 col-sm-6 col-lg-4">
            <div class="box-dark-blue p-3 projectItem h-100">
                <h4><i class="bi bi-github"></i> <a href="" class="text-decoration-none text-white">Emeyz, Hayat Rehberi</a></h4><hr>
                <p>Ne, nedir ve nasıl yapılır temalı bilgi paylaşımları yapılabilecek bir blog sistemi.</p>
                <div class="d-flex justify-content-end flex-wrap">
                    <span href="" class="badge text-bg-primary m-1 p-1">Nuxt + Vue</span>
                    <span href="" class="badge text-bg-warning m-1 p-1">JavaScript</span>
                    <span href="" class="badge text-bg-danger m-1 p-1">Sequelize</span>
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-4">
            <div class="box-dark-blue p-3 projectItem h-100">
                <h4><i class="bi bi-github"></i> <a href="" class="text-decoration-none text-white">Oonio</a></h4><hr>
                <p>Bir reklamcılık firması olan oonio için wordpress'e giydirmiş olduğum portfolio teması</p>
                <div class="d-flex justify-content-end flex-wrap">
                    <span href="" class="badge text-bg-dark m-1 p-1">WordPress</span>
                    <span href="" class="badge text-bg-primary m-1 p-1">PHP</span>
                    <span href="" class="badge text-bg-warning m-1 p-1">JavaScript</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ProjectItem from "../ProjectItem";
</script>

<style scoped>

.projectItem h4{
    font-size: 24px;
    line-height: 30px;
    height: 30px;
    overflow: hidden;
}
.projectItem p{
    font-size: 16px;
    line-height: 26px;
    height: 78px;
    overflow: hidden;
}
</style>
