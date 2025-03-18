# Monolith vs Microservices Comparison

Dokumen ini membandingkan arsitektur monolitik dan microservices untuk Sistem Manajemen Perpustakaan.

## Architecture Comparison

### Monolithic Architecture

- **Codebase**: Basis kode tunggal yang berisi semua fitur
- **Deployment**: Diterapkan sebagai satu kesatuan
- **Database**: Basis data tunggal yang dibagi
- **Scaling**: Seluruh aplikasi harus diskalakan bersama
- **Development**: Sederhana untuk dikembangkan dan diuji pada awalnya
- **Communication**: Panggilan fungsi dalam aplikasi

### Microservices Architecture

- **Codebase**: Beberapa basis kode kecil, masing-masing untuk domain tertentu
- **Deployment**: Setiap layanan dapat diterapkan secara independen
- **Database**: Basis data terpisah untuk setiap layanan (pola database per layanan)
- **Scaling**: Layanan dapat diskalakan secara independen berdasarkan permintaan
- **Development**: Pengaturan awal lebih kompleks, tetapi lebih mudah dikelola seiring waktu
- **Communication**: Panggilan API HTTP/REST antar layanan

## Migration Process

Migrasi dari arsitektur monolitik ke microservices mengikuti langkah-langkah berikut:

### 1. Perencanaan Migrasi (Bab 2)

- Mengidentifikasi konteks terikat (Pengguna, Buku, Peminjaman)
- Memetakan ketergantungan layanan
- Merencanakan gateway API sebagai titik masuk

### 2. Memecah Monolith (Bab 3)

- Membuat layanan independen berdasarkan batas domain
- Mengimplementasikan gateway API untuk mengarahkan permintaan
- Membangun komunikasi antar layanan

### 3. Menguraikan Database (Bab 4)

- Membuat basis data terpisah untuk setiap layanan
- Menggunakan pola database per layanan
- Mengimplementasikan duplikasi data jika diperlukan untuk kinerja (denormalisasi)

## Code Structure Changes

### Sebelum (Monolitik)

```
library-monolith/
├── controllers/
│   ├── userController.js
│   ├── bookController.js
│   └── borrowingController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrowing.js
├── routes/
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   └── borrowingRoutes.js
└── app.js
```

### Setelah (Microservices)

```
library-microservices/
├── api-gateway/
│   └── app.js
├── user-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── book-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
└── borrowing-service/
    ├── controllers/
    ├── models/
    ├── routes/
    └── app.js
```

## Benefits and Drawbacks

### Keuntungan Microservices

1. **Penskalaan Independen**: Setiap layanan dapat diskalakan berdasarkan kebutuhan spesifiknya
2. **Fleksibilitas Teknologi**: Layanan berbeda dapat menggunakan teknologi yang berbeda
3. **Otonomi Tim**: Tim dapat bekerja secara independen pada layanan yang berbeda
4. **Isolasi Kesalahan**: Kegagalan pada satu layanan tidak selalu mempengaruhi yang lain
5. **Fleksibilitas Deployment**: Layanan dapat diperbarui secara independen

### Kekurangan Microservices

1. **Peningkatan Kompleksitas**: Lebih banyak bagian yang harus dikelola
2. **Latensi Jaringan**: Komunikasi antar layanan menambah overhead
3. **Konsistensi Data**: Mempertahankan konsistensi antar layanan menjadi tantangan
4. **Pengaturan Pengembangan**: Lingkungan pengembangan lokal lebih kompleks
5. **Pengujian**: Pengujian end-to-end lebih sulit

## Kesimpulan

Migrasi dari arsitektur monolitik ke microservices menunjukkan baik keuntungan maupun tantangan. Sementara pendekatan microservices menyediakan skalabilitas dan pemeliharaan yang lebih baik untuk aplikasi yang lebih besar, namun membawa peningkatan kompleksitas dan overhead operasional.

Untuk sistem perpustakaan ini, pendekatan microservices khususnya menguntungkan dalam:

1. Menskalakan layanan buku secara independen selama waktu pencarian puncak
2. Memungkinkan tim terpisah untuk bekerja pada fitur manajemen pengguna dan peminjaman
3. Memperbarui aturan peminjaman tanpa mempengaruhi bagian sistem lainnya

Namun, untuk aplikasi atau tim yang lebih kecil, pendekatan monolitik mungkin masih lebih praktis karena kesederhanaan dan overhead operasional yang lebih rendah.

