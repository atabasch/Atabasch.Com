import {Taxonomy, Term} from "@/server/db/models"
import {defineEventHandler, getQuery, readBody} from "h3";

export default defineEventHandler( async (event) => {
    let query = await getQuery(event)
    let options = {
        slug: query.name || 'category',
        orderBy: query.orderBy || 'termId',
        sort: query.sort || 'ASC',
        columns: query.columns || null,
        offset: Number(query.offset || 0),
        limit: Number(query.limit || 99),
        page: Number(query.page || 1)
    }
    if(!options.columns){
        options.columns = Object.keys(Term.getAttributes())
    }else{
        options.columns = options.columns.split(',')
    }
    options.offset = (options.limit * options.page) - options.limit

    let taxonomy = await Taxonomy.findOne({
        where: {
            taxSlug: options.slug,
            taxStatus: true
        },
        attributes: {
            exclude: ['taxStatus']
        }
    });

    let terms = await Term.findAll({
        where: {
            taxId: taxonomy.get().taxId
        },
        order: [
            [ options.orderBy, options.sort ]
        ],
        offset: options.offset,
        limit: options.limit,
        attributes: [
            ...options.columns,
            ['(SELECT COUNT(*) FROM post_term as pt WHERE pt.TermId=Term.TermId)', 'count']
        ]


    })

    return {status:true, taxonomy, terms}

} );
