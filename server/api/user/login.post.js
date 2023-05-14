import {Op, fn} from "sequelize"
import {User} from "~/server/db/models";
import {defineEventHandler, readBody, setCookie} from "h3";
import {createJwt, checkPassword} from "@/helpers/helpers"

export default defineEventHandler(async (event) => {
    const {user: postData} = await readBody(event)

    let user = await User.findOne({
        where: {
            userStatus: { [Op.gt]: 0 },
            userLevel: { [Op.gt]: 0 },
            [Op.or] : [
                {userUsername: postData.name},
                {userEmail: postData.name}
            ]
        }
    })

    if(!user){
        return { status:false, message: 'Kullanıcı Bulunamadı' }
    }

    let validPassword = await checkPassword(postData.password, user.userPassword)
    if(!validPassword){
        return { status:false, message: 'Kullanıcı Bilgileri Doğru Değil' }
    }

    let userData = await user.get()
    let tokenData = {
        id:             userData.userId,
        username:       userData.userUsername,
        email:          userData.userEmail,
        level:          userData.userLevel,
        cover:          userData.userCover,
        displayName:    userData.userDisplayName
    }

    let tokenLimit = 60 * (process.env.APP_LOGIN_TIMEOUT || 30)
    if(postData.remember){
        tokenLimit = 60 * parseInt(process.env.APP_LOGIN_TIMEOUT_REMEMBER || 60 * 24 * 7) // 7 gün
    }
    let token = await createJwt(tokenData,  tokenLimit) // 1 saat

    // todo: cookie set et
    // setCookie(event, 'access_token', token, {
    //     maxAge: 60,
    // })
    // setCookie(event, 'refresh_token', token, {
    //     maxAge: 60,
    // })

    delete userData.userPassword

    // Kullanıcı Son giriş tarihini güncelle
    await user.update({
        userLoggedAt:  fn('NOW')
    })

    return { status:true, token, user:userData }

})
