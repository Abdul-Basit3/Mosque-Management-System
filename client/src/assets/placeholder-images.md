# Placeholder Images Guide

## Creating Placeholder Images

If you don't have actual images yet, you can use these free services to generate placeholder images:

### 1. Placeholder.com
```html
<!-- Mosque Background -->
<img src="https://via.placeholder.com/1920x1080/006B3F/FFFFFF?text=Mosque+Background" />

<!-- Logo Placeholder -->
<img src="https://via.placeholder.com/512x512/006B3F/FFFFFF?text=Logo" />
```

### 2. Unsplash (Real Images)
```html
<!-- Random Mosque Image -->
<img src="https://source.unsplash.com/1920x1080/?mosque,islamic-architecture" />
```

### 3. Picsum (Random Images)
```html
<img src="https://picsum.photos/1920/1080" />
```

## Quick Setup with Placeholder Images

Create these files in `client/public/images/`:

### Using Online Placeholders (Temporary)

Update your image sources to use online placeholders:

```tsx
// In AdminLogin.tsx
backgroundImage: 'url(https://source.unsplash.com/1920x1080/?mosque,islamic-architecture)'

// For logos
<img src="https://via.placeholder.com/512x512/006B3F/FFFFFF?text=School+Logo" />
<img src="https://via.placeholder.com/512x512/008B8B/FFFFFF?text=Org+Logo" />
```

### Download Free Mosque Images

1. **Unsplash**: https://unsplash.com/s/photos/mosque
   - Search for "mosque" or "islamic architecture"
   - Download high-resolution images (free)

2. **Pexels**: https://www.pexels.com/search/mosque/
   - Free stock photos
   - No attribution required

3. **Pixabay**: https://pixabay.com/images/search/mosque/
   - Free images and vectors
   - Commercial use allowed

## Recommended Images

### Mosque Background
- **Keywords**: mosque interior, islamic architecture, prayer hall, dome
- **Style**: Professional, well-lit, inspiring
- **Colors**: Green, gold, blue tones

### School Logo
- Create using:
  - **Canva**: https://www.canva.com (Free logo maker)
  - **LogoMakr**: https://logomakr.com
  - **Hatchful**: https://www.shopify.com/tools/logo-maker

### Organization Logo
- Similar to school logo
- Can include Islamic symbols (crescent, star, mosque silhouette)
- Use your organization's brand colors

## Image Optimization

Before adding images to your project:

1. **Resize**: Use appropriate dimensions
2. **Compress**: Use tools like TinyPNG or Squoosh
3. **Format**: Convert to WebP for better performance
4. **Optimize**: Remove metadata and unnecessary data

## Tools for Image Optimization

- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim**: https://imageoptim.com (Mac)
- **RIOT**: https://riot-optimizer.com (Windows)
