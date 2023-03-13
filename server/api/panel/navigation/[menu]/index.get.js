import {Navigation} from "~/server/db/models";
import {Op} from "sequelize"
export default defineEventHandler(async (event) => {
    const {menu: idOrSlug} = await event.context.params

    const item = await Navigation.findOne({
        where: {
            navigationType: 'menu',
            [Op.or]: {
                navigationId: idOrSlug,
                navigationSlug: idOrSlug
            }
        },
    });

    return {status:true, navigation:item}

})
