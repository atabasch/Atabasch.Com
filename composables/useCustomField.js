export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/field');
        }, // getALL

        getAllWithPostType: (postTypeId) => {
            return $fetch('/api/panel/field?type='+postTypeId);
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/field/'+pk)
        }, // getALL

        create: async (data) => {
            let body = { field: {...data} }
            return $fetch('/api/panel/field/create', {method:'POST', body: body} )
        }, // create

        update: async (data) => {
            let body = { field: {...data} }
            return $fetch('/api/panel/field/update', {method:'POST', body: body} )
        }, // update

        delete: (idOrSlug) => {
            let postData = { field: { fieldId: idOrSlug } }
            return $fetch('/api/panel/field/delete', {method: 'POST', body: postData})
        }, // delete

    } // return
} // export defaul
