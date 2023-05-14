import {Post, PostExtra} from "~/server/db/models";
import {getQuery, defineEventHandler} from "h3";
import {Op} from "sequelize"

export default defineEventHandler(async (event) => {

    let {slug:postSlug} = await getQuery(event)
    let post = await Post.findOne({
        attributes: ['postId', 'postTitle', 'postSlug', 'postDescription', 'postKeywords', 'postContent', 'postCover', 'postTypeId', 'postParent', 'postAllowComment', 'postViews', 'postPublishedAt'],
        where: {
            postStatus: 'publish',
            [Op.or]: {
                postId: postSlug,
                postSlug: postSlug,
            }
        },
        include: [
            { association: 'type',
                attributes: [
                    ['postTypeId', 'id'],
                    ['postTypeTitle', 'title'],
                    ['postTypeSlug', 'slug'],
                    ['postTypeTaxonomies', 'taxonomies'],
                    ['postTypeStatus', 'status']]
            },
            { association: 'user',
                attributes: [
                    ['userId', 'id'],
                    ['userUsername', 'username'],
                    ['userEmail', 'email'],
                    ['userLevel', 'level'],
                    ['userCover', 'cover'],
                    ['userDisplayName', 'displayName']]
            },
            { association: 'extra', attributes: ['extraName', 'extraValue'] },
            { association: 'terms', attributes: ['termId', 'taxId', 'termTitle', 'termSlug', 'termDescription', 'termParent'], include: [{ association: 'taxonomy', attributes: ['taxTitle', 'taxSlug'] }] },
        ]
    })

    let postData = await post.get()



    // Extralar bir objeye dönüştürülüyor.
    postData.extra = await postData.extra.reduce(async (obj, item) => {
        return new Promise(async (resolve, reject) => {
            let o = await obj
            o[item.extraName] = item.extraValue
           return  resolve(o)
        })
    }, {})


    // Terimler ayarlanıyor.
    let taxKeys = await postData.type.get().taxonomies.replace(/[\[\]\{\}\"\'\:\s]/g, '').split(',')
    postData.taxonomies = {}
    taxKeys.forEach((taxKey) => {
        postData.taxonomies[taxKey] = []
    })

    postData.terms.forEach( async (term) => {
        return new Promise(async (resolve)=>{
            postData.taxonomies[term.taxonomy.taxSlug].push({
                id: term.termId,
                title: term.termTitle,
                slug: term.termSlug,
                description: term.termDescription,
                parent: term.termParent,
                taxonomy: {
                    id: term.taxId,
                    slug: term.taxonomy.taxSlug,
                }
            })
            return resolve(true)
        })
    })

    delete postData.terms

    return {status:true, post:postData }
});

