import {Navigation, Post, PostType, Taxonomy} from "@/server/db/models";
import {Op} from "sequelize";

export default defineEventHandler(async (event) => {

    let result = {
        status:true,
        topPosts: [],
        navigations: [],
        taxonomies: []
    }

    // EN ÇOK OKUNAN BLOG YAZILARI
    let topPosts = await PostType.findOne({
        where: { postTypeSlug: 'post' },
        include: [
            {
                association:'posts',
                attributes: ['postId', 'postTitle', 'postSlug', 'postCover', 'postViews'],
                where: { postStatus: 'publish' },
                order: [['postViews', 'DESC']],
                offset: 0,
                limit: 7,
            }
        ]
    })
    result.topPosts = topPosts.posts

    // MENÜLER
    result.navigations = await Navigation.findAll({
        where: { navigationType:'menu' },
        attributes: ['navigationId', 'navigationName', 'navigationSlug', 'navigationParent', 'navigationTarget','navigationExtra'],
        include: [
            {
                association: 'items',
                attributes: ['navigationId', 'navigationName', 'navigationSlug', 'navigationParent', 'navigationTarget', 'navigationParent', 'navigationExtra'],
                order: [['navigationOrder', 'ASC']],
            },
        ],
    })

    // TAXONOMİLER
    result.taxonomies = await Taxonomy.findAll({
        where: {
            taxStatus: true,
            taxSlug: {
                [Op.in]: ['kategori']
            },
        },
        include: [
            { association: 'terms', attributes: ['termId', 'termTitle', 'termSlug', 'termOrder', 'termParent', 'termDescription'] }
        ]
    })





    return result

})
