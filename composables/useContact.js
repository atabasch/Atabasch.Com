export default () => ({

    getAll: ()        => $fetch('/api/panel/contact', { headers: { ...useAuth().getHeaderToken() } }),

    getOne: (id)      => $fetch('/api/panel/contact/'+id, { headers: { ...useAuth().getHeaderToken() } }),

    create: (contact) => $fetch('/api/contact', { method:'POST', body: { contact: {...contact} }, headers: { ...useAuth().getHeaderToken() } } ),

    update: (contact) => $fetch('/api/panel/contact/update', { method:'POST', body: { contact: {...contact} }, headers: { ...useAuth().getHeaderToken() } } ),

    delete: (contact) => $fetch('/api/panel/contact/delete', { method:'POST', body: { contact: {...contact} }, headers: { ...useAuth().getHeaderToken() } } ),


})
