export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/field', {
                headers: { ...useAuth().getHeaderToken() }
            });
        }, // getALL

        getAllWithPostType: (postTypeId) => {
            return $fetch('/api/panel/field?type='+postTypeId, {
                headers: { ...useAuth().getHeaderToken() }
            });
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/field/'+pk, {
                headers: { ...useAuth().getHeaderToken() }
            })
        }, // getALL

        create: async (data) => {
            let body = { field: {...data} }
            return $fetch('/api/panel/field/create', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // create

        update: async (data) => {
            let body = { field: {...data} }
            return $fetch('/api/panel/field/update', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // update

        delete: (idOrSlug) => {
            let postData = { field: { fieldId: idOrSlug } }
            return $fetch('/api/panel/field/delete', {method: 'POST', body: postData, headers: { ...useAuth().getHeaderToken() } })
        }, // delete

    } // return
} // export defaul
