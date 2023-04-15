import useAuth from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if(to.meta.layout === 'admin'){
        useAuth().isLoggedIn(3).then(result => {
          if(!result){
             location.href = ('/login?to='+from.fullPath)
              return false
          }
        })
    }

})
