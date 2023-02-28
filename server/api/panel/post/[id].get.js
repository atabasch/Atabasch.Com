import {Post} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let post = await Post.findByPk(id, {
        include: [
            {association:'user', attributes: ['userUsername', 'userDisplayName']},
            {association:'terms', attributes: ['termId', 'termTitle', 'termSlug']}
        ]
    })
    if(!post){
        return {status:false, message: 'İçerik bulunamadı'}
    }else{
        return {status:true, post, message:''}
    }
})
