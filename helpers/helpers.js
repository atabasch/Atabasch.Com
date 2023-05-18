import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// Objeyi JSON'a çevirmek
export const objectToJson = (obj) => {
    return (['array', 'object', 'obj'].indexOf(typeof obj) < 0)? obj : JSON.stringify(obj)
}

// JSON tipi Sorgulama
export const isJson = (str) => {
    try{
        JSON.parse(str);
    }catch (e){
        return false;
    }
    return true;
}

// PAROLA HASHLEMEK
export const hashPassword = async (password) => {
    let salt    = await bcrypt.genSaltSync(12)
    let result  = await bcrypt.hashSync(password, salt)
    return result
}

// PAROLA DOĞRULAMAK
export const checkPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}

// JWT OLUŞTURMAK
export const createJwt = async (data, seconds) => {
    return new Promise(async (resolve, reject) => {
       return jwt.sign(
            {...data},
            process.env.APP_SECRET_KEY,
            { expiresIn: seconds },
            (err, token) => {
                if(err){
                    reject(false)
                }else{
                    resolve(token)
                }
            })
    })
}

// JWT DOĞRULAMAK
export const checkJwt = async (token) => {
    try {
        return await jwt.verify(token, process.env.APP_SECRET_KEY)
    }catch(err){
        return false
    }
}
