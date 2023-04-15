export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/type', { headers: { ...useAuth().getHeaderToken() } });
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/type/'+pk, { headers: { ...useAuth().getHeaderToken() } })
        }, // getALL

        create: async (data) => {
            let body = { type: {...data} }
            return $fetch('/api/panel/type/create', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // create

        update: async (data) => {
            let body = { type: {...data} }
            return $fetch('/api/panel/type/update', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // update

        delete: (idOrSlud) => {
            let postData = { type: { postTypeId: idOrSlud } }
            return $fetch('/api/panel/type/delete', {method: 'POST', body: postData, headers: { ...useAuth().getHeaderToken() } } )
        }, // delete

    } // return
} // export defaul
