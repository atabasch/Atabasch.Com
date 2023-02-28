import {PostType} from "~/server/db/models";
export default defineEventHandler( async (event) => {
    const {type: postData} = await readBody(event)

    if(!postData.postTypeId){
        return {status: false, message: 'Birincil Anahtar Eksik'}
    }else{
        let postType = await PostType.findByPk(postData.postTypeId)
        if(!postType){
            return {status: false, message: 'İçerik türü bulunamadı'}
        }else{
            let deletedPostType = await postType.destroy()
            if(!deletedPostType){
                return {status: false, message: 'İçerik türü silinemedi'}
            }else{
                return {status:true, type:deletedPostType, message: 'İçerik türü silindi'}
            }
        }
    }
} )
