import {PostType} from "~/server/db/models";
import {Op} from "sequelize"

export default async (type) => {

    let result = await PostType.findOne({
        where: {
            [Op.or]: {
                PostTypeId: type,
                PostTypeSlug: type
            }
        },
        attributes: {
            exclude: ['postTypeTaxonomies', 'postTypeStatus']
        }
    })

    return result.get()

}
