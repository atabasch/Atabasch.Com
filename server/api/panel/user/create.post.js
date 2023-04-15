import {User} from "~/server/db/models"
import {hashPassword} from "@/helpers/helpers"

export default defineEventHandler(async (event) => {
    const {user: postData} = await readBody(event)

    //todo: Burada resim upload işlemi yap

    postData.userPassword = await hashPassword(postData.userPassword)

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
