# Noorul Haq - Deployment Guide

This guide covers deploying the Noorul Haq system with separate frontend and backend deployments.

## Architecture Overview

- **Frontend**: React + TypeScript + Vite (deployed on Vercel)
- **Backend**: Node.js + Express + MongoDB (deployed on Render/Railway)
- **Database**: MongoDB Atlas (cloud database)

## Prerequisites

1. GitHub account
2. Vercel account (for frontend)
3. Render/Railway account (for backend)
4. MongoDB Atlas account (for database)

## Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string (replace `<password>` with your actual password)

## Backend Deployment

### Option 1: Render (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository

2. **Create Render Account**: Sign up at https://render.com

3. **Create Web Service**:
   - Connect your GitHub repository
   - Select the `server` folder as the root directory
   - Use these settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Node Version**: 18

4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_REFRESH_SECRET=your_refresh_secret_key_here
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**: Render will automatically deploy your backend

### Option 2: Railway

1. **Create Railway Account**: Sign up at https://railway.app
2. **Deploy from GitHub**: Connect your repository
3. **Configure**:
   - Root directory: `server`
   - Build command: `npm run build`
   - Start command: `npm start`
4. **Add Environment Variables** (same as above)

### Option 3: Heroku

1. Install Heroku CLI
2. Create Heroku app: `heroku create noorul-haq-backend`
3. Set environment variables: `heroku config:set MONGODB_URI=your_connection_string`
4. Deploy: `git subtree push --prefix server heroku main`

## Frontend Deployment (Vercel)

1. **Create Vercel Account**: Sign up at https://vercel.com

2. **Import Project**:
   - Connect your GitHub repository
   - Select the `client` folder as the root directory

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-domain.render.com/api/v1
   VITE_APP_NAME=Noorul Haq
   VITE_APP_VERSION=1.0.0
   ```

5. **Deploy**: Vercel will automatically deploy your frontend

## GitHub Repository Structure

```
noorul-haq/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vercel.json        # Vercel configuration
│   └── .env.example
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   ├── package.json
│   ├── Dockerfile         # Docker configuration
│   ├── render.yaml        # Render configuration
│   ├── railway.json       # Railway configuration
│   └── .env.example
├── database/              # Database schemas and seed data
│   ├── schema.js
│   └── seed.js
├── README.md
├── DEPLOYMENT.md
└── package.json           # Root package.json for development
```

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mosque_db
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_REFRESH_SECRET=your_refresh_secret_key_minimum_32_characters
CLIENT_URL=https://your-frontend-domain.vercel.app
API_VERSION=v1
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.render.com/api/v1
VITE_APP_NAME=Noorul Haq
VITE_APP_VERSION=1.0.0
```

## Custom Domain Setup

### Frontend (Vercel)
1. Go to your Vercel project settings
2. Add your custom domain
3. Configure DNS records as instructed

### Backend (Render)
1. Go to your Render service settings
2. Add custom domain
3. Configure DNS records as instructed

## SSL/HTTPS

Both Vercel and Render provide automatic SSL certificates for your domains.

## Monitoring and Logs

- **Vercel**: Check deployment logs in the Vercel dashboard
- **Render**: Monitor logs and metrics in the Render dashboard
- **MongoDB Atlas**: Monitor database performance and usage

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CLIENT_URL` in backend matches your frontend domain
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Failures**: Check build logs for missing dependencies or TypeScript errors

### Health Checks

- Backend health check: `GET /health`
- Frontend: Should load without errors

## Scaling

- **Vercel**: Automatically scales based on traffic
- **Render**: Upgrade to paid plans for better performance and scaling
- **MongoDB Atlas**: Monitor usage and upgrade cluster as needed

## Security Considerations

1. Use strong JWT secrets (minimum 32 characters)
2. Enable MongoDB Atlas IP whitelisting
3. Use HTTPS for all communications
4. Regularly update dependencies
5. Monitor for security vulnerabilities

## Cost Optimization

- **Vercel**: Free tier supports most small to medium applications
- **Render**: Free tier available with limitations
- **MongoDB Atlas**: Free tier provides 512MB storage
- Consider upgrading to paid tiers as your application grows

## Backup Strategy

1. **Database**: MongoDB Atlas provides automated backups
2. **Code**: Ensure code is backed up in GitHub
3. **Environment Variables**: Keep secure backup of environment variables

## CI/CD Pipeline

Both Vercel and Render support automatic deployments from GitHub:
- Push to main branch triggers automatic deployment
- Pull requests create preview deployments (Vercel)
- Environment-specific deployments possible

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- Railway: https://docs.railway.app
- MongoDB Atlas: https://docs.atlas.mongodb.com