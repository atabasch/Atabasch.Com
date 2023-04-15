import {Taxonomy} from "~/server/db/models";
import {Op} from "sequelize";

export default async (idOrSlug=false, options={}) => {

    // Terms için seçenekler
    options.limit       = Number(options.limit || 10)
    options.page        = Number(options.page || 1)
    options.offset      = Number(options.offset || 0)
    options.offset      = options.offset + ((options.limit * options.page) - options.limit)
    options.order       = options.orderBy || 'termId'
    options.sort        = options.sort || 'ASC'

    options.terms       = options.terms || false
    options.columns     = options.columns || null
    if(options.columns){
        options.columns = options.columns.split(',')
    }

    let findAllOptions = {
            where: {
                [Op.or]: {
                    taxId: idOrSlug,
                    taxSlug: idOrSlug,
                },
                taxStatus: true
            },
            raw: false,

            attributes: {
                include: options.columns,
                exclude: [

                ]
            },
            include: [

            ]
    }

    if(options.terms){
        findAllOptions.include.push({
            association:  'terms',
            limit: options.limit,
            offset: options.offset,
            order: [ [ options.order, options.sort ] ],
            attributes: ['termId', 'termTitle', 'termSlug', 'termDescription', 'termParent', 'termOrder']
        })
    }

    let items = await Taxonomy.findOne(findAllOptions)

    return items
}
