import {User, UserData} from "~/server/db/models"
export default defineEventHandler(async (event) => {
    const {user: postData} = await readBody(event)
    if(!postData.userId){
        return {status: false, message: 'Birincil anahtar eksik'}
    }else{
        let user = await User.findByPk(postData.userId, { include: {  association: 'data'} })
        if(!user){
            return {status: false, message: 'Kullanıcı hesabı bulunamadı'}
        }else{
            // todo: Kullanıcı yeni parola göndermiş ise hashle
            let updatedUser = await user.update(postData)
            if(postData.data){
                let userData = await UserData.findByPk(postData.userId)
                if(userData){
                   let updatedUserData = await userData.update(postData.data)
                    updatedUser.data.dataValues =updatedUserData.dataValues
                }
            }
            // todo: data. güncellenemiyor
            if(!updatedUser){
                return {status: false, message: 'Kullanıcı hesabı güncellenemedi'}
            }else{
                return {status: true, user:updatedUser, message: 'Hesap güncelleme başarılı oldu'}
            }
        }
    }

})
