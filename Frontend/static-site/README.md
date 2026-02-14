# Noorul Haq (UDS-GMSA) - Static Website

A fully responsive static website for the Noorul Haq Mosque built with HTML, CSS, JavaScript, and TypeScript.

## Features

- **Fully Responsive Design**: Mobile-first approach with comprehensive media queries
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Static Site**: No build process required for basic HTML/CSS/JS version
- **TypeScript Support**: Optional TypeScript version with type safety
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation
- **Performance Optimized**: Minimal dependencies, fast loading
- **Islamic Content**: Prayer times, Quranic verses, lectures, courses

## Project Structure

```
Frontend/static-site/
├── index.html              # Home page
├── lectures.html           # Lectures page
├── courses.html            # Courses page (to be created)
├── projects.html           # Projects page (to be created)
├── activities.html         # Activities page (to be created)
├── executives.html         # Leadership page (to be created)
├── faq.html               # FAQ page (to be created)
├── about.html             # About page (to be created)
├── css/
│   └── styles.css         # Main stylesheet with media queries
├── js/
│   ├── main.js            # Core JavaScript functionality
│   └── lectures.js        # Lectures page logic
├── ts/
│   └── main.ts            # TypeScript version
├── package.json           # NPM configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Getting Started

### Option 1: Basic HTML/CSS/JS (No Build Required)

Simply open `index.html` in your browser or serve with any static file server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server . -p 8080

# Using PHP
php -S localhost:8080
```

Then visit: `http://localhost:8080`

### Option 2: With TypeScript

1. Install dependencies:
```bash
npm install
```

2. Compile TypeScript:
```bash
npm run build:ts
```

3. Watch for changes (development):
```bash
npm run watch:ts
```

4. Serve the site:
```bash
npm run serve
```

5. Or run both together:
```bash
npm run dev
```

## Responsive Breakpoints

The site uses the following breakpoints:

- **Mobile**: 0-640px
- **Tablet**: 641px-1024px
- **Desktop**: 1025px-1280px
- **Large Desktop**: 1281px+

## Media Queries Features

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Adaptive navigation (hamburger menu on mobile)
- Optimized images
- Touch-friendly buttons and links
- Print styles
- Reduced motion support
- High contrast mode support

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --color-primary: #10b981;
    --color-primary-dark: #059669;
    --color-secondary: #14b8a6;
    /* ... */
}
```

### Content

- Update HTML files directly for static content
- Modify `js/main.js` for dynamic content (quotations, prayer times)
- Add new pages by copying existing HTML structure

## API Integration

The site is designed to work with or without a backend API:

- **With API**: Fetches prayer times, lectures, courses dynamically
- **Without API**: Falls back to hardcoded sample data

API endpoints expected:
- `GET /api/prayer-times/today`
- `GET /api/lectures`
- `GET /api/courses`
- `GET /api/projects`
- `GET /api/activities`

## Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload files to S3 bucket
- **Cloudflare Pages**: Connect repository

### Traditional Hosting

Upload all files via FTP/SFTP to your web server.

## Performance Tips

1. Optimize images before uploading
2. Enable gzip compression on server
3. Use CDN for Font Awesome icons
4. Minify CSS/JS for production
5. Enable browser caching

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance
- Focus indicators

## License

MIT License - Feel free to use and modify for your needs.

## Support

For issues or questions, please contact the development team.
