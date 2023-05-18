import {defineEventHandler, readBody} from "h3";
import {checkJwt} from "@/helpers/helpers"
import {User} from "~/server/db/models";
import {Op} from "sequelize";

export default defineEventHandler(async (event) => {
    let {accessToken} = await readBody(event)
    let data = await checkJwt(accessToken)
    if(!data){
        return {status:false}
    }

    let user = await User.findOne({
        where: {
            userId: data.id,
            userStatus: { [Op.gt]: 0 },
            userLevel: { [Op.gt]: 0 },
        }
    })

    if(!user){
        return {status:false}
    }

    let userData = user.get()
    delete userData.userPassword

    return {status:true, user:userData, accessToken}
})
