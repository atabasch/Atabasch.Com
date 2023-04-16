import {Post, PostExtra} from "~/server/db/models";
import {uploadImage} from "~/server/lib/image";
import {objectToJson} from "@/helpers/helpers"

export default defineEventHandler(async (event) => {
    let  {post: postData} = await readBody(event)

    let post = await Post.findByPk(postData.postId)
    if(!post){
        return {status: false, message: 'İçerik Bulunamadı'}
    }else{

        if(postData.postCover && postData.changedCover){
            let imageLink = await uploadImage(postData.postCover);
            if(imageLink){
                postData.postCover = imageLink
            }
        }


        let updatedPost = await post.update(postData)


        if(!updatedPost){
            return {status: false, message: 'İçerik Güncellenemedi'}
        }else{
            if(postData.terms){
                await updatedPost.removeTerms(postData.terms)
                await updatedPost.setTerms(postData.terms)
            }

            if(postData.extra){
                await Object.entries(postData.extra).forEach(async (item) => {
                    await PostExtra.update({extraValue: objectToJson(item[1])}, {
                        where: {
                            postId: updatedPost.postId,
                            extraName: item[0]
                        }
                    })
                })
            }

            // todo: eğer resim seçilmiş ise kapak fotoğrafı değiştirilecek
            return {status: true, post:updatedPost, message: 'İçerik Güncellendi'}
        }
    }
})
