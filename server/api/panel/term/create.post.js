import {Term}  from "~/server/db/models";
export default defineEventHandler( async (event) => {

    const {term} = await readBody(event)

    const newTerm = await Term.create({...term})
    return {status: !!newTerm , term: newTerm}

})
