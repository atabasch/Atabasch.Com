<template>
    <div class="row mb-5">
        <div class="col-12 col-md-5">
            <NuxtLink :to="'/'">
                <figure class="img-filter-dark-blue">
                    <img :src="'https://picsum.photos/id/5'+item.postId+'2/450/300'" class="img-fluid" />
                    <figcaption></figcaption>
                </figure>
            </NuxtLink>
        </div>
        <div class="col p-0">
            <div>
                <span class="fs-6 fw-"><i class="bi bi-clock"></i> 3 dakika'da oku</span>
            </div>
            <h3 class="fs-4 my-2"><a href="" class="text-decoration-none">Helpful Tips for Working from Home as a Freelancer</a></h3>
            <p>Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far</p>
            <div>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket1</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket2</a>
                <a href="" class="link-secondary me-2 text-decoration-none">#etiket3</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import {toRef} from "vue";

const props = defineProps({
    item: {
        type: Object
    }
})
const item = toRef(props, 'item')
</script>

<style scoped>

</style>
