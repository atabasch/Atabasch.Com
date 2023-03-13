export default () => {
    return {

        getAll: () => {
            return $fetch('/api/panel/navigation');
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/navigation/'+pk)
        }, // getOne

        getOneWithItems: (pk) => {
            return $fetch('/api/panel/navigation/'+pk+'/items')
        }, // getOneWithItems

        getOneItem: (pk) => {
            return $fetch('/api/panel/navigation/'+pk+'/item')
        }, // getOne

        create: async (data) => {
            let body = { navigation: {...data} }
            return $fetch('/api/panel/navigation/create', {method:'POST', body: body} )
        }, // create

        update: async (data) => {
            let body = { navigation: {...data} }
            return $fetch('/api/panel/navigation/update', {method:'POST', body: body} )
        }, // update

        delete: (idOrSlug) => {
            let postData = { navigation: { navigationId: idOrSlug } }
            return $fetch('/api/panel/navigation/delete', {method: 'POST', body: postData})
        }, // delete

    } // return
} // export defaul
