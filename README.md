# Chatty

🔗 **Live Demo:** https://chatty-8g58.onrender.com  

Chatty is a real-time chat application built with a Node.js/Express + MongoDB backend and a React + Vite + TailwindCSS frontend. It supports JWT-based authentication, profile avatar uploads via Cloudinary, and live messaging via Socket.IO.

## Features

- User signup, login, logout with hashed passwords (bcryptjs)
- JWT authentication stored in HTTP-only cookies
- Auth-protected routes and session check endpoint
- Realtime one-to-one messaging with Socket.IO
- Online users presence tracking
- Image uploads for profile pictures and messages via Cloudinary
- Responsive UI with TailwindCSS and DaisyUI
- Global state management with Zustand
- Toast notifications with react-hot-toast


## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- MongoDB database (local or hosted)
- Cloudinary account (for image uploads)

## Environment Variables

Create a `.env` file inside the `backend/` folder with at least the following variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

Adjust values and add any extra variables you use in your local setup.

## Installation

From the project root (`Chatty/`):

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Running the App in Development

In one terminal, start the backend server:

```bash
cd backend
npm run dev
```

By default it runs on `http://localhost:5000` and exposes the API under `/api` and Socket.IO server.

In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Vite will start the React app (usually on `http://localhost:5173`). Make sure your `CLIENT_URL` and CORS origin configuration match this URL.

## Production Build

To create a production build of the frontend and serve it via the backend:

```bash
# Build frontend
cd frontend
npm run build

# Move back to backend and start in production mode
cd ../backend
NODE_ENV=production npm start
```

In production mode, the Express server in `backend/src/index.js` serves the compiled frontend from `frontend/dist`.




## Tech Stack

**Backend**
- Node.js, Express 5
- MongoDB, Mongoose
- Socket.IO
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- Cloudinary for image hosting

**Frontend**
- React + Vite
- React Router
- Zustand
- TailwindCSS + DaisyUI
- Axios
- Lucide React icons
- react-hot-toast



