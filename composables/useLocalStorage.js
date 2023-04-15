export default () => ({

    set: (key, value='') => {
        if(process.client){
            localStorage.setItem(key, value)
        }
    },

    get: (key, defaultValue=null) => {
        if(process.client){
            return localStorage.getItem(key) || defaultValue
        }
    },



})
