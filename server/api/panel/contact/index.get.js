import {Contact} from "~/server/db/models";
export default defineEventHandler(async (event) => {

    let contacts = await Contact.findAll({
        order: [
            ['contactId', 'DESC']
        ]
    });
    return {status:true, contacts}

});
