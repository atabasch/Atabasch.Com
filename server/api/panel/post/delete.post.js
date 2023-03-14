import {Post, PostExtra} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let  {post: postData} = await readBody(event)

    let post = await Post.findByPk(postData.postId)
    if(!post){
        return {status: false, message: 'İçerik Bulunamadı'}
    }else{
        let deletedPost = await post.destroy()
        if(!deletedPost){
            return {status: false, message: 'İçerik Silinemedi'}
        }else{
            await PostExtra.destroy({
                where: {
                    postId: postData.postId
                }
            })

            // todo: Post'a ait olan kapak fotoğrafı da silinecek
            return {status: true, post:deletedPost, message: 'İçerik Silindi'}
        }
    }
})
