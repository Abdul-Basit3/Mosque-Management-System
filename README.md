# Mosque Management System

A comprehensive web application for managing mosque activities, courses, lectures, and community engagement with real-time prayer times management.

## 🚀 Quick Start (Windows)

### Automated Installation
```bash
# Double-click or run:
install.bat

# Then start the application:
start.bat
```

### Manual Installation
```bash
npm run install:all
npm run dev
```

## 📋 Admin Access

**Login URL:** http://localhost:5173/admin-login

**Default Credentials:**
- Email: `admin@mosque.com`
- Password: `Admin@123`

⚠️ **Change these in production!** See [ADMIN-CREDENTIALS.md](ADMIN-CREDENTIALS.md)

## ✨ Key Features

- ✅ **Real-time Prayer Times** - Updates reflect immediately with AM/PM formatting
- ✅ **Admin Dashboard** - Complete content management system
- ✅ **Secure Authentication** - JWT-based with role management
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **Dark Mode** - Modern slate theme
- ✅ **MongoDB Integration** - Persistent data storage

## 📁 Project Structure

```
Mosque Management System/
├── Frontend/
│   └── client/              # React + TypeScript + Vite
│       ├── src/
│       │   ├── pages/
│       │   │   ├── dashboard/
│       │   │   │   └── PrayerTimesManagement.tsx  # ✅ Fully functional
│       │   │   └── Home.tsx                       # ✅ Shows updated times
│       │   └── api/
│       └── package.json
├── Backend/
│   └── server/              # Express + TypeScript + MongoDB
│       ├── src/
│       │   ├── controllers/
│       │   │   ├── auth.controller.ts             # Login/register
│       │   │   └── prayerTimes.controller.ts      # CRUD + AM/PM format
│       │   ├── models/
│       │   │   ├── User.model.ts                  # User with bcrypt
│       │   │   └── PrayerTime.model.ts            # Prayer times
│       │   └── server.ts
│       ├── .env                                    # Configuration
│       └── package.json
├── QUICK-START.md           # 5-minute setup guide
├── ADMIN-CREDENTIALS.md     # Complete admin guide
├── CHANGES-SUMMARY.md       # What's new
└── README.md                # This file
```

## 🎯 Quick Commands

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:client

# Start backend only
npm run dev:server

# Build for production
npm run build
npm run build:server

# Start production server
npm start
```

## 🔧 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or MongoDB Atlas)
- npm >= 8.0.0

## 📖 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Get running in 5 minutes
- **[ADMIN-CREDENTIALS.md](ADMIN-CREDENTIALS.md)** - Admin access & security
- **[CHANGES-SUMMARY.md](CHANGES-SUMMARY.md)** - Recent updates & features
- **[Backend README](Backend/server/README.md)** - API documentation

## 🎨 Features

### ✅ Implemented & Working

- **Prayer Times Management**
  - Real-time updates via admin dashboard
  - Automatic AM/PM formatting (24h input → 12h display)
  - MongoDB persistence
  - Immediate reflection on home page
  
- **Authentication System**
  - JWT-based secure authentication
  - Role-based access (Admin, Staff, User)
  - Password hashing with bcrypt
  - Auto-created admin account

- **Admin Dashboard**
  - Prayer times management
  - Content management interface
  - Success/error notifications
  - Loading states

- **User Interface**
  - Responsive design (mobile, tablet, desktop)
  - Dark mode with modern slate theme
  - Islamic quotations carousel
  - Prayer times display with icons

### 📋 Ready for Implementation

- About Section Management
- Activities Management
- Courses Management
- Lectures Management
- Projects Management
- Executives Management
- FAQs Management

## 🔐 Security Features

1. **Password Security**: bcrypt hashing with salt
2. **JWT Tokens**: Signed tokens with 7-day expiration
3. **Role-Based Access**: Admin/Staff/User permissions
4. **CORS Protection**: Configured allowed origins
5. **Helmet Security**: Additional HTTP security headers
6. **Environment Variables**: Sensitive data protection

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/profile` - Get profile (protected)

### Prayer Times
- `GET /api/v1/prayer-times/today` - Today's times (public)
- `GET /api/v1/prayer-times/:date` - Times by date (public)
- `PUT /api/v1/prayer-times` - Update times (admin/staff)
- `POST /api/v1/prayer-times/bulk` - Bulk import (admin/staff)
- `DELETE /api/v1/prayer-times/:date` - Delete times (admin)

## 💡 How Prayer Times Work

### Admin Updates Times
1. Login to admin dashboard
2. Navigate to Prayer Times
3. Click "Edit"
4. Enter times in 24-hour format (e.g., `05:30`, `13:30`)
5. Click "Save"

### Backend Processes
- Receives 24-hour format: `13:30`
- Converts to 12-hour: `01:30 PM`
- Saves to MongoDB
- Returns formatted time

### Frontend Displays
- Home page fetches from API
- Shows formatted times: `01:30 PM`
- Updates automatically on next load

## 🚀 Deployment

### Development
```bash
# Start MongoDB
mongod

# Start application
npm run dev
```

### Production

1. **Update Environment Variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_very_long_random_secret
   ADMIN_EMAIL=your_secure_email@example.com
   ADMIN_PASSWORD=YourVerySecurePassword123!
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Build Applications**
   ```bash
   npm run build
   npm run build:server
   ```

3. **Deploy**
   - Frontend: Deploy `Frontend/client/dist/` to Vercel/Netlify
   - Backend: Deploy to Heroku/Railway/DigitalOcean
   - Database: Use MongoDB Atlas

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check MongoDB is running
mongod --version

# Check port availability
netstat -ano | findstr :5000

# Verify .env file exists
dir Backend\server\.env
```

### Cannot Login
1. Check backend console for admin credentials
2. Verify MongoDB connection
3. Check browser console (F12) for errors
4. Ensure credentials match `.env` file

### Prayer Times Not Updating
1. Verify you're logged in as admin/staff
2. Check backend is running
3. Open DevTools (F12) → Network tab
4. Look for API request errors
5. Check token hasn't expired (7 days)

## 📊 Technology Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router v6
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS

## 🔄 Recent Updates

### v1.1.0 - Prayer Times & Authentication
- ✅ Complete backend API implementation
- ✅ Admin authentication with JWT
- ✅ Prayer times CRUD operations
- ✅ AM/PM time formatting
- ✅ Real-time updates
- ✅ MongoDB integration
- ✅ Security middleware

See [CHANGES-SUMMARY.md](CHANGES-SUMMARY.md) for details.

## 📝 Environment Variables

### Backend (`Backend/server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mosque_db
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@mosque.com
ADMIN_PASSWORD=Admin@123
```

### Frontend (`Frontend/client/.env`)
```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Noorul Haq
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT

## 🙏 Support

For help and support:
1. Check documentation files
2. Review troubleshooting section
3. Check backend/frontend logs
4. Open an issue on GitHub

---

**Made with ❤️ for the Muslim community**
