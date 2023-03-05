import {Contact} from "~/server/db/models";
export default defineEventHandler( async (event) => {
    let {contact: postData} = await readBody(event)
    let contact = await Contact.create(postData);
    if(!contact){
        return {status:false, message: 'İletişim içeriği gönderilirken bir sorun oluştu'}
    }else{
        return {status:true, message: 'İletişim içeriği gönderildi. Gerekli durumda en kısa zamanda size dönüş yapılacaktır.'}
    }
} )
