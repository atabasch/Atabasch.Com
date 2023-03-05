import {User} from "~/server/db/models"
export default defineEventHandler(async (event) => {
    const {user: postData} = await readBody(event)

    //todo: Burada resim upload işlemi yap
    // TODO: Kullanıcı parolasını hashle

    try {
        const createdUser = await User.create({...postData},{
            include: ['data']
        })
        if(!createdUser){
            return {status:false, message: 'Kullanıcı oluşturulamadı'}
        }else{
            return {status:true, user: createdUser}
        }
    }catch (error){
        return {status:false, error}
    }
})
