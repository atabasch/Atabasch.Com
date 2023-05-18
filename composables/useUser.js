import useAuth from "~/composables/useAuth";

export default () => ({


    getAll: () => $fetch('/api/panel/user?include=data', { headers: { ...useAuth().getHeaderToken() } }),

    getAllForSelectList: () => $fetch('/api/panel/user?fields=userId,userUsername&level=1,2,3,4', { headers: { ...useAuth().getHeaderToken() } }),

    getOne: (pkOrUsername) => $fetch('/api/panel/user/'+pkOrUsername, { headers: { ...useAuth().getHeaderToken() } }),

    create: (user) => $fetch('/api/panel/user/create', { method:'POST', body: { user }, headers: { ...useAuth().getHeaderToken() } }),

    update: (user) => $fetch('/api/panel/user/update' , {
        method: 'POST',
        body: { user: user },
        headers: { ...useAuth().getHeaderToken() }
    }),

    delete: (user, newAuthorId) => $fetch('/api/panel/user/delete' , {
        method: "POST",
        body: { user: user, authorId: newAuthorId },
        headers: { ...useAuth().getHeaderToken() }
    }),

    login:      (user) => $fetch('/api/user/login', { method:'POST', body: { user: user }, headers: { ...useAuth().getHeaderToken() } }),
    checkToken:      async (accessToken) => await $fetch('/api/user/check-token', { method:'POST', body: { accessToken } }),
    logout:     async () => {
       return await $fetch('/api/user/logout')
    }


})
