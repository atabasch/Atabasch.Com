import {Term} from "~/server/db/models";
import {getTaxonomy} from "~/server/lib/GetDatas";

export default async (taxonomyIdOrSlug=false, options={}) => {

    options.limit       = Number(options.limit || 10)
    options.page        = Number(options.page || 1)
    options.offset      = Number(options.offset || 0)
    options.offset      = options.offset + ((options.limit * options.page) - options.limit)
    options.order       = options.orderBy || 'termId'
    options.sort        = options.sort || 'ASC'

    options.columns     = options.columns || null
    if(options.columns){
        options.columns = options.columns.split(',')
    }


    let taxonomy = await getTaxonomy(taxonomyIdOrSlug);

    let findAllOptions = {
        where: {
            taxId: taxonomy.get().taxId
        },
        raw: false,
        attributes: {
            include: options.columns
        },
        limit: options.limit,
        offset: options.offset,
        order: [ [ options.order, options.sort ] ]
    }

    let items = await Term.findAll(findAllOptions)


    return {
        ...taxonomy.get(),
        terms: items
    }
}
