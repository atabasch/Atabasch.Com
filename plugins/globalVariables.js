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
            }


        }, //provide
    } // return
})
