import {User} from "~/server/db/models"
export default defineEventHandler(async (event) => {
    let {id} = event.context.params
    let user = await User.findByPk(id, {
        include: {association: 'data'}
    })
    if(!user){
        return {status:false, message: 'Kullanıcı bulunamadı'}
    }
    return {status:true, user}
})
