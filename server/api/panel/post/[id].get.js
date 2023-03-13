import {Post} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let post = await Post.findByPk(id, {
        include: [
            {association:'type',
                include: {
                    association: 'fields'
                }
            },
            {association: 'extra', attributes: ['extraId', 'extraName', 'extraValue']},
            {association:'user', attributes: ['userUsername', 'userDisplayName']},
            {association:'terms', attributes: ['termId', 'termTitle', 'termSlug']},
        ]
    })
    if(!post){
        return {status:false, message: 'İçerik bulunamadı'}
    }else{

        async function getExtra(extra){
            let promise = new Promise((r)=>{
                return r(extra.extraValue)
            })
            return await promise
        }

        let extras = {}
        if(post.extra){
            await post.extra.forEach(async (item) => {
                extras[item.extraName] = await getExtra(item)
            })
        }


        return {status:true, post: {...post.get(), extra:extras}, message:''}
    }
})
