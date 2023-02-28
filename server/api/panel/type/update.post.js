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

            if(typeof postData.postTypeTaxonomies === 'object'){
                postData.postTypeTaxonomies = JSON.stringify(postData.postTypeTaxonomies).toString()
            }

            let updatedPostType = await postType.update({...postData})
            if(!updatedPostType){
                return {status: false, message: 'İçerik türü günellenemedi'}
            }else{
                return {status:true, type:updatedPostType, message: 'İçerik türü güncellendi'}
            }
        }
    }
} )
