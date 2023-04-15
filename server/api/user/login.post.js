import {Op, fn} from "sequelize"
import {User} from "~/server/db/models";
import {readBody} from "h3";
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
    let token = await createJwt(tokenData, 60 * (process.env.APP_LOGIN_TIMEOUT || 30) ) // 1 saat
    delete userData.userPassword

    // Kullanıcı Son giriş tarihini güncelle
    await user.update({
        userLoggedAt:  fn('NOW')
    })

    return { status:true, token, user:userData }

})
