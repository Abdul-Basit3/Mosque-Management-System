# Noorul Haq - Backend API

Node.js + Express + MongoDB backend for the Noorul Haq mosque management system.

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Validation**: Express Validator
- **Security**: Helmet, CORS
- **File Upload**: Multer
- **Logging**: Morgan
- **Compression**: Compression middleware

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+ (local) or MongoDB Atlas (cloud)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env` file in the server directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mosque_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_minimum_32_characters
JWT_REFRESH_EXPIRE=30d

# CORS Configuration
CLIENT_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## 📁 Project Structure

```
server/
├── src/
│   ├── config/            # Configuration files
│   │   └── database.ts    # MongoDB connection
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   │   ├── auth.ts        # Authentication middleware
│   │   └── errorHandler.ts # Error handling
│   ├── models/            # Mongoose models
│   └── routes/            # API routes
├── uploads/               # File uploads directory
├── package.json
├── tsconfig.json
├── Dockerfile            # Docker configuration
├── render.yaml           # Render deployment config
└── railway.json          # Railway deployment config
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Content Management
- `GET /api/v1/contents` - Get Islamic content (duas, verses, hadiths)
- `POST /api/v1/contents` - Create content (admin only)
- `PUT /api/v1/contents/:id` - Update content (admin only)
- `DELETE /api/v1/contents/:id` - Delete content (admin only)

### Prayer Times
- `GET /api/v1/prayer-times` - Get prayer times
- `GET /api/v1/prayer-times/today` - Get today's prayer times
- `POST /api/v1/prayer-times` - Create prayer times (admin only)

### Lectures
- `GET /api/v1/lectures` - Get all lectures
- `GET /api/v1/lectures/:id` - Get lecture by ID
- `POST /api/v1/lectures` - Create lecture (admin only)
- `PUT /api/v1/lectures/:id` - Update lecture (admin only)

### Courses
- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get course by ID
- `POST /api/v1/courses` - Create course (admin only)
- `POST /api/v1/courses/:id/enroll` - Enroll in course

### Activities
- `GET /api/v1/activities` - Get all activities
- `GET /api/v1/activities/:id` - Get activity by ID
- `POST /api/v1/activities` - Create activity (admin only)
- `POST /api/v1/activities/:id/register` - Register for activity

### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create project (admin only)
- `POST /api/v1/projects/:id/donate` - Make donation

### Executives
- `GET /api/v1/executives` - Get all executives
- `POST /api/v1/executives` - Create executive (admin only)
- `PUT /api/v1/executives/:id` - Update executive (admin only)

### FAQs
- `GET /api/v1/faqs` - Get all FAQs
- `POST /api/v1/faqs` - Create FAQ (admin only)
- `PUT /api/v1/faqs/:id` - Update FAQ (admin only)

### About
- `GET /api/v1/about` - Get organization information
- `PUT /api/v1/about` - Update organization information (admin only)

### Health Check
- `GET /health` - API health check

## 🔒 Authentication & Authorization

### JWT Authentication
- Access tokens expire in 7 days (configurable)
- Refresh tokens expire in 30 days (configurable)
- Tokens are signed with HS256 algorithm

### User Roles
- **admin**: Full access to all endpoints
- **staff**: Limited administrative access
- **student**: Access to courses and activities
- **public**: Read-only access to public content

### Protected Routes
Routes are protected using the `protect` middleware:
```typescript
router.get('/protected', protect, controller);
router.post('/admin-only', protect, authorize('admin'), controller);
```

## 🗄️ Database Models

### User Model
```typescript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum),
  isActive: Boolean,
  // timestamps
}
```

### Content Model
```typescript
{
  type: String (dua|verse|hadith),
  title: String,
  arabicText: String,
  translation: String,
  reference: String,
  isActive: Boolean,
  // timestamps
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run deploy` - Build and start for deployment
- `npm run seed` - Seed database with sample data

## 🌐 Deployment

### Render (Recommended)

1. Connect your GitHub repository
2. Set root directory to `server`
3. Configure environment variables
4. Use build command: `npm install && npm run build`
5. Use start command: `npm start`

### Railway

1. Connect GitHub repository
2. Set root directory to `server`
3. Configure environment variables
4. Deploy automatically

### Docker

```bash
# Build Docker image
docker build -t noorul-haq-backend .

# Run container
docker run -p 5000:5000 --env-file .env noorul-haq-backend
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting (configurable)
- **Input Validation**: Express Validator
- **Password Hashing**: bcryptjs
- **JWT Security**: Secure token generation
- **File Upload Security**: File type and size validation

## 📊 Monitoring & Logging

- **Morgan**: HTTP request logging
- **Error Handling**: Centralized error handling
- **Health Checks**: `/health` endpoint for monitoring
- **Performance**: Compression middleware

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔧 Configuration

### Database Configuration
```typescript
// config/database.ts
export const connectDB = async () => {
  await mongoose.connect(MONGODB_URI);
};
```

### Middleware Configuration
```typescript
// Security middleware
app.use(helmet());
app.use(cors({ origin: CLIENT_URL }));
app.use(compression());
app.use(morgan('combined'));
```

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT implementation
- `helmet` - Security headers
- `cors` - CORS middleware
- `compression` - Response compression
- `morgan` - HTTP logging
- `multer` - File upload handling
- `express-validator` - Input validation

### Development Dependencies
- `typescript` - TypeScript compiler
- `nodemon` - Development server
- `ts-node` - TypeScript execution
- `@types/*` - Type definitions

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Verify MongoDB URI and network access
2. **Authentication Errors**: Check JWT secret and token format
3. **CORS Issues**: Verify CLIENT_URL matches frontend domain
4. **File Upload Issues**: Check upload directory permissions
5. **Build Errors**: Verify TypeScript configuration

### Development Tips

- Use MongoDB Compass for database visualization
- Check server logs for detailed error information
- Use Postman or similar tools for API testing
- Monitor database queries for performance optimization

## 📈 Performance Optimization

- **Database Indexing**: Proper indexes on frequently queried fields
- **Query Optimization**: Efficient MongoDB queries
- **Caching**: Response caching for static content
- **Compression**: Gzip compression for responses
- **Connection Pooling**: MongoDB connection pooling

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update API documentation
6. Follow RESTful conventions

## 📄 License

MIT License - see the [LICENSE](../LICENSE) file for details.