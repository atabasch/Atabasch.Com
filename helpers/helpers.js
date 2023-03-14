export const objectToJson = (obj) => {
    return (['array', 'object', 'obj'].indexOf(typeof obj) < 0)? obj : JSON.stringify(obj)
}

export const isJson = (str) => {
    try{
        JSON.parse(str);
    }catch (e){
        return false;
    }
    return true;
}
