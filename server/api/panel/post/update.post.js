import {Post} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let  {post: postData} = await readBody(event)

    let post = await Post.findByPk(postData.postId)
    if(!post){
        return {status: false, message: 'İçerik Bulunamadı'}
    }else{
        let updatedData = {...postData}
        delete updatedData.postId

        let updatedPost = await post.update(updatedData)
        if(!updatedPost){
            return {status: false, message: 'İçerik Güncellenemedi'}
        }else{
            if(postData.terms){
                await updatedPost.removeTerms(postData.terms)
                await updatedPost.setTerms(postData.terms)
            }
            // todo: eğer resim seçilmiş ise kapak fotoğrafı değiştirilecek
            return {status: true, post:updatedPost, message: 'İçerik Güncellendi'}
        }
    }
})
