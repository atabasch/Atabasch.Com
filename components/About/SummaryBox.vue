<template>
    <div>
        <div class="row g-4" v-if="post.postId">
            <div class="col col-sm-6">
                <div class="aboutMeBox h-100 d-flex flex-column justify-content-end">
<!--                    <span class="personHello">Herkese Merhaba!</span>-->
<!--                    <h1 class="personName">Ben <span class="author_name text-info">Furkan</span></h1>-->
<!--                    <p class="personInfo">91 doğumlu bir programcıyım ve tam 12 senedir bu alanda çalışıyorum!-->
<!--                        Tam bir full stack web geliştiriciyim ve birçok programlama dilini kullanıyorum. Özellikle PHP, JavaScript ve SQL konusunda oldukça uzmanım.-->
<!--                        Hayallerinizdeki web sayfasını hayata geçirmek için çalışmayı seviyorum</p>-->
                    <div v-html="post.postContent" class="mb-5"></div>
<!--                    <NuxtLink to="#" class="personButton btn btn-outline-info text-info">Daha Fazla Bilgi</NuxtLink>-->

                </div>
            </div>
            <div class="col col-sm-6 text-end text-md-center">
                <img :src="post.postCover" alt="Furkan Atabaş" class="img-fluid" />
            </div>
        </div>
    </div>
</template>

<script setup>
const {post} = defineProps({
    post: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style scoped>
.aboutMeBox{}
.personHello{
    margin-top:10px;
    font-size: 18px;
}
.personName{
    margin-top:10px;
    font-size: 61px;
    color: white !important;
}
.personInfo{
    margin-top:10px;
    font-size: 19px;
    line-height: 32px;
}
.personButton{
    margin-top:10px;
    margin-bottom: 80px;
    padding: 15px 5px;
}
.personButton:hover{
    color: white !important;
}

</style>
