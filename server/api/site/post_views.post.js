import {defineEventHandler, readBody} from "h3";
import {Post} from "../../db/models"
export default defineEventHandler(async (event) => {
    let {idOrSlug} = await readBody(event);
    let post = await Post.findOne({where: {postId: idOrSlug}});
    if (!post) {
        return {status: false}
    }
    let updatedPost = await post.update({postViews: post.postViews + 1})
    return {status: true, views: updatedPost.postViews}
})
