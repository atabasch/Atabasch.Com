import {Media} from "../../../db/models"
import {defineEventHandler, getCookie} from "h3";
export default defineEventHandler(async (event) => {

    let files = await Media.findAll({
        order: [
            ['mediaId', 'DESC']
        ]
    })

    return {status: true, files, cookie: getCookie(event, 'access_token') }

})
