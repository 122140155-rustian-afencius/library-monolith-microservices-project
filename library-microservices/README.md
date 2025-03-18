# Library Management System - Microservices Architecture

Proyek ini mendemonstrasikan sistem manajemen perpustakaan menggunakan arsitektur microservices. Sistem ini dibagi menjadi beberapa layanan yang bekerja sama untuk menyediakan fungsionalitas yang sama seperti versi monolitik.

## Layanan

1. **API Gateway** - Titik masuk untuk semua permintaan klien, menangani routing ke layanan yang sesuai
2. **User Service** - Mengelola autentikasi dan profil pengguna
3. **Book Service** - Mengelola inventaris buku
4. **Borrowing Service** - Mengelola peminjaman dan pengembalian buku

## Arsitektur

```
Client → API Gateway → User/Book/Borrowing Services → MongoDB (basis data terpisah)
```

## Memulai

### Prasyarat

- Node.js
- MongoDB
- Docker (opsional)

### Menjalankan Aplikasi

#### Tanpa Docker:

1. Instal dependensi untuk setiap layanan:

```
cd api-gateway && npm install
cd ../user-service && npm install
cd ../book-service && npm install
cd ../borrowing-service && npm install
```

2. Jalankan MongoDB:

```
mongod
```

3. Jalankan setiap layanan (di terminal terpisah):

```
cd api-gateway && npm run dev
cd user-service && npm run dev
cd book-service && npm run dev
cd borrowing-service && npm run dev
```

#### Dengan Docker:

```
docker-compose up
```

## Endpoint API

### Pengguna

- POST /api/users/register - Mendaftarkan pengguna baru
- POST /api/users/login - Login pengguna
- GET /api/users/me - Mendapatkan profil pengguna saat ini

### Buku

- GET /api/books - Mendapatkan semua buku
- GET /api/books/:id - Mendapatkan buku berdasarkan ID
- POST /api/books - Menambahkan buku baru (khusus admin)
- PUT /api/books/:id - Memperbarui buku (khusus admin)
- DELETE /api/books/:id - Menghapus buku (khusus admin)

### Peminjaman

- POST /api/borrowings/borrow - Meminjam buku
- PUT /api/borrowings/return/:borrowingId - Mengembalikan buku
- GET /api/borrowings/me - Mendapatkan daftar peminjaman pengguna saat ini
- GET /api/borrowings - Mendapatkan semua peminjaman (khusus admin)

