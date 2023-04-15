import {Navigation} from "~/server/db/models";
import {Op} from "sequelize"
export default defineEventHandler(async (event) => {
    const {menu: idOrSlug} = await event.context.params

    const navigation = await Navigation.findOne({
        where: {
            navigationType: 'menu',
            [Op.or]: {
                navigationId: idOrSlug,
                navigationSlug: idOrSlug
            }
        }
    });

    let items =  await Navigation.findAll({
        where: {
            navigationType: 'item',
            navigationParent: navigation.navigationId
        },
        order: [
            ['navigationOrder']
        ]
    });


    return {
        status:true,
        navigation: {
            ...navigation.get(),
            items: items
        }
    }

})
