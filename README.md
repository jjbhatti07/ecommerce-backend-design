# Ecommerce Backend Design

A full-stack eCommerce web application built for the Developershub Backend Development Internship.

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing

## Features

- Dynamic product listing with real-time data from MongoDB
- Product details page with full information
- Server-side search by product name or category
- Pagination for product listings
- User authentication (Login/Signup) with JWT
- Admin-only protected routes for adding products
- Responsive design for desktop and mobile
- Input validation and error handling
- Rate limiting on authentication routes

## Project Structure
ecommerce-backend-design/

├── client/          # React frontend

│   ├── src/

│   │   ├── components/

│   │   ├── assets/

│   │   └── App.jsx

├── server/          # Express backend

│   ├── routes/

│   │   ├── auth.js

│   │   └── products.js

│   ├── models/

│   │   ├── User.js

│   │   └── Product.js

│   ├── middleware/

│   │   └── auth.js

│   └── server.js

## Setup Instructions

### Backend
```bash
cd server
npm install
# Create .env file with MONGO_URI and JWT_SECRET
node server.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (supports search, category, pagination) |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create new product (Admin only) |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current logged in user |

## Author

Internship project for Developershub Backend Development Internship