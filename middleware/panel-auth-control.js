import useAuth from "~/composables/useAuth";
import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {

    useAuth()
        .isLoggedIn(3)
        .then((result) => {
            if(!result){
                location.href = ('/login?to='+from.fullPath)
                return false
            }
        })

})
