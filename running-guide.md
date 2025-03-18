# Running the Library Management System

Panduan ini menjelaskan cara menjalankan versi monolitik dan microservices dari Sistem Manajemen Perpustakaan.

## Prerequisites

Sebelum memulai, pastikan Anda telah menginstal hal-hal berikut:

- [Node.js](https://nodejs.org/) (v14 atau lebih tinggi)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4 atau lebih tinggi)
- [Docker](https://www.docker.com/products/docker-desktop/) dan [Docker Compose](https://docs.docker.com/compose/install/) (opsional, untuk menjalankan microservices dengan container)
- [Git](https://git-scm.com/downloads) (untuk mengkloning repositori)

## Running the Monolithic Application

Aplikasi monolitik adalah aplikasi Node.js tunggal yang menangani semua fungsionalitas.

1. Pindah ke direktori aplikasi monolitik:

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-monolith
   ```

2. Instal dependensi:

   ```bash
   npm install
   ```

3. Pastikan MongoDB berjalan:

   ```bash
   # Mulai MongoDB (perintah mungkin berbeda berdasarkan instalasi Anda)
   mongod
   ```

4. Buat file `.env` di direktori root dengan konten berikut:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/library-monolith
   JWT_SECRET=your_jwt_secret_key
   ```

5. Mulai aplikasi:

   ```bash
   npm run dev
   ```

6. Akses aplikasi di browser Anda di:
   ```
   http://localhost:3000
   ```

## Running the Microservices Application

Versi microservices terdiri dari beberapa layanan yang perlu dijalankan secara individual atau menggunakan Docker Compose.

### Option 1: Menggunakan Docker Compose (Direkomendasikan)

1. Pindah ke direktori microservices:

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices
   ```

2. Jalankan semua layanan menggunakan Docker Compose:

   ```bash
   docker-compose up
   ```

   Ini akan memulai semua layanan, termasuk MongoDB, dalam container terpisah.

3. Akses API Gateway di browser Anda di:

   ```
   http://localhost:3000
   ```

4. Untuk menghentikan semua layanan, tekan `Ctrl+C` di terminal tempat Docker Compose berjalan, atau jalankan:
   ```bash
   docker-compose down
   ```

### Option 2: Menjalankan Layanan Secara Individual

1. Pastikan MongoDB berjalan:

   ```bash
   # Mulai MongoDB
   mongod
   ```

2. Siapkan dan mulai setiap layanan di jendela terminal terpisah:

   **Terminal 1 - User Service:**

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices\user-service
   npm install
   npm run dev
   ```

   **Terminal 2 - Book Service:**

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices\book-service
   npm install
   npm run dev
   ```

   **Terminal 3 - Borrowing Service:**

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices\borrowing-service
   npm install
   npm run dev
   ```

   **Terminal 4 - API Gateway:**

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices\api-gateway
   npm install
   npm run dev
   ```

3. Akses API Gateway di browser Anda di:
   ```
   http://localhost:3000
   ```

## Testing the API

Anda dapat menguji endpoint API menggunakan alat seperti [Postman](https://www.postman.com/downloads/) atau [curl](https://curl.se/).

### Contoh Permintaan API

#### Pendaftaran Pengguna

```http
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login Pengguna

```http
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Mendapatkan Semua Buku

```http
GET http://localhost:3000/api/books
```

#### Menambah Buku (Hanya Admin)

```http
POST http://localhost:3000/api/books
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Test Book",
  "author": "Test Author",
  "isbn": "1234567890",
  "genre": "Fiction",
  "publishedDate": "2023-01-01",
  "quantity": 5
}
```

#### Meminjam Buku

```http
POST http://localhost:3000/api/borrowings/borrow
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "bookId": "<book_id>",
  "dueDate": "2023-12-31"
}
```

## Troubleshooting

- **Masalah Koneksi MongoDB**: Pastikan MongoDB berjalan dan dapat diakses pada URI yang ditentukan dalam file .env Anda.
- **Konflik Port**: Jika port sudah digunakan, Anda dapat mengubah variabel PORT di file .env.
- **Masalah Autentikasi JWT**: Pastikan Anda menggunakan token JWT yang valid di header Authorization untuk rute yang dilindungi.

