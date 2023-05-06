import useAuth from "~/composables/useAuth";
import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if(to.meta.layout === 'admin'){
        useAuth().isLoggedIn(3).then((result) => {
            if(!result){
                return navigateTo('/login?to='+from.fullPath)
                // location.href = ('/login?to='+from.fullPath)
                // return false
            }
        })
    }

})
