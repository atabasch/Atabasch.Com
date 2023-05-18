import {Op, fn} from "sequelize"
import {User} from "~/server/db/models";
import {createJwt, checkPassword} from "@/helpers/helpers"
import {defineEventHandler, readBody} from "h3";
import {createAccessToken, createRefreshToken} from "~/server/lib/tokens";

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
    let accessToken = await createAccessToken(userData)
    let refreshToken = await createRefreshToken(userData)

    delete userData.userPassword
    // Kullanıcı Son giriş tarihini güncelle
    await user.update({ userLoggedAt:  fn('NOW') })

    return { status:true, accessToken:accessToken, refreshToken:refreshToken, user:userData }

})
