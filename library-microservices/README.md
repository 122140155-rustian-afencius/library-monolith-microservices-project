# Library Management System - Microservices Architecture

This project demonstrates a library management system using microservices architecture. It is divided into multiple services that work together to provide the same functionality as the monolithic version.

## Services

1. **API Gateway** - Entry point for all client requests, handles routing to appropriate services
2. **User Service** - Manages user authentication and profiles
3. **Book Service** - Manages book inventory
4. **Borrowing Service** - Manages book borrowing and returning

## Architecture

```
Client → API Gateway → User/Book/Borrowing Services → MongoDB (separate databases)
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker (optional)

### Running the Application

#### Without Docker:

1. Install dependencies for each service:

```
cd api-gateway && npm install
cd ../user-service && npm install
cd ../book-service && npm install
cd ../borrowing-service && npm install
```

2. Start MongoDB:

```
mongod
```

3. Start each service (in separate terminals):

```
cd api-gateway && npm run dev
cd user-service && npm run dev
cd book-service && npm run dev
cd borrowing-service && npm run dev
```

#### With Docker:

```
docker-compose up
```

## API Endpoints

### Users

- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/me - Get current user profile

### Books

- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Add a new book (admin only)
- PUT /api/books/:id - Update a book (admin only)
- DELETE /api/books/:id - Delete a book (admin only)

### Borrowings

- POST /api/borrowings/borrow - Borrow a book
- PUT /api/borrowings/return/:borrowingId - Return a book
- GET /api/borrowings/me - Get current user's borrowings
- GET /api/borrowings - Get all borrowings (admin only)
