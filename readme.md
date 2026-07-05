# 🍕 Online Food Ordering System
### SWST 32043 - Software Architecture and Concepts | Assignment 02

---

## 👥 Group Members

| Student ID | Full Name | Contribution |
|------------|-----------|--------------|
| CT/2021/004 | K. Nimas | Home Page, Menu Page, Search, Authentication |
| CT/2021/025 | G.M. Udesika | Admin Panel (Product & User Management) |
| CT/2021/059 | K.S.K.Y. Perera | Review and Rating |
| CT/2021/060 | M.M. Aththanagoda | Cart, Checkout, Address Managment |
| CT/2021/073 | R.M.S.D. Rathnayake | Order Tracking, Order Details pages |

---

## 📋 System Description

The Online Food Ordering System is a full-stack web application that allows customers to browse food items by category, search for specific dishes, add items to a cart, and place orders online. The system includes an admin panel for managing products, users, and orders, as well as order tracking functionality for customers.

---

## 🛠️ Technology Used

### Frontend
- **React.js** - UI library for building the user interface
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Frontend build tool

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **nodemon** - Development server auto-restart

### Tools & Platforms
- **GitHub** - Version control and collaboration
- **MongoDB Atlas** - Cloud database hosting
- **Postman and Thunder Client** - API testing
- **VS Code** - Code editor

---

## ⚙️ Installation / Setup

### Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB Atlas account (or local MongoDB)
- Git

### Step 1 — Clone the repository
```bash
git clone https://github.com/Kafoor-Nimas/Online-Food-Ordering-System.git
cd Online-Food-Ordering-System
```

### Step 2 — Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Step 3 — Setup Frontend
```bash
cd ../front-end
npm install
```

---

## ▶️ How to Run

### Start the Backend Server
```bash
cd backend
npm run dev
```
Server runs at: `http://localhost:5000`

### Start the Frontend
```bash
cd front-end
npm run dev
```
Frontend runs at: `http://localhost:5173`

> Make sure both servers are running at the same time.

---

## ✨ Main Features

| Feature | Description | Member Responsible |
|---------|-------------|-------------------|
| **Home Page** | Hero section, featured categories, popular products, features section | CT/2021/004 - K. Nimas |
| **Menu Page** | Browse all products with category filters, price range, sorting | CT/2021/004 - K. Nimas |
| **Search** | Real-time product search from navbar | CT/2021/004 - K. Nimas |
| **Authentication** | User registration, login, logout with JWT | CT/2021/004 - K. Nimas |
| **Admin Panel** | Manage products (add, edit, delete), manage users (block, role change) | CT/2021/025 - G.M. Udesika |
| **Cart & Checkout** | Add to cart, manage quantities, place orders | CT/2021/059 - K.S.K.Y. Perera *(TBC)* |
| **Order Management** | View orders, order history, order status | CT/2021/060 - M.M. Aththanagoda *(TBC)* |
| **Order Tracking** | Track order status in real-time | CT/2021/073 - R.M.S.D. Rathnayake *(TBC)* |

---

## 🏗️ Architecture

This system follows a **Layered (N-Tier) Architecture** with **MVC pattern** on the backend:

```
┌─────────────────────────────────┐
│     Presentation Layer          │  React.js Frontend
│     (React + Tailwind CSS)      │
├─────────────────────────────────┤
│     API / Controller Layer      │  Express.js REST API
│     (Routes + Controllers)      │
├─────────────────────────────────┤
│     Business Logic Layer        │  Controllers + Middleware
│     (Auth, Products, Orders)    │
├─────────────────────────────────┤
│     Data Access Layer           │  Mongoose Models
│     (MongoDB + Mongoose)        │
└─────────────────────────────────┘
```

---

## 📁 Folder Structure

```
Online-Food-Ordering-System/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── router/          # Additional routers
│   └── server.js        # Entry point
├── front-end/
│   ├── src/
│   │   ├── assets/      # Images, data
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context (Auth)
│   │   ├── pages/       # Page components
│   │   └── config/      # API configuration
│   └── index.html
└── README.md
```

---

## 🔗 GitHub Repository

[https://github.com/Kafoor-Nimas/Online-Food-Ordering-System](https://github.com/Kafoor-Nimas/Online-Food-Ordering-System)

---

## 📊 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/products` | Get all products (menu) | No |
| GET | `/api/products/all` | Get all products (admin) | Admin |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| GET | `/api/users` | Get all users | Admin |
| POST | `/api/orders` | Create order | User |
| GET | `/api/orders/myorders` | Get user orders | User |

---
