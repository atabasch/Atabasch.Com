import Term from "~/server/db/models/Term"
export default defineEventHandler(async (event) => {
    let {term: postData} = await readBody(event)
    let term = await Term.findByPk(postData.termId)

    if(!term){
        return {status:false, message: 'Terim bulunamadı'}
    }else{

        let updatedTerm = await term.update(postData)
        if(!updatedTerm){
            return {status:false, message: 'Terim güncelleme başarısız'}
        }else{
            return {status:true, term:updatedTerm, message: 'Terim güncellendi'}
        }

    }
})
