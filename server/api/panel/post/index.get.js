import {Post} from "@/server/db/models"
export default defineEventHandler(async (event) => {
    const {type} = await getQuery(event)

    let posts = await Post.findAll({
        where: {
            postTypeId: type
        },
        include: [
            {association: 'user', attributes: ['userUsername', 'userDisplayName']},
            {association: 'terms', attributes: ['termId', 'termTitle', 'termSlug']},
            {association: 'type', attributes: ['postTypeId', 'postTypeSlug']}
        ],
        order: [
            ['postId', 'DESC']
        ]
    })

    return {status: true, posts}
})
