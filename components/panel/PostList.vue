<template>
    <table class="table table-hovered table-bordered table-striped">
        <thead>
        <tr>
            <th width="65"></th>
            <th>Başlık</th>
<!--            <th width="210">Kategori</th>-->
            <th width="120">Yazar</th>
            <th width="100">Yayımlanma</th>
            <th width="25"></th>
            <th width="25"></th>
        </tr>
        </thead>

        <tbody>
        <template v-if="!props.items.length">
            <tr>
                <td colspan="7" class="alert alert-warning bg-warning p-4">
                    Listelenecek hiç içerik bulunamadı.
                </td>
            </tr>
        </template>
        <template v-if="props.items">
            <tr v-for="(item, index) in props.items" class="post-item">
                <td><img :src="item.postCover || '/images/camera.png'" width="65" height="65"  :alt="item.postTitle" style="object-fit: cover"/></td>
                <td>
                    <strong><NuxtLink class="text-decoration-none text-black" :to="$getUrl.panel('/posts/'+item.postId) ">{{ item.postTitle || '' }}</NuxtLink></strong><br>
                    <small><code class="bg-white p-1">/{{ item.postSlug }}</code></small>
                    <div class="mt-2 action-buttons">
                        <NuxtLink :to="$getUrl.post(item.postSlug)" target="_blank" class=" me-2 link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Görüntüle</NuxtLink>
                        <NuxtLink :to="$getUrl.panel('/posts/'+item.postId)" class=" me-2 link-primary link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Düzenle</NuxtLink>
                        <NuxtLink :to="null" v-if="item.postStatus==='trash'" @click.stop="sendToChangeStatus({item, index, status: 'publish'})" class="cursor-pointer me-2 link-success link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Yayımla</NuxtLink>
                        <NuxtLink :to="null" v-if="item.postStatus!=='trash'" @click.stop="sendToChangeStatus({item, index, status: 'trash'})" class="cursor-pointer me-2 link-danger link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Çöp'e Gönder</NuxtLink>
                        <NuxtLink :to="null" v-if="item.postStatus==='trash'" @click.stop="sendToDelete({item, index})" class="cursor-pointer me-2 link-danger link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Kalıcı Olarak Sil</NuxtLink>
                    </div>
                </td>
<!--                <td>-->
<!--                    <template v-if="item.terms">-->
<!--                        <a href="" v-for="(t, i) in item.terms" :key="i" class="btn btn-outline-primary btn-sm me-1 p-0 px-1">{{ t.termTitle }}</a>-->
<!--                    </template>-->
<!--                </td>-->
                <td><a href="" class="btn btn-outline-primary btn-sm me-1 p-0 px-1">{{ item.user.userUsername || '' }}</a></td>
                <td>
                    <span class="badge text-bg-primary fw-normal">{{ $getDateFormat(item.postCreatedAt, 'dateTimeMedium') }}</span><br/>
                    <span class="badge text-bg-warning fw-normal">{{ $getDateFormat(item.postUpdatedAt, 'dateTimeMedium') }}</span><br/>
                    <span class="badge text-bg-success fw-normal">{{ $getDateFormat(item.postPublishedAt, 'dateTimeMedium') }}</span>
                </td>
                <td><button class="btn btn-sm" :class="{ 'btn-success':item.postAllowComment, 'btn-danger':!item.postAllowComment }" @click="sendToChangeCommentStatus({item, index, status:!item.postAllowComment})"><i class="bi bi-chat-text"></i></button></td>
                <td class="statusCol">
                    <div class=" dropdown-left">
                        <button v-if="item.postStatus==='publish'" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-success btn-sm"><i class="bi bi-check-lg"></i></button>
                        <button v-if="item.postStatus==='trash'" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-danger btn-sm"><i class="bi bi-trash3"></i></button>
                        <button v-if="item.postStatus==='draft'" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-warning btn-sm"><i class="bi bi-journal-text"></i></button>
                        <button v-if="item.postStatus==='waiting'" data-bs-toggle="dropdown" aria-expanded="false" class="dropdown-toggle btn btn-dark btn-sm"><i class="bi bi-hourglass-split"></i></button>
                        <ul class="dropdown-menu" style="width: 25px">
                            <li v-for="(v, i) in statusList" :key="i">
                                <button @click="sendToChangeStatus({item, index, status: v.value})" v-if="item.postStatus!==v.value" :class="v.className"><i :class="v.icon"></i> {{ v.label }}</button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </template>

        </tbody>
    </table>
</template>

<script setup>
const props = defineProps(['items'])

const {$showToast, $showAlert} = useNuxtApp()
const statusList = [
    {value:'publish', label: 'Yayımla', className:'btn btn-primary btn-sm dropdown-item', icon:'bi bi-check-lg'},
    {value:'trash', label: "Çöp'e gönder", className:'btn btn-danger btn-sm dropdown-item', icon:'bi bi-trash3'},
    {value:'draft', label: 'Taslak', className:'btn btn-warning btn-sm dropdown-item', icon:'bi bi-journal-text'},
    {value:'waiting', label: 'Beklemeye Al', className:'btn btn-secondary btn-sm dropdown-item', icon:'bi bi-hourglass-split'},
]

// Gönderiyi çöpe at
const sendToChangeStatus = ({item, index, status}) => {
    let postData = {postId: item.postId, postStatus: status}
    usePost().update(postData).then( response => {
        if(response.status && response.post){
            props.items.splice(index, 1, {...item, ...response.post})
            $showToast(response.message || 'İçerik güncelleme başarılı oldu', 'success')
        }
    } ).catch(err => { showError('Beklenmedik bir hata oluştu') })
}

const sendToChangeCommentStatus = ({item, index, status}) => {
    let postData = {postId: item.postId, postAllowComment: status}
    usePost().update(postData).then( response => {
        if(response.status && response.post){
            props.items.splice(index, 1, {...item, ...response.post})
            $showToast(response.message || 'İçerik güncelleme başarılı oldu', 'success')
        }
    } ).catch(err => { showError('Beklenmedik bir hata oluştu') })
}


// Gönderiyi Silmek İçin Sor
const sendToDelete = ({item, index})=>{
    let title = 'İçerik Silinecek'
    let body = `<strong>${item.postTitle}</strong> başlıklı içeriği silmek üzeresiniz. Bu işlem bir daha geri alınamaz. Silmek sitediğinize emin misiniz?`
    $showAlert({title, body}, function(){
        usePost().delete(toRaw(item)).then(async (data) => {
            if(data.status){
                props.items.splice(index, 1)
                $showToast(data.message || 'İçerik başarıyla silindi.')
            }else{
                $showToast(data.message || 'İçerik silme başarsız oldu')
            }
        }).catch(err => { showError('Beklenmedik bir hata oluştu') })
    })
}



const showError = (message) => {
    $showToast(message, 'error')
}
</script>

<style scoped>
.action-buttons{
    visibility: hidden;
}
.post-item:hover .action-buttons{
    visibility: visible;
}
</style>
