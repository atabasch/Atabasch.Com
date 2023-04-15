import {Taxonomy} from "~/server/db/models";
import {Op} from "sequelize";

export default async (idOrSlug=false, options={}) => {

    options.limit       = Number(options.limit || 10)
    options.page        = Number(options.page || 1)
    options.offset      = Number(options.offset || 0)
    options.offset      = options.offset + ((options.limit * options.page) - options.limit)
    options.order       = options.orderBy || 'taxId'
    options.sort        = options.sort || 'ASC'

    options.columns     = options.columns || null
    if(options.columns){
        options.columns = options.columns.split(',')
    }


    let findAllOptions = {
        where: {
            [Op.or]: {
                taxId: !idOrSlug? false : { [Op.in]:idOrSlug.split(',') },
                taxSlug: !idOrSlug? false : { [Op.in]:idOrSlug.split(',') },
            },
            taxStatus: true
        },
        raw: false,
        limit: options.limit,
        offset: options.offset,
        attributes: {
            include: options.columns
        },
        order: [
            [ options.order, options.sort ]
        ]
    }

    let items = await Taxonomy.findAll(findAllOptions)
    return items
}
