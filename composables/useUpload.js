import useAuth from "~/composables/useAuth";

let convertFileToBase64 = (file) => {
    return new Promise(async (resolve, reject) => {
        let reader = await new FileReader();
        await reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export default async (file) => {
    return new Promise(async (resolve, reject) => {
        let base64File = await convertFileToBase64(file);

        let response = await $fetch('/api/panel/media/upload', {
            method: 'POST',
            headers: { ...useAuth().getHeaderToken() },
            body: {file: base64File}
        })
        if(response.status){
            resolve(response);
        }else{
            reject(response);
        }
    })
}
