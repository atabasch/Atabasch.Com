import Taxonomy from "~/server/db/models/Taxonomy";
export default defineEventHandler( async (event) => {

    const {taxonomy} = await readBody(event)

    if(!taxonomy.taxId){
        return {status: false, message: 'Birincil Anahtar Eksik'}
    }else{

        return Taxonomy.findByPk(taxonomy.taxId).then( (foundItem) => {

            if(!foundItem){
                return {status: false}
            }else{
                return foundItem.destroy()
            }

        } ).then( (deletedItem) => {

            if(!deletedItem){
                return {status: false}
            }else{
                return {status: true, taxonomy: deletedItem}
            }

        } ).catch(err => {
            return {
                status: false
            }
        })


    }

} )
