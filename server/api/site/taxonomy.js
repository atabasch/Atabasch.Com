import {Taxonomy} from "../../db/models"
import {defineEventHandler, getQuery} from "h3";
import {Op} from "sequelize";

export default defineEventHandler(async (event) => {
    let {name, id, slug, tax, taxonomy} = await getQuery(event)

    let idOrSlug = id || slug || name || taxonomy || tax

    let result = await Taxonomy.findOne({
        where: {
            [Op.or]: {
                taxId: idOrSlug,
                taxSlug: idOrSlug,
            },
            taxStatus: 1
        }
    })

    return !result ? {status:false, message:"Taksonomi bulunamadı", taxonomy:result} : {status:true, taxonomy:result}
})
