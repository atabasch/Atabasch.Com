import Term from "~/server/db/models/Term"
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let term = await Term.findByPk(id || null)

    if(!term){
        return {status:false, message: 'Terim bulunamadı'}
    }else{

        return {status:true, term:term}

    }
})
