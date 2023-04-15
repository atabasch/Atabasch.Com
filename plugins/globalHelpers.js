import Swal from "sweetalert2";

const months = [
    { name: "Ocak",     short: "Oca" },
    { name: "Şubat",    short: "Şub" },
    { name: "Mart",     short: "Mar" },
    { name: "Nisan",    short: "Nis" },
    { name: "Mayıs",    short: "May" },
    { name: "Haziran",  short: "Haz" },
    { name: "Temmuz",   short: "Tem" },
    { name: "Ağustos",  short: "Ağu" },
    { name: "Eylül",    short: "Eyl" },
    { name: "Ekim",     short: "Eki" },
    { name: "Kasım",    short: "Kas" },
    { name: "Aralık",   short: "Ara" }
];

const days = [
    { name: "Pazartesi",  short: "Pts" },
    { name: "Salı",       short: "Sal" },
    { name: "Çarşamba",   short: "Çar" },
    { name: "Perşembe",   short: "Per" },
    { name: "Cuma",       short: "Cum" },
    { name: "Cumartesi",  short: "Cts" },
    { name: "Pazar",      short: "Paz" },
];

let formatTypes = {
    date              : {hour12:false, dateStyle: 'long'},
    dateShort         : {hour12:false, dateStyle: 'short'},
    dateMedium        : {hour12:false, dateStyle: 'medium'},
    dateLong          : {hour12:false, dateStyle: 'long'},
    dateFull          : {hour12:false, dateStyle: 'full'},
    time              : {hour12:false, timeStyle: 'short'},
    timeShort         : {hour12:false, timeStyle: 'short'},
    timeMedium        : {hour12:false, timeStyle: 'medium'},
    timeLong          : {hour12:false, timeStyle: 'long'},
    timeFull          : {hour12:false, timeStyle: 'full'},
    dateTime          : {hour12:false, dateStyle: 'long',   timeStyle: 'short'},
    dateTimeShort     : {hour12:false, dateStyle: 'short',  timeStyle: 'short'},
    dateTimeMedium    : {hour12:false, dateStyle: 'medium', timeStyle: 'short'},
    dateTimeLong      : {hour12:false, dateStyle: 'long',   timeStyle: 'short'},
    dateTimeFull      : {hour12:false, dateStyle: 'full',   timeStyle: 'short'},
}


export default defineNuxtPlugin(() => {

    return {

        provide: {
            getDateFormat: function(date, format, local='tr-TR'){
                let dateObject = new Date(date);
                return dateObject.toLocaleString(local, formatTypes[format]);
            },

            getUrl: {
                post: (slug)    => ( `/${slug}` ),

                page: (slug)    => ( `/sayfa/${slug}` ),

                category: (slug) => ( `/kategori/${slug}` ),

                user: (slug)    => ( `/yazar/${slug}` ),

                panel: (more)   => ( '/aswpanel'+more ),

                login: () => ( '/login?to=/aswpanel' )


            }, // getUrl

            getYoutubeId(urlOrId=''){
                if(urlOrId.match(/v=|vi=|\.be\/|\/embed\//gi)){
                    let id = urlOrId.match(/(v=|vi=|\.be\/|\/embed\/)([a-zA-Z0-9-_=]+)/gi);
                    return !id? null : id[0].replaceAll(/v=|vi=|\.be\/|\/embed\//gi, '');
                }else{
                    return urlOrId;
                }
            }, // getYoutubeId

            showToast(message, type='success'){
                if(process.client){
                    Swal.fire({title:message, icon:type, toast:true, position:'top-end', timer:3000, showConfirmButton:false, timerProgressBar: true})
                }
            }, //toast

            showAlert({title='', body='', type='warning', confirmText='Evet', cancelText='Vazgeç', options={}}, confirmHandler=()=>null, cancelHandler=()=>null){
                Swal.fire({
                    icon: type,
                    title: title,
                    html:   body,
                    showCancelButton: true,
                    cancelButtonText: cancelText,
                    showConfirmButton: true,
                    confirmButtonText: confirmText,
                    ...options
                }).then( result => {
                    if(result.isConfirmed){
                        confirmHandler(result)
                    }else{
                        cancelHandler(result)
                    }
                } )
            }, //showAlert
        }

    }

})
