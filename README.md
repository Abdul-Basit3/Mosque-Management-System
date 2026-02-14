# Mosque Management System

A comprehensive web application for managing mosque activities, courses, lectures, and community engagement.

## Project Structure

```
Mosque Management System/
├── Frontend/           # React + TypeScript + Vite frontend
│   └── client/
├── Backend/            # Express + MongoDB backend
│   ├── server/
│   └── database/
├── package.json        # Root workspace configuration
└── README.md
```

## Quick Start

### Install Dependencies

```bash
npm run install:all
```

### Development Mode

Run both frontend and backend:
```bash
npm run dev
```

Or run separately:
```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### Production Build

```bash
# Build frontend
npm run build

# Build backend
npm run build:server

# Start backend server
npm start
```

## Frontend (Static Site)

The frontend is built as a static site that can be deployed to any static hosting service:

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6

### Deploy Frontend

After building (`npm run build`), deploy the `Frontend/client/dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Backend API

- **Framework**: Express + TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Security**: Helmet, CORS

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode with modern slate theme
- ✅ Prayer times management
- ✅ Courses and lectures
- ✅ Activities and projects
- ✅ Executive board management
- ✅ FAQ system
- ✅ User authentication
- ✅ Admin dashboard
- ✅ Accessibility support

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB

## License

MIT
