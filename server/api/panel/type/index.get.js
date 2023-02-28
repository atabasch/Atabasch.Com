import {PostType} from "~/server/db/models";
export default defineEventHandler( async (event) => {
    try {
        const types = await PostType.findAll({
            order: [
                ['postTypeId', 'DESC']
            ]
        })
        return { status: true, types }
    }catch (err){
        return { status: false }
    }
} )
