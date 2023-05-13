import {defineEventHandler, getQuery} from "h3";
import {getPosts, getPostType} from "~/server/lib/GetDatas";
import {Op} from "sequelize";

export default defineEventHandler(async (event) => {
    let query = await getQuery(event)

    let postTypeSlug    = query.type || 'post'
    let postType        = await getPostType(postTypeSlug)

    let options = {
        ...query,
        termFilter: !query.term? null : {
            [Op.or]: {
                termId: query.term,
                termSlug: query.term
            }
        },
    }





    let posts = await getPosts(postType.postTypeId, options)

    return { status:true, type:postType, posts }
})
