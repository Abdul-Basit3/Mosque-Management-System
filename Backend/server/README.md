# Mosque Management System - Backend API

Express + TypeScript + MongoDB backend for the Mosque Management System.

## Features

- ✅ User authentication with JWT
- ✅ Admin login with default credentials
- ✅ Prayer times management with AM/PM formatting
- ✅ Role-based access control (admin, staff, user)
- ✅ MongoDB database with Mongoose ODM
- ✅ Secure password hashing with bcrypt
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or cloud instance)
- npm >= 8.0.0

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your MongoDB URI and other settings
```

## Default Admin Credentials

The system automatically creates an admin user on first run:

- **Email**: admin@mosque.com
- **Password**: Admin@123

⚠️ **Important**: Change these credentials in production!

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
# Build TypeScript
npm run build

# Start server
npm start
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/profile` - Get user profile (protected)

### Prayer Times
- `GET /api/v1/prayer-times/today` - Get today's prayer times (public)
- `GET /api/v1/prayer-times/:date` - Get prayer times by date (public)
- `PUT /api/v1/prayer-times` - Update prayer times (admin/staff only)
- `POST /api/v1/prayer-times/bulk` - Bulk create prayer times (admin/staff only)
- `DELETE /api/v1/prayer-times/:date` - Delete prayer times (admin only)

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mosque_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@mosque.com
ADMIN_PASSWORD=Admin@123
```

## Prayer Times Format

Prayer times are automatically formatted to 12-hour format with AM/PM:
- Input: `05:30` → Output: `05:30 AM`
- Input: `13:30` → Output: `01:30 PM`

## Database Models

### User
- firstName, lastName, email, password
- role: 'admin' | 'staff' | 'user'
- isActive: boolean

### PrayerTime
- date: Date
- fajr, sunrise, dhuhr, asr, maghrib, isha: string
- location: string
- latitude, longitude: number (optional)

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based authorization
- CORS protection
- Helmet security headers
- Input validation

## Testing the API

### Login as Admin
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mosque.com","password":"Admin@123"}'
```

### Get Today's Prayer Times
```bash
curl http://localhost:5000/api/v1/prayer-times/today
```

### Update Prayer Times (requires auth token)
```bash
curl -X PUT http://localhost:5000/api/v1/prayer-times \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "date": "2024-02-14",
    "fajr": "05:30",
    "sunrise": "06:45",
    "dhuhr": "12:30",
    "asr": "15:45",
    "maghrib": "18:15",
    "isha": "19:30",
    "location": "Accra, Ghana"
  }'
```

## Project Structure

```
Backend/server/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── prayerTimes.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── errorHandler.ts
│   ├── models/
│   │   ├── User.model.ts
│   │   └── PrayerTime.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── prayerTimes.routes.ts
│   ├── utils/
│   │   └── seedAdmin.ts
│   └── server.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT
