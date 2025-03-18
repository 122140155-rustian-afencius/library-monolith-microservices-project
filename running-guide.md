# Running the Library Management System

This guide explains how to run both the monolithic and microservices versions of the Library Management System.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4 or higher)
- [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) (optional, for running microservices with containers)
- [Git](https://git-scm.com/downloads) (for cloning the repository)

## Running the Monolithic Application

The monolithic application is a single Node.js application that handles all functionality.

1. Navigate to the monolithic application directory:

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-monolith
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Make sure MongoDB is running:

   ```bash
   # Start MongoDB (command may vary based on your installation)
   mongod
   ```

4. Create a `.env` file in the root directory with the following content:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/library-monolith
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the application:

   ```bash
   npm run dev
   ```

6. Access the application in your browser at:
   ```
   http://localhost:3000
   ```

## Running the Microservices Application

The microservices version consists of multiple services that need to be run either individually or using Docker Compose.

### Option 1: Using Docker Compose (Recommended)

1. Navigate to the microservices directory:

   ```bash
   cd d:\Web Development\pemrograman-web-lanjut\tugas\library-microservices
   ```

2. Run all services using Docker Compose:

   ```bash
   docker-compose up
   ```

   This will start all services, including MongoDB, in separate containers.

3. Access the API Gateway in your browser at:

   ```
   http://localhost:3000
   ```

4. To stop all services, press `Ctrl+C` in the terminal where Docker Compose is running, or run:
   ```bash
   docker-compose down
   ```

### Option 2: Running Services Individually

1. Make sure MongoDB is running:

   ```bash
   # Start MongoDB
   mongod
   ```

2. Set up and start each service in separate terminal windows:

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

3. Access the API Gateway in your browser at:
   ```
   http://localhost:3000
   ```

## Testing the API

You can test the API endpoints using tools like [Postman](https://www.postman.com/downloads/) or [curl](https://curl.se/).

### Example API Requests

#### User Registration

```http
POST http://localhost:3000/api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

#### User Login

```http
POST http://localhost:3000/api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Get All Books

```http
GET http://localhost:3000/api/books
```

#### Add a Book (Admin only)

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

#### Borrow a Book

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

- **MongoDB Connection Issues**: Ensure MongoDB is running and accessible at the URI specified in your .env files.
- **Port Conflicts**: If ports are already in use, you can modify the PORT variable in the .env files.
- **JWT Authentication Issues**: Make sure you're using a valid JWT token in your Authorization header for protected routes.
