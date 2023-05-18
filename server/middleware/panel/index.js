import {checkJwt} from "@/helpers/helpers"
import {Config} from "../../db/models"
import {defineEventHandler} from "h3";
export default defineEventHandler(async (event) => {

    // let authToken = (await event.node.req.headers.authentication || null)
    // if(authToken){
    //     authToken = authToken.replace('Bearer ', '')
    // }
    //
    //
    // if( event.node.req.url.indexOf('api/panel') >= 0 ){
    //     let validAuth = await checkJwt(authToken)
    //     if(!validAuth){
    //         return { status:false, message:'Erişim Engellendi' }
    //     }
    // }

    // AYARLAR ATANIYOR
    let configs = await Config.findAll({
        attributes: ['configKey', 'configValue']
    })
    await configs.forEach(async (config) => {
        return new Promise(async (resolve) => {
            process.env[config.configKey] = config.configValue
            resolve(true)
        })
    })

})
