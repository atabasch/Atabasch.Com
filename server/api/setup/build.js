import {Sync, User, Config} from "~/server/db/models"
import {defineEventHandler, readBody} from "h3";
import {hashPassword} from "~/helpers/helpers";

const configsArray = [
    ['site_url', '', 'Site Adresi'],
    ['site_author', '', 'Site Sahibi'],
    ['site_refresh', '600', 'Sayfa yenilenme süresi (sn)'],
    ['site_offline', '0', 'Site Kapalı'],
    ['site_offline_message', '', 'Site kapalı mesajı'],

    ['mail_driver', 'smtp', 'E-posta Sürücüsü'],
    ['mail_host', '', 'E-posta Sunucusu'],
    ['mail_port', '465', 'E-posta Portu'],
    ['mail_username', '', 'E-posta Kullanıcı'],
    ['mail_password', '', 'E-posta Şifre'],
    ['mail_encryption', 'ssl', 'E-posta Şifreleme'],

    ['mail_sender', '', 'E-posta Gönderen'],
    ['mail_sender_name', '', 'E-posta Gönderen Adı'],
    ['mail_reply', '', 'E-posta Cevap Postası'],

    ['about_summary_id', '', 'Anasayfada gösterilen küçük hakkımda sayfası id numarası'],
]

export default defineEventHandler( async (event) => {
    if(process.env.SETUP !== 1 && process.env.SETUP !== true){
        const {configs, user} = await readBody(event)
        await Sync()


        await Config.create({
            configKey: 'site_title',
            configValue: configs.site_title,
            configDescription: 'Site Başlığı'
        })

        await Config.create({
            configKey: 'site_description',
            configValue: configs.site_description,
            configDescription: 'Site Açıklaması'
        })

        configsArray.map(async (item) => {
            await Config.create({
                configKey: item[0],
                configValue: item[1],
                configDescription: item[2]
            })
        })

        user.userPassword = await hashPassword(user.userPassword)

        try {
            const createdUser = await User.create({...user},{
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


    }
    return {status: false}
} )

