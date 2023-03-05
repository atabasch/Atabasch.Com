import {CustomField} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    const {field: postData} = await readBody(event)
    if(!postData.fieldId){
        return {status:false, message:'Birincil anahtar eksik'}
    }else{
        let field = await CustomField.findByPk(postData.fieldId)
        if(!field){
            return {status:false, message:'Özel Alana Bulunamadı'}
        }else{
            let updated = await field.update(postData)
            if(!updated){
                return {status:false, message:'Özel Alan Güncellenemedi'}
            }else{
                return {status:true, field:updated, message:'Özel Alan Güncellendi'}
            }
        }
    }
})
