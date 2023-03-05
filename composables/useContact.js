export default () => ({

    getAll: ()        => $fetch('/api/panel/contact'),
    getOne: (id)      => $fetch('/api/panel/contact/'+id),
    create: (contact) => $fetch('/api/contact', { method:'POST', body: { contact: {...contact} } } ),
    update: (contact) => $fetch('/api/panel/contact/update', { method:'POST', body: { contact: {...contact} } } ),
    delete: (contact) => $fetch('/api/panel/contact/delete', { method:'POST', body: { contact: {...contact} } } )

})
