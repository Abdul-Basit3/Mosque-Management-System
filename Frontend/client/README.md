# Noorul Haq - Frontend

React + TypeScript + Vite frontend for the Noorul Haq mosque management system.

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Noorul Haq
VITE_APP_VERSION=1.0.0
```

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   └── images/            # Image assets
├── src/
│   ├── api/               # API configuration
│   ├── assets/            # Application assets
│   ├── components/        # Reusable components
│   ├── context/           # React contexts
│   ├── pages/             # Page components
│   │   └── dashboard/     # Admin dashboard pages
│   └── store/             # Redux store
│       └── slices/        # Redux slices
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vercel.json            # Vercel deployment config
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: System preference detection and manual toggle
- **Authentication**: JWT-based authentication with auto-refresh
- **Role-based Access**: Different views for admin, staff, student, and public users
- **Real-time Updates**: Dynamic content updates
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized with Vite and code splitting

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Build and prepare for deployment

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Configure environment variables
4. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🔒 Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to requests
5. Auto-redirect on token expiration

## 🎯 Key Components

- **Layout**: Main application layout with navigation
- **Navbar**: Responsive navigation with user menu
- **Footer**: Site footer with links and information
- **ProtectedRoute**: Route protection based on authentication
- **AdminRoute**: Admin-only route protection
- **ThemeContext**: Dark/light mode management

## 📱 Responsive Breakpoints

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

## 🎨 Color Scheme

- **Primary**: Islamic Green (#10B981)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Emerald (#059669)
- **Background**: White/Gray-900 (light/dark mode)
- **Text**: Gray-900/White (light/dark mode)

## 🔍 SEO Optimization

- Meta tags for social sharing
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Structured data markup

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 Build Optimization

- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Dynamic imports for routes
- **Asset Optimization**: Image and CSS optimization
- **Bundle Analysis**: Analyze bundle size

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `vercel.json` - Vercel deployment configuration

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Check TypeScript errors and dependencies
2. **API Connection**: Verify VITE_API_URL environment variable
3. **Authentication Issues**: Check token storage and expiration
4. **Styling Issues**: Verify Tailwind CSS classes and configuration

### Development Tips

- Use React Developer Tools for debugging
- Check browser console for errors
- Verify network requests in browser DevTools
- Use TypeScript strict mode for better code quality

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Add proper error handling
4. Test responsive design
5. Update documentation as needed

## 📄 License

MIT License - see the [LICENSE](../LICENSE) file for details.