import {rmSync, writeFileSync} from "fs";
import {getStorage} from "firebase-admin/storage";
import {app} from "~/server/lib/firebase";

export const getBufferFromBase64 = (base64Image=null) => {
    let types = [
        {ext: '.png', pattern: /^data:image\/png;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpeg;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpg;base64,/g, },
    ];

    let ext = null;
    let coverBuff = null;

    return new Promise( (resolve, reject) => {

        if(!base64Image){
            return reject();
        }else{
            types.forEach( async (type) => {
                if(base64Image.substr(0, 30).match(type.pattern)){
                    coverBuff = await Buffer.from(base64Image.replace(type.pattern, ""), 'base64');
                    ext = type.ext;
                    return resolve({file:coverBuff, ext:ext})
                }
            } ) // forEach
        }

    } ) // promise
}

export const uploadToFirestore = async (fileObject) => {
    return new Promise(async (resolve, reject) => {
        let localImagePath  = 'uploads/file-' + Math.random() + fileObject.ext
        let remoteImagePath = `uploads/${Date.now()}-${Math.random()}`.replace('.','') + fileObject.ext;

        await writeFileSync(localImagePath, fileObject.file);
        const storage = await getStorage(app).bucket().upload(localImagePath, {
            destination: remoteImagePath,
            // gzip: true,
            public: true,
        })
        await rmSync(localImagePath)
        return resolve(storage[1] || null)
    })
}
