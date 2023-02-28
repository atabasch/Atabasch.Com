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
