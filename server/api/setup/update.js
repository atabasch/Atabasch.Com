import {Sync} from "~/server/db/models"
import {defineEventHandler} from "h3";


export default defineEventHandler( async (event) => {
        await Sync()
    return {status: true}
} )

