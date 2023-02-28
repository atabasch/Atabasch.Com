import Taxonomy from "~/server/db/models/Taxonomy";
export default defineEventHandler( async (event) => {

    try {
        const taxonomies = await Taxonomy.findAll({
            order: [
                ['taxId', 'DESC']
            ]
        })
        return { status: true, taxonomies }
    }catch (err){
        return { status: false }
    }

} )
