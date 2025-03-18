# Library Management System - Monolith to Microservices Migration

Repository ini mendemonstrasikan migrasi sistem manajemen perpustakaan dari arsitektur monolitik ke microservices, mengikuti pola yang dijelaskan dalam "Evolutionary Patterns to Transform Your Monolith".

## Struktur Repository

Repository ini berisi dua versi aplikasi yang sama:

1. **Arsitektur Monolitik** (`library-monolith/`)
2. **Arsitektur Microservices** (`library-microservices/`)

Kedua implementasi menyediakan fungsionalitas yang sama tetapi dengan pendekatan arsitektur yang berbeda.

## Fitur

- Autentikasi dan autorisasi pengguna (pengguna biasa dan admin)
- Manajemen buku (menambah, memperbarui, mencari)
- Sistem peminjaman (meminjam buku, mengembalikan, mengelola denda)

## Migrasi Microservices

Proses migrasi mengikuti bab-bab utama dari "Evolutionary Patterns to Transform Your Monolith":

### Chapter 2: Perencanaan Migrasi

- Menganalisis kode monolitik
- Mengidentifikasi konteks terikat
- Menentukan batasan layanan
- Membuat strategi migrasi

### Chapter 3: Memisahkan Monolith

- Membuat API Gateway sebagai titik masuk
- Mengekstrak layanan berdasarkan batasan domain
- Mengimplementasikan komunikasi antar layanan

### Chapter 4: Menguraikan Database

- Implementasi pola database per layanan
- Strategi duplikasi dan denormalisasi data
- Mempertahankan konsistensi data antar layanan

Untuk perbandingan detail antara kedua pendekatan arsitektur, lihat [dokumen perbandingan](comparison.md).

## Menjalankan Aplikasi

### Versi Monolitik

```bash
cd library-monolith
npm install
npm run dev
```

### Versi Microservices

Menggunakan Docker:

```bash
cd library-microservices
docker-compose up
```

Atau menjalankan setiap layanan secara individual:

```bash
# Terminal 1: API Gateway
cd library-microservices/api-gateway
npm install
npm run dev

# Terminal 2: User Service
cd library-microservices/user-service
npm install
npm run dev

# Terminal 3: Book Service
cd library-microservices/book-service
npm install
npm run dev

# Terminal 4: Borrowing Service
cd library-microservices/borrowing-service
npm install
npm run dev
```

## Dokumentasi API

Kedua versi mengekspos endpoint API yang sama:

- **Pengguna**: Registrasi, login, manajemen profil
- **Buku**: Menjelajah, mencari, menambah, memperbarui, menghapus buku
- **Peminjaman**: Meminjam buku, mengembalikan, memeriksa riwayat peminjaman

Lihat file README di setiap folder proyek untuk dokumentasi API yang detail.

