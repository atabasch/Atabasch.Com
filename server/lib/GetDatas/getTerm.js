import {Term} from "~/server/db/models";
import {Op} from "sequelize";

export default async (idOrSlug=false, options={}) => {

    options.columns     = options.columns || null
    if(options.columns){
        options.columns = options.columns.split(',')
    }


    let findAllOptions = {
        where: {
            [Op.or]: {
                termId: idOrSlug,
                termSlug: idOrSlug,
            }
        },
        raw: false,
        attributes: {
            include: options.columns
        },
    }

    let items = await Term.findOne(findAllOptions)
    return items
}
