import {Post} from "~/server/db/models"
import {getBufferFromBase64, uploadToFirestore} from "@/server/lib/image"

export default defineEventHandler(async (event) => {

    const {post: postData} = await readBody(event);
    if(postData.postCover){
        await getBufferFromBase64(postData.postCover).then( async ({file, ext}) => {
            await uploadToFirestore({file,ext}).then( result => {
                postData.postCover = result.mediaLink
            } )
        } )
    }

    let post = await Post.create({...postData})
    await post.setTerms(postData.terms)

    if(!post){
        return {status: false, message: 'İçerik oluşturulamadı. '}
    }else{
        return {status:true, post, message: 'İçerik oluşturuldu.'}
    }

})
