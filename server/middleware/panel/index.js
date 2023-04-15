import {checkJwt} from "@/helpers/helpers"
export default defineEventHandler(async (event) => {
    let authToken = (await event.node.req.headers.authentication || null)
    if(authToken){
        authToken = authToken.replace('Bearer ', '')
    }


    if( event.node.req.url.indexOf('api/panel') >= 0 ){
        let validAuth = await checkJwt(authToken)
        if(!validAuth){
            return { status:false, message:'Erişim Engellendi' }
        }
    }
})
