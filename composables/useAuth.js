import {ref} from "vue";
import useUser from "~/composables/useUser";

const authUser = ref({})
const authInit = ref(false)
const accessTokenKey = "accessToken"
const refreshTokenKey = "refreshToken"


export default () => ({

    // Giriş yapan kullanıcın bilgilerini authUser state'ine atar
    set: function(user, tokens){
        if(process.client){
            localStorage.setItem(accessTokenKey, tokens.accessToken)
            localStorage.setItem(refreshTokenKey, tokens.refreshToken)
        }
        authUser.value = {...user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}
    },

    // Giriş yapan kullanıcın bilgilerini verir.
    get: function (key=false, defaultValue = null){
        return !key? {...authUser.value} : ( authUser.value[key] || defaultValue )
    },

    // Kullanıcı çıkış yaptıktan sonra locaslStorage'dan tokenları siler
    logout: function (){
      if(process.client){
          localStorage.removeItem(accessTokenKey)
          localStorage.removeItem(refreshTokenKey)
      }
      return true
    },

    // Level numarası verilen kullanıcının giriş yapmış olup olmadığını kontrol eder
    isLoggedIn: async function(level=1){
        return new Promise(async (resolve, reject) => {
            if(!authInit.value){
                let accessToken = null
                if(process.client){
                    accessToken = localStorage.getItem(accessTokenKey) || null
                }
                let response = await useUser().checkToken(accessToken)
                if(response.status && response.user){
                    authUser.value = {...response.user, accessToken}
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
            let token = localStorage.getItem(accessTokenKey) || false
            if(!token){ return {} }
            return {authentication: token}
        }else{
            return {}
        }
    }

})
