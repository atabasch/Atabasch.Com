import {Navigation} from "~/server/db/models";
import {Op} from "sequelize"
export default defineEventHandler(async (event) => {
    const {menu: idOrSlug} = await event.context.params

    const items = await Navigation.findOne({
        where: {
            navigationType: 'item',
            [Op.or]: {
                navigationId: idOrSlug,
                navigationSlug: idOrSlug
            }
        },
    });

    return {status:true, navigation:items}

})
