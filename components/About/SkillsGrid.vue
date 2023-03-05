<template>
    <h3 class="coloredTitle mb-3">Mesleki <span>Beceriler</span></h3>
    <div class="aboutSkills border border-dark bg-dark-blue py-2 px-3">

        <div class="row">
            <div class="skillItem col-md-3">
                <span class="skillIcon"><i class="bi bi-code text-white"></i></span>
                <h5 class="text-light-blue">Web Geliştirme</h5>
                <p>Sıfırdan kodlayarak (php, laravel, javascript, nodejs, sql) veya WordPress içerik yönetim sistemi ile web siteleri geliştiriyorum</p>
            </div>

            <div class="skillItem col-md-3">
                <span class="skillIcon"><i class="bi bi-window-sidebar text-white"></i></span>
                <h5 class="text-light-blue">Font-end</h5>
                <p>Web siteleri için ziyaretçilerin göreceği görsel arayüzü en yeni teknolojileri (Vue.js, React) kullanarak tasarlıyorum.</p>
            </div>

            <div class="skillItem col-md-3">
                <span class="skillIcon"><i class="bi bi-phone text-white"></i></span>
                <h5 class="text-light-blue">Mobil Uygulama</h5>
                <p>Müşteriler için her platformda çalıştırılabilen native (React Native) mobil uygulamalar geliştirebilirim.</p>
            </div>

            <div class="skillItem col-md-3">
                <span class="skillIcon"><i class="bi bi-patch-check text-white"></i></span>
                <h5 class="text-light-blue">Eğitim</h5>
                <p>Bildiğim ve öğrenmek istediğiniz bir programlama dilini (php, javascript, python, go, sql) veya tasarım kodlamasını (html, css, bootstrap) size öğretebilirim.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

.aboutSkills{

}
.aboutSkills .skillIcon{
    font-size: 46px;
}

.aboutSkills .skillItem{
    text-align: center;
}
.aboutSkills .skillItem:not(:last-child){
    border-right: 1px solid #222F43
}

</style>
