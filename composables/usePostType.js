export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/type');
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/type/'+pk)
        }, // getALL

        create: async (data) => {
            let body = { type: {...data} }
            return $fetch('/api/panel/type/create', {method:'POST', body: body} )
        }, // create

        update: async (data) => {
            let body = { type: {...data} }
            return $fetch('/api/panel/type/update', {method:'POST', body: body} )
        }, // update

        delete: (idOrSlud) => {
            let postData = { type: { postTypeId: idOrSlud } }
            return $fetch('/api/panel/type/delete', {method: 'POST', body: postData})
        }, // delete

    } // return
} // export defaul
