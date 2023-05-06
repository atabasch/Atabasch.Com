import {Post, PostType} from "~/server/db/models";
import {Op} from "sequelize";

export default async (postTypeIdOrSlug, options={}) => {


    options.limit       = Number(options.limit || 10)
    options.page        = Number(options.page || 1)
    options.offset      = Number(options.offset || 0)
    options.offset      = options.offset + ((options.limit * options.page) - options.limit)
    options.order       = options.orderBy || 'postId'
    options.sort        = options.sort || 'DESC'
    options.columns     = options.columns || null

    options.in          = !options.in? [] : options.in.split(',')
    options.not_in      = !options.not_in? null : options.not_in.split(',')

    options.filter      = options.filter || {}
    options.extraFilter = options.extraFilter || null
    options.termFilter  = options.termFilter || null
    options.userFilter  = options.userFilter || null




    if(options.columns){
        options.columns = options.columns.split(',')
    }

    let type = await PostType.findOne({
        where: {
            [Op.or] : {
                postTypeId: postTypeIdOrSlug,
                postTypeSlug: postTypeIdOrSlug
            }
        }
    })



    let findOptions = {
        where: {
            postTypeId: type.postTypeId,
            postStatus: 'publish',


            ...options.filter
        },
        offset: options.offset,
        limit: options.limit,
        raw: false,
        order: [
            [options.order, options.sort]
        ],

        include: [
            {   association:  'terms',
                attributes: ['termId', 'termTitle', 'termSlug'],
                include: [
                    {
                        association:  'taxonomy',
                        attributes: ['taxId', 'taxTitle', 'taxSlug'],
                    }
                ],
                where: options.termFilter
            },
            {   association:  'extra',
                attributes: ['extraName', 'extraValue'],
                where: options.extraFilter
            },
            {   association:  'user',
                attributes: ['userId', 'userUsername', 'userEmail', 'userDisplayName', 'userLevel', 'userCover'],
                where: options.userFilter
            },
        ]
    }



    if(!options.columns){
        findOptions.attributes = {
                exclude: [
                'postStatus',
                'postTypeId',
                'postDeletedAt',
                'postCreatedAt',
                'postUpdatedAt'
            ]
        }
    }else{
        findOptions.attributes = options.columns
    }



    let posts = await Post.findAll(findOptions)

    return posts
}

