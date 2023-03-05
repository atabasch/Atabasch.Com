import {Config} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let {config: postData} = await readBody(event);
    console.log(postData)

    if(!postData.configKey){
        return {status:false, message: 'Yapılandırma anahtarı boş olamaz'}
    }
    let newConfig = await Config.create(postData);
    return {status:true, config:newConfig }

});
