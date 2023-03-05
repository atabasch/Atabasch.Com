export default () => ({

    getAll: ()       => $fetch('/api/panel/config'),
    getOne: (key)    => $fetch('/api/panel/config/'+key),
    create: (config) => $fetch('/api/panel/config/create', { method:'POST', body: { config: {...config} } } ),
    update: (config) => $fetch('/api/panel/config/update', { method:'POST', body: { config: {...config} } } ),
    updateAll: (configs) => $fetch('/api/panel/config/update_all', { method:'POST', body: { configs: {...configs} } } ),
    delete: (config) => $fetch('/api/panel/config/delete', { method:'POST', body: { config: {...config} } } )

})
