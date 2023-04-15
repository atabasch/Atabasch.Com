import {getQuery} from "h3";

export default defineEventHandler( async (event) => {
    let q = await getQuery(event)

    return {}
} )

