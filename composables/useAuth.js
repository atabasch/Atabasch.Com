import {ref} from "vue";
import useUser from "~/composables/useUser";

const authUser = ref({})
const authInit = ref(false)

export default () => ({

    set: function(user, token){
        if(process.client){
            localStorage.setItem('auth_token', token)
        }
        authUser.value = {...user, token}
    },

    get: function (key=false, defaultValue = null){
        return !key? {...authUser.value} : ( authUser.value[key] || defaultValue )
    },

    logout: function (){
      if(process.client){
          localStorage.removeItem('auth_token')
      }
      return true
    },

    isLoggedIn: async function(level=1){
        return new Promise(async (resolve, reject) => {
            if(!authInit.value){
                let token = null
                if(process.client){
                    token = localStorage.getItem('auth_token') || null
                }
                let response = await useUser().checkToken(token)
                if(response.status && response.user){
                    authUser.value = {...response.user, token}
                }else{
                   resolve(false)
                }
                authInit.value = true
            }

           resolve(authUser.value.userId && authUser.value.userLevel >= level)
        })
    },


    getHeaderToken: function(){
        if(process.client){
            let token = localStorage.getItem('auth_token') || false
            if(!token){ return {} }
            return {authentication: token}
        }else{
            return {}
        }
    }

})
