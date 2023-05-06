export default () => {
    return {

        getAll: (type) => {
            return $fetch('/api/panel/post?type=' + type, { headers: { ...useAuth().getHeaderToken() } });
        }, // getALL

        getOne: (pk) => {
            return $fetch('/api/panel/post/'+pk, { headers: { ...useAuth().getHeaderToken() } })
        }, // getALL

        create: async (data) => {
            let body = { post: {...data} }
            return $fetch('/api/panel/post/create', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // create

        update: async (data) => {
            let body = { post: {...data} }
            return $fetch('/api/panel/post/update', {method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } } )
        }, // update

        delete: (data) => {
            let postData = { post: data  }
            return $fetch('/api/panel/post/delete', {method: 'POST', body: postData, headers: { ...useAuth().getHeaderToken() } } )
        }, // delete

        updatePostViews: async (idOrSlug) => {
            let body = { idOrSlug: idOrSlug  }
            return $fetch('/api/site/post_views', {method:'POST', body: body } )
        }, // create

    } // return
} // export defaul
