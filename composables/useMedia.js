export default () => ({

    getAll: async () => {
        return $fetch('/api/panel/media', {
            method: 'GET',
            headers: { ...useAuth().getHeaderToken() },
        })
    }

})
