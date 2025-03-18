# Library Management System - Monolithic Architecture

This project demonstrates a library management system using a monolithic architecture. All features and components are implemented within a single application.

## Features

- User authentication (register, login)
- Book management (add, update, delete, search)
- Borrowing system (borrow, return, check history)

## Architecture

This application follows a traditional monolithic architecture where all components are tightly coupled within a single Node.js application:

- Database: MongoDB (single database)
- Backend: Express.js
- Authentication: JWT-based
- Models: User, Book, Borrowing

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Create a .env file with the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/library-monolith
JWT_SECRET=your_jwt_secret_key
```

4. Start MongoDB:

```
mongod
```

5. Start the application:

```
npm run dev
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
