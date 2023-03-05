import {CustomField} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    const {id} = await event.context.params
    const field = await CustomField.findByPk(id)
    return {status:true, field}
})
