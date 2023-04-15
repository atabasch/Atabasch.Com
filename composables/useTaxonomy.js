export default  () => ({
    getAll: () => {
        return $fetch('/api/panel/taxonomy', { headers: { ...useAuth().getHeaderToken() } })
    },

    getOne: (idOrSlug) => {
        return $fetch('/api/panel/taxonomy/'+idOrSlug, { headers: { ...useAuth().getHeaderToken() } })
    },

    getMulti: (idOrSlugs) => {
        return $fetch('/api/panel/taxonomy/'+idOrSlugs+'/multi', { headers: { ...useAuth().getHeaderToken() } })
    },

    getMultiFromJSON: async (jsonText) => {
        if(jsonText.length > 0){
            let taxSlugs = JSON.parse(jsonText).join(',')
            let response = await $fetch('/api/panel/taxonomy/'+taxSlugs+'/multi', { headers: { ...useAuth().getHeaderToken() } })
            if(response.status && response.taxonomies){
                return response.taxonomies
            }else{
                return []
            }
        }
        return $fetch('/api/panel/taxonomy/'+idOrSlugs+'/multi', { headers: { ...useAuth().getHeaderToken() } })
    },

    create: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/create', { method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } })
    },

    update: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/update', { method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } })
    },

    delete: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/delete', { method:'POST', body: body, headers: { ...useAuth().getHeaderToken() } })
    },


    term: {

        create: (term) => $fetch('/api/panel/term/create', { method:'POST', body: {term}, headers: { ...useAuth().getHeaderToken() } }),
        update: (term) => $fetch('/api/panel/term/update', { method:'POST', body: {term}, headers: { ...useAuth().getHeaderToken() } }),
        delete: (term) => $fetch('/api/panel/term/delete', { method:'POST', body: {term}, headers: { ...useAuth().getHeaderToken() } }),

    }
})
