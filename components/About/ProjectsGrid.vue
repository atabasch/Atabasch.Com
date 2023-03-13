<template>
    <ColoredTitle :title="'Yazılım Projeleri'" :size="3" />
    <div class="row g-3">
        <div class="col-12 col-sm-6 col-lg-4" v-for="(n,i) in 3">
            <ProjectItem/>
        </div>
    </div>
</template>

<script setup>
import ProjectItem from "../ProjectItem";
import ColoredTitle from "../global/ColoredTitle";
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
