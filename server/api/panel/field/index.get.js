import {CustomField} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    const {type} = await getQuery(event)

    let whereQuery = null
    if(type){
        whereQuery = {
            postTypeId: type
        }
    }
    const fields = await CustomField.findAll({
        include: [
            {association:'postType', attributes: ['postTypeId', 'postTypeTitle']}
        ],
        order: [
            [ 'postTypeId', 'ASC' ],
            [ 'fieldOrder', 'ASC' ]
        ],
        where: whereQuery
    })


    return {status:true, fields}
})
