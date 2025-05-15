# Türkiye Deprem Verileri Uygulaması

Bu uygulama, Türkiye'deki son depremleri gerçek zamanlı olarak görüntüleyen bir web uygulamasıdır. [Cursor](https://cursor.sh/) IDE kullanılarak geliştirilmiştir.

## Özellikler

- Kandilli Rasathanesi API'si üzerinden canlı deprem verilerini gösterir
- Her deprem için konum, büyüklük ve derinlik bilgilerini görüntüler
- Google Maps entegrasyonu ile deprem konumlarını haritada gösterir
- Otomatik veri yenileme (60 saniyede bir)
- Modern ve responsive tasarım
- Karanlık mod desteği

## Kullanılan Teknolojiler

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Stil kütüphanesi
- [Axios](https://axios-http.com/) - HTTP istekleri için
- [Kandilli Rasathanesi API](https://api.orhanaydogdu.com.tr/deprem/kandilli/live) - Deprem verileri için

## Başlangıç

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Depoyu klonlayın
git clone [repo-url]

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Geliştirme Ortamı

Bu proje [Cursor](https://cursor.sh/) IDE kullanılarak geliştirilmiştir. Cursor, yapay zeka destekli kod tamamlama ve önerileri ile geliştirme sürecini hızlandıran modern bir IDE'dir.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Teşekkür

- Deprem verilerini sağlayan Kandilli Rasathanesi'ne
- API'yi geliştiren [Orhan Aydoğdu](https://api.orhanaydogdu.com.tr/)'ya
- Modern ve verimli geliştirme ortamı sağlayan Cursor ekibine 