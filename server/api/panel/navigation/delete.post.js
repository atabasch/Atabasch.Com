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

            let deletedMenu = await menu.destroy()
            if(!deletedMenu){
                return {status:false, message: 'Menü silinirken bir sorun oluştu'}
            }else{
                await Navigation.destroy({
                    where: {
                        navigationParent: postData.navigationId
                    }
                })

                return {status:true, navigation:deletedMenu, message: 'Menü silindi'}
            }
        }
    }

})
