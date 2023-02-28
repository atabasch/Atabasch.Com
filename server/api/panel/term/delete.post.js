import Term from "~/server/db/models/Term"
export default defineEventHandler( async (event) => {
    let {term: postData} = await readBody(event)
    let term = await Term.findByPk(postData.termId)
    if(!term){
        return {status:false, message : 'Silinecek terim bulunamadı'}
    }else{
        let deletedTerm = await term.destroy()
        if(!deletedTerm){
            return {status:false, message : 'Terim silinemedi'}
        }else{
            return {status:true, term: deletedTerm}
        }
    }
} )
