import useAuth from "~/composables/useAuth";
import {defineNuxtRouteMiddleware, navigateTo, useCookie} from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {

    // burada token alıp gönderebilirsin.
    const cookieAccessToken = await useCookie('access_token')
    const cookieRefreshToken = await useCookie('refresh_token')

    if(to.meta.layout === 'admin'){
        useAuth().isLoggedIn(3).then((result) => {
            if(!result){
                return navigateTo('/login?to='+from.fullPath)

            }
        })
    }

})
