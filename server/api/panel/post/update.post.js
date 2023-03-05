import {Post} from "~/server/db/models";
import {getBufferFromBase64, uploadToFirestore} from "~/server/lib/image";
export default defineEventHandler(async (event) => {
    let  {post: postData} = await readBody(event)

    let post = await Post.findByPk(postData.postId)
    if(!post){
        return {status: false, message: 'İçerik Bulunamadı'}
    }else{

        if(postData.postCover && postData.changedCover){
            await getBufferFromBase64(postData.postCover).then( async ({file, ext}) => {
                await uploadToFirestore({file,ext}).then( result => {
                    postData.postCover = result.mediaLink
                } )
            } )
        }


        let updatedPost = await post.update(postData)
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
