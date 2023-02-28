export default (message='', type='success') => {
    const {$showToast} = useNuxtApp()
    $showToast(message, type)
}
