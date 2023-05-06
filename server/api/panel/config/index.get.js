import {Config} from "~/server/db/models";
export default defineEventHandler(async (event) => {

    let configs = await Config.findAll({
        order: [
            ['configOrder', 'ASC']
        ]
    });
    return {status:true, configs}


});
