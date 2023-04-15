import {Navigation} from "~/server/db/models";
import {Op} from "sequelize";

export default async (menuIdOrSlug=false, options={}) => {


    options.limit       = Number(options.limit || 10)
    options.page        = Number(options.page || 1)
    options.offset      = Number(options.offset || 0)
    options.offset      = options.offset + ((options.limit * options.page) - options.limit)
    options.order       = options.orderBy || 'navigationId'
    options.sort        = options.sort || 'ASC'


    options.columns     = options.columns || null
    if(options.columns){
        options.columns = options.columns.split(',')
    }

    let menu = await Navigation.findOne({ where: {
            [Op.or]: {
                navigationId: menuIdOrSlug,
                navigationSlug: menuIdOrSlug
            }
        } })


    let findOptions = {
        where: {
            [Op.or] : {
                navigationParent: menu.navigationId,
                navigationSlug: menu.navigationId
            },
            navigationType: 'item'
        },
        raw: false,
        attributes: {
            include: options.columns
        },
        limit: options.limit,
        offset: options.offset,
        order: [ [ options.order, options.sort ] ]
    }



    let items = await Navigation.findAll(findOptions)

    return {
        ...menu.get(),
        items: items
    }
}
