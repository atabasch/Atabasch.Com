export default (data={title:'', body:'', type:'warning', confirmText:'Evet', cancelText:'Vazgeç', options:{}}, confirmHandler=()=>null, cancelHandler=()=>null) => {
    let {$showAlert} = useNuxtApp()
    $showAlert(data, confirmHandler, cancelHandler )
}
