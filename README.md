# Library Management System - Monolith to Microservices Migration

This repository demonstrates the migration of a library management system from a monolithic architecture to microservices, following the patterns described in "Evolutionary Patterns to Transform Your Monolith".

## Repository Structure

This repository contains two versions of the same application:

1. **Monolithic Architecture** (`library-monolith/`)
2. **Microservices Architecture** (`library-microservices/`)

Both implementations provide the same functionality but with different architectural approaches.

## Features

- User authentication and authorization (regular users and admins)
- Book management (adding, updating, searching)
- Borrowing system (borrowing books, returning, managing fines)

## Microservices Migration

The migration process followed these key chapters from "Evolutionary Patterns to Transform Your Monolith":

### Chapter 2: Planning a Migration

- Analyzing the monolithic codebase
- Identifying bounded contexts
- Defining service boundaries
- Creating migration strategy

### Chapter 3: Splitting The Monolith

- Creating API Gateway as entry point
- Extracting services based on domain boundaries
- Implementing service-to-service communication

### Chapter 4: Decomposing The Database

- Database per service pattern implementation
- Data duplication and denormalization strategies
- Maintaining data consistency across services

For detailed comparison between the two architectural approaches, see the [comparison document](comparison.md).

## Running the Applications

### Monolithic Version

```bash
cd library-monolith
npm install
npm run dev
```

### Microservices Version

Using Docker:

```bash
cd library-microservices
docker-compose up
```

Or running each service individually:

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

## API Documentation

Both versions expose the same API endpoints:

- **Users**: Registration, login, profile management
- **Books**: Browse, search, add, update, delete books
- **Borrowings**: Borrow books, return, check borrowing history

See the README files in each project folder for detailed API documentation.
