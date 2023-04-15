import {Destroy} from "~/server/db/models"
export default defineEventHandler( async () => {
    await Destroy()
    return {}
} )

