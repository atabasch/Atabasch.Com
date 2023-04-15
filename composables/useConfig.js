export default () => ({

    getAll: ()       => $fetch('/api/panel/config', {
        headers: { ...useAuth().getHeaderToken() }
    }),

    getOne: (key)    => $fetch('/api/panel/config/'+key, {  headers: { ...useAuth().getHeaderToken() } }),

    create: (config) => $fetch('/api/panel/config/create', { method:'POST', body: { config: {...config} }, headers: { ...useAuth().getHeaderToken() } } ),

    update: (config) => $fetch('/api/panel/config/update', { method:'POST', body: { config: {...config} }, headers: { ...useAuth().getHeaderToken() } } ),

    updateAll: (configs) => $fetch('/api/panel/config/update_all', { method:'POST', body: { configs: {...configs} }, headers: { ...useAuth().getHeaderToken() } } ),

    delete: (config) => $fetch('/api/panel/config/delete', { method:'POST', body: { config: {...config} }, headers: { ...useAuth().getHeaderToken() } } )

})
