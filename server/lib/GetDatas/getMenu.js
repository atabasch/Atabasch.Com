import {Navigation} from "~/server/db/models";
import {Op} from "sequelize";

export default async (idOrSlug=false, options={}) => {


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


    let findOptions = {
        where: {
            [Op.or] : {
                navigationId: idOrSlug,
                navigationSlug: idOrSlug
            },
            navigationType: 'menu'
        },
        raw: false,
        attributes: {
            include: options.columns
        },
        limit: options.limit,
        offset: options.offset,
        order: [ [ options.order, options.sort ] ]
    }



    let items = [];
    if(!idOrSlug){
        items = await Navigation.findAll(findOptions)
    }else{
        items = await Navigation.findOne(findOptions)
    }

    return items
}
