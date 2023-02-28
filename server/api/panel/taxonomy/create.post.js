import Taxonomy from "~/server/db/models/Taxonomy";
export default defineEventHandler( async (event) => {

    const {taxonomy} = await readBody(event)
    const newTax = await Taxonomy.create({...taxonomy})
    return {status: !!newTax , taxonomy: newTax}

})
