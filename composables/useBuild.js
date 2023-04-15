export default (configs, user) => {

    return $fetch('/api/setup/build', {
        method: 'POST',
        body: {
            configs: configs,
            user: user
        }
    })

}
