# Noorul Haq - School Mosque Management System

A modern, scalable web-based platform for managing mosque and school activities, spiritual resources, educational programs, and community engagement.

## 🚀 Live Demo

- **Frontend**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **Backend API**: [https://your-api.render.com](https://your-api.render.com)

## 🛠 Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **State Management**: Redux Toolkit
- **Deployment**: Vercel (Frontend) + Render (Backend)

## ✨ Features

- 🕌 Dynamic Home with Prayer Times, Duas, and Quranic Verses
- 🎥 Lectures Management (Video Upload/Embed)
- 📚 Online Learning Environment (Courses & Enrollment)
- 🏗️ Projects Showcase with Donation Integration
- 📅 Activities Registration & Event Management
- 👥 Executives Directory
- ❓ FAQ Management
- ℹ️ About Page with Social Media Integration
- 🔐 Role-Based Access Control (Admin, Staff, Student, Public)
- 🌙 Dark Mode Support
- 📱 Responsive Design

## 📁 Project Structure

```
noorul-haq/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json        # Vercel deployment config
├── server/                 # Node.js backend
│   ├── src/
│   ├── package.json
│   ├── Dockerfile         # Docker configuration
│   └── render.yaml        # Render deployment config
├── database/              # MongoDB schemas
│   ├── schema.js
│   └── seed.js
└── DEPLOYMENT.md          # Detailed deployment guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (v6+) or MongoDB Atlas
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/noorul-haq.git
   cd noorul-haq
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd client && npm install
   
   # Install backend dependencies
   cd ../server && npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend environment
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB connection string
   
   # Frontend environment
   cp client/.env.example client/.env
   # Edit client/.env with your API URL
   ```

4. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually:
   # Frontend: cd client && npm run dev
   # Backend: cd server && npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/health

## 🌐 Deployment

This project is designed for easy deployment on modern platforms:

- **Frontend**: Deploy to Vercel with automatic builds
- **Backend**: Deploy to Render, Railway, or Heroku
- **Database**: Use MongoDB Atlas for cloud database

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

#### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/noorul-haq&project-name=noorul-haq-frontend&repository-name=noorul-haq&root-directory=client)

#### Backend (Render)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/yourusername/noorul-haq)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api/v1
VITE_APP_NAME=Noorul Haq
```

## 📚 API Documentation

The backend provides a RESTful API with the following endpoints:

- `GET /health` - Health check
- `POST /auth/login` - User authentication
- `GET /prayer-times` - Prayer times
- `GET /contents` - Islamic content
- `GET /lectures` - Video lectures
- `GET /courses` - Educational courses
- `GET /activities` - Community activities
- `GET /projects` - Community projects
- `GET /executives` - Leadership directory
- `GET /faqs` - Frequently asked questions
- `GET /about` - Organization information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Islamic content and prayers from authentic sources
- Community feedback and requirements
- Open source libraries and frameworks used

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@noorulhaq.org
- Documentation: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**Built with ❤️ for the Muslim community**
