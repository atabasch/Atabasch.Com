export default defineNuxtPlugin(() => {
    return {
        provide: {


            userLevels: {
                '-1' : { value: -1, label: 'Yasaklı', color: 'dark', icon:'bi bi-person-fill-slash' },
                '0' : { value: 0, label: 'Onaysız', color: 'secondary', icon:'bi bi-person-fill-x' },
                '1' : { value: 1, label: 'Kullanıcı', color: 'primary', icon:'bi bi-person-fill' },
                '2' : { value: 2, label: 'Yazar', color: 'warning', icon:'bi bi-person-fill-add' },
                '3' : { value: 3, label: 'Yetkili', color: 'success', icon:'bi bi-person-fill-up' },
                '4' : { value: 4, label: 'Yönetici', color: 'danger', icon:'bi bi-person-fill-check' },
            },

            userGenders: {
                'none': { value: 'none', label: 'Belirtilmedi' },
                'female': { value: 'female', label: 'Kadın' },
                'male': { value: 'male', label: 'Erkek' },
            },

            contactSubjects: {
                'help'      : {value: '', label: 'Yardım - Soru', color: 'warning'},
                'work'      : {value: '', label: 'İş - Teklif', color: 'success'},
                'suggest'   : {value: '', label: 'Öneri - Şikayet', color: 'danger'},
                'other'     : {value: '', label: 'Diğer', color: 'info'},
            }, // contactSubjects

            postStatuses: [
                {value:'publish', label:'Yayımda'},
                {value:'draft', label:'Taslak'},
                {value:'trash', label:'Çöp Kutusunda'},
                {value:'waiting', label:'Bekliyor'},
            ],

            customTypes: {
                'text': { label: 'Kısa Metin', componentName: 'input'},
                'number': { label: 'Sayı', componentName: 'input'},
                'email': { label: 'E-Posta', componentName: 'input'},
                'tel': { label: 'Telefon Numarası', componentName: 'input'},
                'url': { label: 'URL (Uzak Bağlantı Adresi)', componentName: 'input'},
                'password': { label: 'Şifre', componentName: 'input'},
                'textarea': { label: 'Çoklu Açıklama Metni ', componentName: 'textarea'},
                'date': { label: 'Tarih', componentName: 'input'},
                'time': { label: 'Saat', componentName: 'input'},
                'checkbox': { label: 'Checkbox (Seçim Kutusu)', componentName: 'checkbox'},
                'switch': { label: 'Switch (Aç/Kapat Seçim Butonu)', componentName: 'switch'},
                'radio': { label: 'Radio (Tekli Seçim Kutusu)', componentName: 'radio'},
                'select': { label: 'Select (Açılır Liste) ', componentName: 'select'},
                'image': { label: 'Görsel', componentName: 'image'},
                'image_multiple': { label: 'Görsel (Çoklu)', componentName: 'image_multiple'},
            }


        }, //provide
    } // return
})
