import Taxonomy from "~/server/db/models/Taxonomy";
export default defineEventHandler( async (event) => {

    const {taxonomy: postData} = await readBody(event)

    if(!postData.taxId){
        return {status: false, message: 'Birincil Anahtar Eksik'}
    }else{

        let taxonomy = await Taxonomy.findByPk(postData.taxId);
        if(!taxonomy){
            return {status:false, message: 'Taksonomi bulunamadı'}
        }else{
            let updatedItem = await taxonomy.update({
                taxTitle: postData.taxTitle,
                taxDescription: postData.taxDescription,
                taxStatus: postData.taxStatus
            })

            if(!updatedItem){
                return {status:false, message: 'Güncelleme işlemi başarısız oldu.'}
            }else{
                return {status:true, taxonomy: updatedItem}
            }
        }
    }

} )
