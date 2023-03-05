import {CustomField} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    const {field: postData} = await readBody(event)
    const field = await CustomField.findByPk(postData.fieldId)
    if(!field){
        return {status:false, message: 'Özel alan bulunamadı'}
    }else{
        const deleted = await field.destroy();
        return {status:true, field:deleted, message:'Özel alan silindi'}
    }
})
