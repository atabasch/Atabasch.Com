import {getPosts, getPost, getTerms} from "@/server/lib/GetDatas"

export default defineEventHandler(async (event) => {

    let result = {
        posts: [],
    };
    result.posts = await getPosts('post', { limit:5, columns: 'postId,postTitle,postSlug,postDescription,postCover,postPublishedAt,postViews' })
    return result
});
