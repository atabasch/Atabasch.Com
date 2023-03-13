import {Navigation} from "~/server/db/models";
import {readBody} from "h3";

export default defineEventHandler(async (event) => {
    const {navigation: postData} = await readBody(event)

    if(!postData.navigationId){
        return {status:false, message: 'Eksik Bilgi'}
    }else{
        let menu = await Navigation.findByPk(postData.navigationId)

        if(!menu){
            return {status:false, message: 'Menü Bulunamadı'}
        }else{

            postData.navigationExtra = await JSON.stringify(postData.navigationExtra)
            let updatedMenu = await menu.update(postData)

            if(!updatedMenu){
                return {status:false, message: 'Menu güncellenirken bir sorun oluştu'}
            }else{
                return {status:true, navigation:updatedMenu, message: 'Menü güncellendi'}
            }
        }
    }

})
