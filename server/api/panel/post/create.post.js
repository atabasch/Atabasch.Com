import {Post, PostExtra} from "~/server/db/models"
import {uploadImage} from "@/server/lib/image"
import {objectToJson} from "@/helpers/helpers"

export default defineEventHandler(async (event) => {

    const {post: postData} = await readBody(event);

    if(postData.postCover){
        let imageLink = await uploadImage(postData.postCover);
        if(imageLink){
            postData.postCover = imageLink
        }
    }

    let post = await Post.create({...postData})
    await post.setTerms(postData.terms)

    if(postData.extra){
       await Object.entries(postData.extra).forEach(async (item) => {
           await PostExtra.create({postId: post.postId, extraName: item[0], extraValue: objectToJson(item[1]) })
       })
    }


    if(!post){
        return {status: false, message: 'İçerik oluşturulamadı. '}
    }else{
        return {status:true, post, message: 'İçerik oluşturuldu.'}
    }

})
