# Frontend - Mosque Management System

This directory contains the frontend application built with React, TypeScript, Vite, and Tailwind CSS.

## Table of Contents
- [Structure](#structure)
- [Features](#features)
- [Development](#development)
- [Build for Production](#build-for-production)
- [Dark Theme](#dark-theme)
- [Media Queries](#media-queries)
- [Static Site Deployment](#static-site-deployment)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

---

## Structure

```
Frontend/
└── client/
    ├── public/          # Static assets and images
    │   └── images/      # Image assets
    ├── src/
    │   ├── api/         # API configuration (axios)
    │   ├── components/  # Reusable components
    │   │   ├── AdminRoute.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Layout.tsx
    │   │   ├── Navbar.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── context/     # React context providers
    │   │   └── ThemeContext.tsx
    │   ├── pages/       # Page components
    │   │   ├── dashboard/  # Admin dashboard pages
    │   │   ├── Home.tsx
    │   │   ├── About.tsx
    │   │   ├── Activities.tsx
    │   │   ├── Courses.tsx
    │   │   ├── Lectures.tsx
    │   │   ├── Projects.tsx
    │   │   ├── Executives.tsx
    │   │   ├── FAQ.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   └── Dashboard.tsx
    │   ├── store/       # Redux store and slices
    │   │   ├── index.ts
    │   │   └── slices/
    │   ├── App.tsx      # Main app component
    │   ├── main.tsx     # Entry point
    │   └── index.css    # Global styles with Tailwind
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

---

## Features

- ✅ Static site generation ready
- ✅ Responsive design with mobile-first approach
- ✅ Dark mode with modern slate color scheme
- ✅ Comprehensive media queries for all screen sizes
- ✅ Accessibility support (reduced motion, high contrast)
- ✅ Optimized for performance
- ✅ React Router v6 for navigation
- ✅ Redux Toolkit for state management
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Vite for fast development and builds

---

## Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Setup

```bash
cd Frontend/client
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

## Build for Production

```bash
cd Frontend/client
npm run build
```

The build output will be in `Frontend/client/dist/` and can be served as a static site.

Build includes:
- Code splitting
- Tree shaking
- Minification
- Asset optimization
- Lazy loading

---

## Dark Theme

The dark theme uses a modern slate color palette for better readability and professional appearance:

### Color Palette

**Light Mode:**
- Background: `white` (#ffffff)
- Text: `gray-900` (#111827)
- Cards: `white` (#ffffff)
- Borders: `emerald-100` (#d1fae5)

**Dark Mode:**
- Background: `slate-900` (#0f172a)
- Cards: `slate-800` (#1e293b)
- Text: `slate-50` (#f8fafc)
- Borders: `slate-700` (#334155)
- Secondary buttons: `slate-700` (#334155)

### Theme Toggle

The theme is managed by `ThemeContext` and persists in localStorage.

---

## Media Queries

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Responsive Features

**Mobile (< 640px):**
- Smaller font sizes (h1: 3xl, h2: 2xl, h3: xl)
- Reduced padding on buttons (px-4 py-2)
- Smaller input fields (px-3 py-2)
- Compact card padding (p-4)
- Base font size for Arabic text

**Tablet (768px - 1024px):**
- Optimized section titles (text-3xl)
- Balanced card titles (text-xl)
- Medium-sized typography

**Desktop (> 1024px):**
- Full-size typography
- Maximum padding and spacing
- Enhanced hover effects

**Additional Support:**
- Print styles (removes shadows, white background)
- High contrast mode (thicker borders)
- Reduced motion support (respects user preferences)
- Custom scrollbar styling for both themes

---

## Static Site Deployment

The frontend is built as a static site that can be deployed to any static hosting platform.

### Build Process

```bash
cd Frontend/client
npm install
npm run build
```

This creates an optimized production build in `Frontend/client/dist/`

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Frontend/client
vercel --prod
```

Or connect your GitHub repository to Vercel:
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `Frontend/client`

#### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd Frontend/client
netlify deploy --prod --dir=dist
```

Or drag and drop the `dist` folder to Netlify's web interface.

#### 3. GitHub Pages

Add to `Frontend/client/vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
```

Then:

```bash
npm run build
# Push dist folder to gh-pages branch
```

#### 4. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### 5. Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy --only hosting
```

---

## Environment Variables

For static sites, environment variables must be set at build time.

### Setup

Create `Frontend/client/.env.production`:

```env
VITE_API_URL=https://your-api-domain.com
```

### Usage in Code

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### API Configuration

Update `Frontend/client/src/api/axios.ts` to point to your production API:

```typescript
const baseURL = import.meta.env.VITE_API_URL || 'https://your-api.com';
```

---

## Performance Optimization

The build includes:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization
- ✅ Lazy loading
- ✅ Image optimization
- ✅ CSS purging (unused styles removed)

### Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify API endpoints are accessible
- [ ] Check dark mode functionality
- [ ] Test responsive design on mobile/tablet
- [ ] Verify images load correctly
- [ ] Test form submissions
- [ ] Check authentication flow
- [ ] Validate SEO meta tags
- [ ] Test performance with Lighthouse
- [ ] Verify accessibility with screen readers

---

## Troubleshooting

### 404 on Page Refresh

Single Page Applications (SPAs) need special routing configuration.

**Netlify** - Create `Frontend/client/public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - Already configured in `vercel.json`

**Apache** - Create `.htaccess`:
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx** - Add to server block:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### CORS Issues

Ensure your backend API has proper CORS configuration:

```typescript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### Build Errors

**Out of Memory:**
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**TypeScript Errors:**
```bash
# Check for type errors
npm run build
# Fix errors in reported files
```

### Dark Mode Not Working

1. Check localStorage: `localStorage.getItem('theme')`
2. Verify ThemeContext is wrapping the app
3. Check Tailwind config has `darkMode: 'class'`

### Images Not Loading

1. Verify images are in `public/images/`
2. Use correct path: `/images/filename.jpg`
3. Check file extensions match exactly

---

## Technology Stack

- **React** 18.2.0 - UI library
- **TypeScript** 5.3.3 - Type safety
- **Vite** 7.3.1 - Build tool
- **Tailwind CSS** 3.4.1 - Styling
- **Redux Toolkit** 2.0.1 - State management
- **React Router** 6.21.1 - Routing
- **Axios** 1.6.5 - HTTP client
- **React Icons** 5.0.1 - Icon library
- **date-fns** 3.0.6 - Date utilities

---

## License

MIT
