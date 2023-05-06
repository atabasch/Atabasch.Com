# Yapılacaklar
- term'e göre içerik getirme sayfasını oluştur
- Özel alanlarda çoklu resim yükleme
- referanslarda çoklu resim yüklenip lightbox ile açılacak
- referans sayfasnda diğer referanslarda açık olan referansın id numarası çıkarılacak.
- !!!! Login işleminde beni hatırlaya tıklanırsa 7 günlük bir json web token oluştur.
- Refresh token sayfası yaparak her istekte token süresini uzat.
- Referanslar için site detay sayfasını hazırla. (referans resimleri eklensin.)
- Term içerik listesi sayfasını oluştur.
- Projeler için ayrı şablon oluştur (liste)
- ♥ Blog sayfasını oluştur ve blog sayfalama sistemi oluştur.
- Arama kutusunu aktif et.
- Sayfa bulunamadı sayfasını oluştur.
- projelerde gösterilen termlerin slug'ını .env den çek
- admin sayfasında login olmadan yönlendirilirken layout görünüyor.

# Kullanılacak Kütüphaneler

- sweetalert2 - ()
- npm install pinia - state yönetimi (https://nuxt.com/modules/pinia)
- Device - Cihaz algılama (https://nuxt.com/modules/device)
- Image - görsel optim..  (https://nuxt.com/modules/image)
- Icon - 100.000 den fazla ikon (https://nuxt.com/modules/icon)
- Nuxt-Auth - (https://nuxt.com/modules/nuxt-auth)
- Sitemap - (https://nuxt.com/modules/simple-sitemap)
- Sequelize - 

# Bağlantılar
- One to One
  - User -> [hasOne] -> UserData
  - UserData -> [belongsTo] -> User
- One to Many
  - User -> [hasMany] -> Posts
  - Post -> [belongsTo] -> User
  - Taxonomy -> [hasMany] -> Terms
  - Terms -> [belongsTo] -> Taxonomy
- Many To Many
  - Term -> [hasMany] -> Posts
  - Post -> [belongsToMany] -> Terms

# Portfolio Bilgileri
- Başlık
- Hakkımda
- Fotoğraf
- İsim
- E-Posta
- Doğum Tarihi
- Memleket
- İkamet
- Öğrenim
- Download CV
- Sosyal Bağlantılar
  - Linkedin
  - Github
  - İnstagram
  - Twitter
  - Facebook
  - Youtube
- Yetenekler
  -  Yetenek adı 
  - Açıklama
  - Seviye
- Deneyimlenen Teknolojiler
  - İsim
  - Açıklama
- Hobiler
- Eğitim
  - Okul 
  - BÖlüm
  - Sene
- İş Tecrübeleri
  - Yıl
  - Şirket
  - Görev

