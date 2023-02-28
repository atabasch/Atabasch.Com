import Term from "~/server/db/models/Term"
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let terms = await Term.findAll({
        order: [
            ['termId', 'DESC']
        ]
    })

    if(!terms){
        return {status:false, message: 'Terim bulunamadı'}
    }else{

        return {status:true, terms:terms}

    }
})
