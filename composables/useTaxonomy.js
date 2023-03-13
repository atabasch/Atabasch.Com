export default  () => ({
    getAll: () => {
        return $fetch('/api/panel/taxonomy')
    },

    getOne: (idOrSlug) => {
        return $fetch('/api/panel/taxonomy/'+idOrSlug)
    },

    getMulti: (idOrSlugs) => {
        return $fetch('/api/panel/taxonomy/'+idOrSlugs+'/multi')
    },

    getMultiFromJSON: async (jsonText) => {
        if(jsonText.length > 0){
            let taxSlugs = JSON.parse(jsonText).join(',')
            let response = await $fetch('/api/panel/taxonomy/'+taxSlugs+'/multi')
            if(response.status && response.taxonomies){
                return response.taxonomies
            }else{
                return []
            }
        }
        return $fetch('/api/panel/taxonomy/'+idOrSlugs+'/multi')
    },

    create: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/create', { method:'POST', body: body })
    },

    update: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/update', { method:'POST', body: body })
    },

    delete: (taxonomy) => {
        let body = {taxonomy: {...taxonomy}}
        return $fetch('/api/panel/taxonomy/delete', { method:'POST', body: body })
    },
})
