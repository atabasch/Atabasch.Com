export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/navigation', { headers: { ...useAuth().getHeaderToken() } })
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/navigation/'+pk, { headers: { ...useAuth().getHeaderToken() } })
        }, // getOne

        getOneWithItems: (pk) => {
            return $fetch('/api/panel/navigation/'+pk+'/items', { headers: { ...useAuth().getHeaderToken() } })
        }, // getOneWithItems

        getOneItem: (pk) => {
            return $fetch('/api/panel/navigation/'+pk+'/item', { headers: { ...useAuth().getHeaderToken() } })
        }, // getOne

        create: async (data) => {
            let body = { navigation: {...data} }
            return $fetch('/api/panel/navigation/create', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() }} )
        }, // create

        update: async (data) => {
            let body = { navigation: {...data} }
            return $fetch('/api/panel/navigation/update', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() }} )
        }, // update

        delete: (idOrSlug) => {
            let postData = { navigation: { navigationId: idOrSlug } }
            return $fetch('/api/panel/navigation/delete', {method: 'POST', body: postData, headers: { ...useAuth().getHeaderToken() }})
        }, // delete

    } // return
} // export defaul
