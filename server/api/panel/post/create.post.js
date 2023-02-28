import {Post, Term} from "~/server/db/models"
import {app} from "~/server/lib/firebase"
import { getStorage } from "firebase-admin/storage"
import {writeFileSync, rmSync} from "fs"

// Firestora Storage Resim Upload
function getBufferFromBase64(base64Image){
    let types = [
        {ext: '.png', pattern: /^data:image\/png;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpeg;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpg;base64,/g, },
    ];

    let ext = null;
    let coverBuff = null;

    return new Promise( (resolve, reject) => {
        types.forEach( async (type) => {
            if(base64Image.substr(0, 30).match(type.pattern)){
                coverBuff = await Buffer.from(base64Image.replace(type.pattern, ""), 'base64');
                ext = type.ext;
                return resolve({file:coverBuff, ext:ext})
            }
        } ) // forEach

    } ) // promise

} // getType

export default defineEventHandler(async (event) => {
    const {post: postData} = await readBody(event);
    if(postData.postCover){
        await getBufferFromBase64(postData.postCover).then( async ({file, ext}) => {
            let localImagePath  = 'uploads/file-' + Math.random() + ext
            let remoteImagePath = `uploads/${Date.now()}-${Math.random()}`.replace('.','') + ext;

            await writeFileSync(localImagePath, file);
            const storage = await getStorage(app).bucket().upload(localImagePath, {
                destination: remoteImagePath,
                // gzip: true,
                public: true,
            })
            await rmSync(localImagePath)
            postData.postCover = storage[1].mediaLink
        } )
    }



    let post = await Post.create({...postData})
    await post.setTerms(postData.terms)

    if(!post){
        return {status: false, message: 'İçerik oluşturulamadı. '}
    }else{
        return {status:true, post, message: 'İçerik oluşturuldu.'}
    }

})
