import {getQuery} from "h3";
import {getPosts, getPostType} from "~/server/lib/GetDatas";

export default defineEventHandler(async (event) => {
    let query = await getQuery(event)

    let postTypeSlug    = query.type || 'post'
    let postType        = await getPostType(postTypeSlug)
    let posts           = await getPosts(postType.postTypeId, query)

    return { status:true, type:postType, posts:posts }
})
