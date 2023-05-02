import {rmSync, writeFileSync} from "fs";
import {getStorage} from "firebase-admin/storage";
import {app} from "~/server/lib/firebase";
import {Media} from "../db/models"
import {imageSize} from "image-size"


// todo: Bu method yüklenen resmi database'e kaydedecek ayarla ve gerekli yerlere yaz.
const saveToDatabase = async (data, location) => {
    return new Promise(async (resolve, reject) => {
        let media = await Media.create({
            mediaName: data.name || data.file.split('/').pop(),
            mediaPath: data.file,
            mediaType: data.type,
            mediaLocation: location,
            mediaData: {
                width: data.width || 0,
                height: data.height || 0,
                size: data.size || 0,
                ext: data.ext || '',
            },
        });

        if(!media){
            return reject(false)
        }else{
            return resolve(media)
        }
    })
}

// Base64 formatındaki görseli arabelleğe alıp, Buffer formatına çevirir.
export const  getBufferFromBase64 = (base64Image=null) => {
    let types = [
        {ext: '.png', pattern: /^data:image\/png;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpeg;base64,/g, },
        {ext: '.jpg', pattern: /^data:image\/jpg;base64,/g, },
    ];

    let ext = null;
    let coverBuff = null;

    return new Promise( (resolve, reject) => {

        if(!base64Image){
            return reject({status:false, file:null, ext:null});
        }else{
            types.forEach( async (type) => {
                if(base64Image.substr(0, 30).match(type.pattern)){
                    coverBuff = await Buffer.from(base64Image.replace(type.pattern, ""), 'base64');
                    ext = type.ext;
                    return resolve({status:true, file:coverBuff, ext:ext})
                }
            } ) // forEach
        }

    } ) // promise
}

// Görseli arabelleğe alıp, Buffer formatına çevirir.
export const uploadToFirestore = async (fileObject) => {
    return new Promise(async (resolve, reject) => {
        let localImagePath  = 'public/uploads/file-' + Math.random() + fileObject.ext
        let remoteImagePath = `public/uploads/${Date.now()}-${Math.random()}`.replace('.','') + fileObject.ext;

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


export const uploadImageToFirestore = async (base64Image) => {
    return new Promise(async function(resolve, reject){
        return getBufferFromBase64(base64Image)
            .then(async ({file, ext}) => {
                let result = await uploadToFirestore({file, ext})
                // Firestore'a yüklenen resmin bilgilerini database'e kaydet.
                let {height, width, type} = await imageSize(file)
                await saveToDatabase({
                    name:result.name.split('/').pop(),
                    file: result.mediaLink,
                    ext: type,
                    width: width,
                    height: height,
                    type: result.contentType,
                    size: result.size,
                }, 'firestore')
                resolve(result.mediaLink)
            })
            .catch(() => {
                return reject(false)
            })
    })
}


export const uploadImageToLocal = async (base64Image) => {
    return new Promise(async function(resolve, reject){
        return getBufferFromBase64(base64Image)
            .then(async ({file, ext}) => {
                let localImagePath  = `/uploads/${Date.now()}-${Math.random()}`.replace('.','') + ext;
                try {
                    await writeFileSync('public'+localImagePath, file);

                    // Local klasöre yüklenen resmin bilgilerini database'e kaydet.
                    let {height, width, type} = await imageSize(file)
                    await saveToDatabase({
                        name: localImagePath.split('/').pop(),
                        file: localImagePath,
                        ext: type,
                        width, height,
                        type: 'image/'+type,
                        size: 0,
                    }, 'local')

                    resolve(localImagePath)
                }catch (err){
                    return reject(false)
                }
            })
            .catch(() => {
                return reject(false)
            })
    })
}


export const uploadImage = async (base64Image) => {
    let result = null;
    switch (process.env.IMAGE_UPLOAD_PATH){
        case 'firestore':
            result = await uploadImageToFirestore(base64Image);
            break;

        case 'local':
            result = await uploadImageToLocal(base64Image);
            break;

        default:
            result = await uploadImageToLocal(base64Image);
            break;
    }
    return result;
}
