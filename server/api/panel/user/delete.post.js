import {User, Post} from "~/server/db/models"
export default defineEventHandler(async (event) => {
    const {user: postData, authorId} = await readBody(event)
    if(!postData.userId){
        return {status:false, message: 'Birincil anahtar eksik'}
    }else{
        let user = await User.findByPk(postData.userId, { include: ['data'] })
        if(!user){
            return {status:false, message: 'Kullanıcı bulunamadı'}
        }else{

            // ÜYE AİT İÇERİKLERİ DEĞİŞTİR
            await Post.update({
                postAuthor: authorId || null
            }, {
                where: {
                    postAuthor: postData.userId
                }
            })

            let deletedUser = await user.destroy()
            if(!deletedUser){
                return {status:false, message: 'Kullanıcı silinemedi'}
            }else{



                return {status:true, user:deletedUser, message: 'Kullanıcı silindi'}
            } // deletedUser
        } // user
    } // postData.userId


})
