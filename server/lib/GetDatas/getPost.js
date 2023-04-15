import {Post, PostType} from "~/server/db/models";
import {Op} from "sequelize"
export default async (idOrSlug, options) => {

    let post = await Post.findOne({
        where: {
            [Op.or]:{
                postId: idOrSlug,
                postSlug: idOrSlug
            },
            postStatus: true
        },
        attributes: {
          exclude: [
              'postStatus',
              'postTypeId',
              'postDeletedAt',
              'postCreatedAt',
              'postUpdatedAt'
          ]
        },
        include: [
            {
                association: 'terms',
                attributes: ['termId', 'termTitle', 'termSlug'],
            },
            {
                association: 'type',
                attributes: { exclude: ['postTypeTaxonomies', 'postTypeStatus'] }
            },
            {
                association: 'user',
                attributes: ['userId', 'userUsername', 'userEmail', 'userDisplayName', 'userLevel', 'userCover'],
            },
            {
                association: 'extra',
                attributes: ['extraName', 'extraValue']
            }
        ]
    })

    return post
}
