import {Config} from "~/server/db/models";
export default defineEventHandler(async (event) => {
    let {configs: postDatas} = await readBody(event);
    if(typeof postDatas !== 'object'){
        return {status:false, message: 'Yapılandırma ayaları dizi olarak göndeirlmeli'}
    }else{
        Object.values(postDatas).forEach(async (config) => {
            await Config.update(config, { where: { configId: config.configId } });
        })
    }
    return {status:true }
});
