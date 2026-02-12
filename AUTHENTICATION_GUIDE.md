# Role-Based Authentication & Redirection Guide

## Overview
This system implements a secure, role-based authentication flow with automatic redirection based on user roles.

## Architecture

### Backend Implementation

#### 1. User Roles
The system supports four user roles:
- `admin` - Full system access, redirects to `/admin/dashboard`
- `staff` - Staff member access, redirects to `/staff/dashboard`
- `student` - Student access, redirects to `/student/dashboard`
- `public` - General public access, redirects to `/dashboard`

#### 2. Login Endpoint (`POST /api/v1/auth/login`)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "user@example.com",
      "role": "admin",
      "avatar": "https://example.com/avatar.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "redirectUrl": "/admin/dashboard"
  },
  "message": "Login successful"
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Account deactivated

#### 3. Security Features

**Password Security:**
- Passwords are hashed using bcrypt with 10 salt rounds
- Password field is excluded from queries by default (`select: false`)
- Minimum 8 characters required
- Must contain uppercase, lowercase, and number

**JWT Token:**
- Signed with secret key from environment variables
- Default expiration: 7 days
- Contains user ID for verification

**Input Validation:**
- Email format validation
- Password strength requirements
- Phone number validation (optional)
- Role validation against allowed values

**Additional Security:**
- Account status check (isActive)
- Last login timestamp tracking
- Rate limiting (recommended to add)
- CORS configuration

### Frontend Implementation

#### 1. Login Flow

```typescript
// User submits login form
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Call login API
    const { data } = await api.post('/auth/login', { email, password });
    
    // Store user data and token in Redux + localStorage
    dispatch(setCredentials(data.data));
    
    // Navigate to role-specific dashboard
    const redirectUrl = data.data.redirectUrl || '/dashboard';
    navigate(redirectUrl);
  } catch (err) {
    // Handle errors
    setError(err.response?.data?.message);
  }
};
```

#### 2. State Management (Redux)

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Actions
setCredentials({ user, token, redirectUrl }) // Store auth data
logout() // Clear auth data
```

#### 3. Protected Routes

```typescript
// Protect routes that require authentication
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>

// Protect admin-only routes
<Route element={<AdminRoute />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
</Route>
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| GET | `/api/v1/auth/me` | Get current user | Yes |

## Environment Variables

### Server (.env)
```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Server
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api/v1
```

## Role-Based Redirect Mapping

The backend automatically determines the redirect URL based on user role:

```typescript
const redirectMap = {
  admin: '/admin/dashboard',
  staff: '/staff/dashboard',
  student: '/student/dashboard',
  public: '/dashboard'
};
```

## Usage Examples

### 1. Admin Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mosque.com",
    "password": "AdminPass123"
  }'
```

Response redirects to: `/admin/dashboard`

### 2. Student Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@mosque.com",
    "password": "StudentPass123"
  }'
```

Response redirects to: `/student/dashboard`

## Best Practices

### Security
1. ✅ Always use HTTPS in production
2. ✅ Store JWT tokens securely (httpOnly cookies recommended for production)
3. ✅ Implement refresh token mechanism
4. ✅ Add rate limiting to prevent brute force attacks
5. ✅ Log authentication attempts
6. ✅ Implement account lockout after failed attempts
7. ✅ Use strong password requirements
8. ✅ Validate all inputs on both client and server

### User Experience
1. ✅ Show clear error messages
2. ✅ Provide loading states during authentication
3. ✅ Remember user preference (remember me checkbox)
4. ✅ Implement password reset functionality
5. ✅ Show password strength indicator
6. ✅ Provide "forgot password" option

### Code Quality
1. ✅ Separate concerns (controller, service, model)
2. ✅ Use TypeScript for type safety
3. ✅ Implement proper error handling
4. ✅ Write unit tests for authentication logic
5. ✅ Document API endpoints
6. ✅ Use environment variables for configuration

## Testing

### Test User Accounts
Create test users for each role:

```javascript
// Admin user
{
  email: "admin@test.com",
  password: "Admin123!",
  role: "admin"
}

// Staff user
{
  email: "staff@test.com",
  password: "Staff123!",
  role: "staff"
}

// Student user
{
  email: "student@test.com",
  password: "Student123!",
  role: "student"
}
```

## Troubleshooting

### Common Issues

**1. "Invalid credentials" error**
- Verify email and password are correct
- Check if account is active
- Ensure password meets requirements

**2. Token not persisting**
- Check localStorage is enabled
- Verify Redux store configuration
- Check axios interceptors

**3. Redirect not working**
- Verify redirectUrl is in response
- Check React Router configuration
- Ensure routes are properly defined

**4. CORS errors**
- Configure CORS in server
- Check CLIENT_URL environment variable
- Verify API URL in client

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - SMS verification
   - Email verification
   - Authenticator app support

2. **OAuth Integration**
   - Google Sign-In
   - Facebook Login
   - Apple Sign-In

3. **Session Management**
   - Active sessions list
   - Remote logout
   - Device management

4. **Advanced Security**
   - IP-based restrictions
   - Geolocation verification
   - Suspicious activity detection

5. **Audit Logging**
   - Login history
   - Failed attempts tracking
   - Security event logging

## Support

For issues or questions:
- Email: support@mosque.com
- Documentation: /docs/authentication
- GitHub Issues: [repository-url]/issues
