# Video Downloader - Gelecek Planları ve TODO

`yt-dlp` indirme motorunu stabilize etmek için yapılan geliştirmelerden sonra, daha ileri seviye (hardened) bir yapı için yapılması gerekenler:

- [ ] **Proxy Entegrasyonu**: VPS IP adresleri YouTube tarafından sıkça engellendiği için (429 Too Many Requests), rotasyonlu bir proxy desteği eklenmeli.
- [ ] **Cookie Desteği**: Giriş gerektiren veya yaş kısıtlamalı videolar için tarayıcıdan dışa aktarılan `cookies.txt` dosyasını kullanma altyapısı kurulmalı.
- [ ] **Worker Queue**: Uzun süren indirme işlemleri ana sunucuyu bloklamaması için Redis + BullMQ gibi bir kuyruk sistemine taşınmalı.
- [ ] **Dosya Boyutu Kontrolü**: İndirme başlamadan önce `yt-dlp --get-size` ile kontrol yapılıp sunucu disk alanını aşacak dosyalar engellenmeli.
- [ ] **Format Seçici**: Kullanıcının 4K/1080p/720p gibi kalite seçeneklerini seçebileceği bir UI geliştirilmeli.
- [ ] **Hız Limiti**: Tek bir kullanıcının tüm bant genişliğini tüketmemesi için indirme başına hız limiti eklenmeli.
