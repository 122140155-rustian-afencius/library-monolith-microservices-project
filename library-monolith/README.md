# Library Management System - Monolithic Architecture

Proyek ini mendemonstrasikan sistem manajemen perpustakaan menggunakan arsitektur monolitik. Semua fitur dan komponen diimplementasikan dalam satu aplikasi.

## Fitur

- Autentikasi pengguna (registrasi, login)
- Manajemen buku (tambah, perbarui, hapus, cari)
- Sistem peminjaman (pinjam, kembalikan, cek riwayat)

## Arsitektur

Aplikasi ini mengikuti arsitektur monolitik tradisional dimana semua komponen terhubung erat dalam satu aplikasi Node.js:

- Database: MongoDB (database tunggal)
- Backend: Express.js
- Autentikasi: Berbasis JWT
- Model: User, Book, Borrowing

## Memulai

### Prasyarat

- Node.js
- MongoDB

### Instalasi

1. Klon repositori
2. Instal dependensi:

```
npm install
```

3. Buat file .env dengan isi berikut:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/library-monolith
JWT_SECRET=your_jwt_secret_key
```

4. Jalankan MongoDB:

```
mongod
```

5. Jalankan aplikasi:

```
npm run dev
```

## Endpoint API

### Pengguna

- POST /api/users/register - Registrasi pengguna baru
- POST /api/users/login - Login pengguna
- GET /api/users/me - Dapatkan profil pengguna saat ini

### Buku

- GET /api/books - Dapatkan semua buku
- GET /api/books/:id - Dapatkan buku berdasarkan ID
- POST /api/books - Tambah buku baru (khusus admin)
- PUT /api/books/:id - Perbarui buku (khusus admin)
- DELETE /api/books/:id - Hapus buku (khusus admin)

### Peminjaman

- POST /api/borrowings/borrow - Pinjam buku
- PUT /api/borrowings/return/:borrowingId - Kembalikan buku
- GET /api/borrowings/me - Dapatkan peminjaman pengguna saat ini
- GET /api/borrowings - Dapatkan semua peminjaman (khusus admin)

