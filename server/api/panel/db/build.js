import {Sync} from "@/server/db/models"
export default defineEventHandler( async () => {
    await Sync()
    return {}
} )

