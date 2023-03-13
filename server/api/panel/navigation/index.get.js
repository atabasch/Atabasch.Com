import {Navigation} from "~/server/db/models";
export default defineEventHandler(async () => {

    const items = await Navigation.findAll({
        where: {
            navigationParent: 0
        },
        order: [
            ['navigationId', 'ASC']
        ]
    });

    return {status:true, navigations:items}

})
