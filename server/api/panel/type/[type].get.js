import {PostType} from "~/server/db/models";
import {Op} from "sequelize"
export default defineEventHandler( async (event) => {
    const {type: typeOrId} = await event.context.params

    if(!typeOrId){
        return {status: false, message: 'Birincil Anahtar Eksik'}
    }else{
        let postType = await PostType.findOne({
            where: {
                [Op.or]: {
                    postTypeId: typeOrId,
                    postTypeSlug: typeOrId
                }
            },
            include: [
                {association: 'posts'}
            ]
        })
        if(!postType){
            return {status: false, message: 'İçerik türü bulunamadı'}
        }else{
            return {status:true, type:postType}
        }
    }
} )
