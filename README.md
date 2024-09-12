# Attendance Management System

## Overview
This is an **Attendance Management System API** built with **Node.js**, **Prisma**, and **Express**. The API provides endpoints for user authentication and authorization, as well as CRUD operations for managing student and teacher attendance.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database interactions.
- **PostgreSQL**: Database system.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for handling JSON Web Tokens (JWT) for authentication.
- **dotenv**: Module for environment variable management.
- **express-validator**: Middleware for validating request data.
- **uuid**: Library for generating unique identifiers.

---

## Setup and Installation

### 1. Clone the Repository
`bash
git clone https://github.com/soorajydv/attendance
### 2. Navigate to the Project Directory and Run
```bash
-cd attendance-management-system

-npm install

-DATABASE_URL=your_database_url
-JWT_SECRET=your_jwt_secret

-npx prisma migrate dev

-npm start
