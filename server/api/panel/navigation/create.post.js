import {Navigation} from "~/server/db/models";
import {readBody} from "h3";
import slugify from "@/helpers/slugify"

export default defineEventHandler(async (event) => {
    const {navigation: postData} = await readBody(event)

    if(!postData){
        return {status:false, message: 'Eksik Bilgi'}
    }else{
        if(postData.navigationSlug.length < 1){
            postData.navigationSlug = await slugify(postData.navigationName)
        }
        postData.navigationExtra = await JSON.stringify(postData.navigationExtra)
        let createdMenu = await Navigation.create(postData)

        if(!createdMenu){
            return {status:false, message: 'Menü Oluşturulamadı'}
        }else{
            return {status:true, navigation:createdMenu}
        }
    }

})
