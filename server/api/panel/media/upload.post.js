import {uploadImage} from "@/server/lib/image"
import {defineEventHandler, readBody} from "h3";

export default defineEventHandler(async (event) => {

    const {file: base64File} = await readBody(event);

    if(!base64File){
        return {status: false, message: 'Resim Yükleme İşlemi Başarısız Oldu. '}
    }

    let imageLink = await uploadImage(base64File);
    if(!imageLink){
        return {status: false, message: 'Resim Yükleme İşlemi Başarısız Oldu. '}
    }

    return {status:true, url:imageLink, message: 'Resim Yüklendi.'}


})
