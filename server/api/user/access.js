import {defineEventHandler, readBody} from "h3";
import {checkJwt} from "@/helpers/helpers"

export default defineEventHandler(async (event) => {

    const {access_token: accessToken} = await readBody(event)

    if(!accessToken){
        return { status:false, message: 'Token bulunamadı' }
    }else{
        let validAuth = await checkJwt(accessToken)
        if(!validAuth){
            return { status:false, message: 'Token bulunamadı' }
        }
        return { status:true, message: 'Token bulundu' }
    }

})
