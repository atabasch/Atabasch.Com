<template>
    <div class="row">

        <div class="col-9">
            <div class="mb-2">
                <label for="" class="form-label">Başlık</label>
                <input type="text" class="form-control" v-model="post.postTitle" />
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Açıklama</label>
                <textarea rows="3" class="form-control" v-model="post.postDescription"></textarea>
            </div>

            <div class="mb-2">
                <label for="" class="form-label">Anahtar Kelimeler</label>
                <input type="text" class="form-control" v-model="post.postKeywords">
            </div>

            <div class="mb-2">
                <label for="" class="form-label">İçerik</label>
                <client-only>
                    <Editor
                        v-model="post.postContent"
                        api-key="zg5qqvkbcoe4zoxffbj01vv7p0k9ngm1bhqros79xtpmt3vb"
                        :plugins="getPlugins"
                        toolbar="undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat"
                        :inline="false"
                        output-format="html"
                        :init="{height: '650px'}"
                    />
                </client-only>
            </div>

            <panel-form-CustomFieldItem :fields="type.fields" :items="customFields"  />



        </div> <!-- .col-9 -->

        <div class="col-3">
            <div class="mb-2">
                <label for="" class="form-label">Kapak Fotoğrafı</label>
                <div class="coverPlaceholderArea ratio ratio-4x3 border" @click="$refs.refInputCover.click()">
                    <div v-if="!getCover"><strong>Tıkla & Seç</strong></div>
                    <img :src="getCover" class="img-fluid" v-if="getCover" />
                </div>
                <input type="file" class="form-control d-none" ref="refInputCover" @change="changeCover($event)">
            </div>

            <div class="mb-2 border-top py-2">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" v-model="post.postAllowComment" id="allowComment">
                    <label class="form-check-label" for="allowComment">Yorumlara izin ver</label>
                </div>
            </div>


            <div class="mb-2 border-top">
                <label for="" class="form-label">Gönderi Durumu</label>
                <select class="form-select" v-model="post.postStatus">
                    <option v-for="(v, i) in $postStatuses" :key="i"  :value="v.value">{{ v.label }}</option>
                </select>
            </div>



            <div class="accordion  accordion-flush border-top pt-2" id="postTermsAccordion" v-if="getTaxonomies">
                <div class="accordion-item" v-for="(taxonomy, index) in getTaxonomies" :key="index">
                    <h2 class="accordion-header" :id="'heading-'+index">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-'+index" aria-expanded="true" :aria-controls="'#collapse-'+index">{{ taxonomy.taxTitle }}</button>
                    </h2>
                    <div :id="'collapse-'+index" class="accordion-collapse collapse" :class="{show: index==0}" :aria-labelledby="'heading-'+index" data-bs-parent="#postTermsAccordion">
                        <div class="accordion-body p-0">
                            <div class="checkboxList">
                                <div class="form-check" v-for="(term, index) in taxonomy.terms" :key="index">
                                    <label class="form-check-label" :for="'term-'+term.termId">
                                        <input class="form-check-input" type="checkbox" v-model="checkedTerms" :value="`${term.termId}`" :id="'term-'+term.termId">
                                        <span>{{ term.termTitle }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div><!-- col-3 -->


        <div class="col-12 text-end border-top py-3 mt-3">
            <button v-if="!post.postId" class="btn btn-primary" @click="sendToCreate()">Oluştur</button>
            <button v-if="post.postId" class="btn btn-success" @click="sendToUpdate()">Güncelle</button>
        </div><!-- col-12 -->

    </div> <!-- .row -->
</template>

<script setup>
import Editor from "@tinymce/tinymce-vue"
import {ref, toRef, defineProps, defineEmits, computed, onMounted} from "vue";
import usePost from "../../../composables/usePost";


const emits = defineEmits(['created', 'updated'])
const props = defineProps({
    type: {type:String, default:null},
    taxonomies: {type:Array, default:[]},
    post: { type: Object,
        default: ()=>({
            postTitle: '',
            postSlug: '',
            postDescription: '',
            postKeywords: '',
            postContent: '',
            postCover: null,
            terms: [],
            postStatus: 'publish',
            postTypeId: null,
            postParent: 0,
            postAuthor : 1, // todo: Author ID Giriş yapmış kullanıcı id numarası
            postAllowComment: true,
            postViews: 0,
            postPublishedAt: Date.now()
        })
    }, //post
})


const post          = toRef(props, 'post')
const type          = toRef(props, 'type')
const checkedTerms  = ref([])
const changedCover  = ref(false)
const taxonomies    = toRef(props, 'taxonomies')
const customFields  = ref({})

// POST KAYIT İŞLEMİ
const sendToCreate = ()=>{

    const postData = {
        ...post.value,
        extra: customFields.value,
        terms: checkedTerms.value,
        postTypeId: type.value.postTypeId,
        changedCover: changedCover.value
    }

    usePost().create(toRaw(postData)).then( response => {
        if(response.status && response.post){
            emits('created', response.post)
        }else{

        }
    } ).catch(err => {
        console.log("err ", err)
    })

}

const sendToUpdate = ()=>{
    const postData = {
        ...post.value,
        extra: customFields.value,
        terms: checkedTerms.value,
        changedCover: changedCover.value
    }
    usePost().update(postData).then( response => {
        if(response.status && response.post){
            emits('updated', response.post)
        }else{

        }
    } ).catch(err => {
        console.log("err ", err)
    })

}

// KAPAK FOTOĞRAFI DEĞİŞTİRMEK
const changeCover = (event) => {
    if(event.target.files.length){
        let coverFile = event.target.files[0]
        let reader = new FileReader();
        reader.onloadend = (e) => {
            post.value.postCover = reader.result
            changedCover.value = true
        }
        reader.readAsDataURL(coverFile)
    }
}


// COMPUTEDLER
const getTaxonomies = computed(() => {
    return taxonomies.value
})

const getCover = computed(() => post.value.postCover)

const getPlugins = computed(() => {
    return 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount '
})

onMounted(() => {
    checkedTerms.value = post.value.terms.map(i => i.termId)

    customFields.value = type.value.fields.reduce((acc, item) => {
        acc[item.fieldName] = item.fieldDefaultValue
        if(item.fieldType==='checkbox'){
            acc[item.fieldName] = [item.fieldDefaultValue]
        }
        return acc
    }, {})
    customFields.value = {...customFields.value, ...post.value.extra}

})

</script>


<style scoped lang="scss">
.coverPlaceholderArea{

    overflow: hidden;
    cursor: pointer;

    & > div{
        background-color: rgba(125,125,125,0.1);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        strong{
            font-size: 20px;
            text-shadow: 1px 1px 0px white;
            color: rgba(0,0,0,0.3);
        }

        &:hover{
            background-color: rgba(125,125,125,0.05);
        }

        &:hover strong{
            color: rgba(0,0,0,0.6);
        }
    }
}


.checkboxList{
    background-color: rgba(255,255,255,0.75);
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 450px;
    padding: 2px 10px;
    overflow-y: auto;

    .form-check{
        border-bottom: 1px solid #eee;

        &:hover{
            background-color: #F9F9F9;
        }

        & > label{
            display: flex;
            padding: 5px 0px;
            gap: 10px;
            cursor: pointer;
        }

    }

}
</style>
