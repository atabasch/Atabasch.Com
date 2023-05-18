import {createJwt} from "~/helpers/helpers";

export const createAccessToken = async (user) => {
    return new Promise(async (resolve, reject) => {
        let data = {
            id:             user.userId,
            username:       user.userUsername,
            email:          user.userEmail,
            level:          user.userLevel,
            cover:          user.userCover,
            displayName:    user.userDisplayName
        }
        let limit = 60 * (process.env.ACCESS_TOKEN_LIMIT || 15)
        try {
            let token = await createJwt(data,  limit)
            return resolve(token)
        }catch(err){
            return reject(false)
        }
    })
}

export const createRefreshToken = async (user) => {
    return new Promise(async (resolve, reject) => {
        let data = {
            id:             user.userId,
            email:          user.userEmail,
        }
        let limit = 60 * (process.env.REFRESH_TOKEN_LIMIT || 120)
        try {
            let token = await createJwt(data,  limit)
            return resolve(token)
        }catch(err){
            return reject(false)
        }
    })
}
