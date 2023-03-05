import {CustomField} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    const {field: postData} = await readBody(event)

    const field = await CustomField.create({...postData})

    return {status:!!field, field}
})
