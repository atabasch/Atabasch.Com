<template>
    <div class="row g-4">
        <div class="col col-sm-6">
            <div class="aboutMeBox h-100 d-flex flex-column justify-content-end">
                <span class="personHello">Herkese Merhaba!</span>
                <h1 class="personName">Ben <span class="author_name text-info">Furkan</span></h1>
                <p class="personInfo">91 doğumlu bir programcıyım ve tam 12 senedir bu alanda çalışıyorum!
                    Tam bir full stack web geliştiriciyim ve birçok programlama dilini kullanıyorum. Özellikle PHP, JavaScript ve SQL konusunda oldukça uzmanım.
                    Hayallerinizdeki web sayfasını hayata geçirmek için çalışmayı seviyorum</p>
                <button class="personButton btn btn-outline-info text-info">Daha Fazla Bilgi</button>
            </div>
        </div>
        <div class="col col-sm-6 text-end text-md-center">
            <img src="/images/me.png" alt="Furkan Atabaş" />
        </div>
    </div>
</template>

<script setup>
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
