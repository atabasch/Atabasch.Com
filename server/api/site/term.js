import {Term} from "../../db/models"
import {defineEventHandler, getQuery} from "h3";
import {Op} from "sequelize";

export default defineEventHandler(async (event) => {
    let {name, id, slug, term, title} = await getQuery(event)

    let idOrSlug = id || slug || name || term || title

    let result = await Term.findOne({
        where: {
            [Op.or]: {
                termId: idOrSlug,
                termSlug: idOrSlug,
            }
        }
    })

    return !result ? {status:false, message:"Terim bulunamadı", term:null} : {status:true, term:result.get()}
})
