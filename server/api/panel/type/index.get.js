import {PostType, Taxonomy} from "~/server/db/models";
import {Op} from "sequelize"
export default defineEventHandler( async (event) => {
    try {
        const types = await PostType.findAll({
            order: [
                ['postTypeId', 'DESC']
            ],
            include: [
                {association: 'fields'}
            ]
        })


        const getTaxonomies = (type) => {
            return new Promise(async (resolve) => {
                let tax_slugs = JSON.parse(type.postTypeTaxonomies);

                type.taxonomies = await Taxonomy.findAll({
                    where: {
                        taxSlug: {
                            [Op.in]:tax_slugs
                        }
                    }
                })
                resolve(type);
            });
        }

        let postTypes = [];

        for(let type_index in types){
            postTypes.push( await getTaxonomies(types[type_index].dataValues) );
        }


        return { status: true, types:postTypes }
    }catch (err){
        return { status: false }
    }
} )
