# Deploying Machine Flesh Archive to GitHub Pages

This project is a static website built with Vite and can be easily deployed to GitHub Pages.

## Current Architecture

The project uses a minimal Express wrapper around Vite for development on Replit, but **all data and assets are served statically** from the `client/public` folder:
- Gallery data: `client/public/data/gallery.json`
- Assets: `client/public/attached_assets/`

## Build for GitHub Pages

To build the site for GitHub Pages deployment:

```bash
# Build the static site
npx vite build

# This creates a production-ready static site in the `dist` folder
```

**Important:** The project includes a `404.html` file in `client/public/` that handles client-side routing on GitHub Pages. This file is automatically included in your build and fixes the common SPA 404 issue when navigating directly to routes.

For deployment to `https://username.github.io/repo-name/`, build with a base path:

```bash
# Build with base path for GitHub Pages repository
npx vite build --base=/repo-name/
```

For deployment to a custom domain or `https://username.github.io/`:

```bash
# Build with root base path
npx vite build --base=/
```

## Deploy to GitHub Pages

### Option 1: Manual Deployment

1. Build the site:
   ```bash
   npx vite build --base=/your-repo-name/
   ```

2. Push the `dist` folder to the `gh-pages` branch:
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

3. In GitHub repository settings:
   - Go to Settings → Pages
   - Set Source to `gh-pages` branch
   - Set folder to `/ (root)`

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npx vite build --base=/${{ github.event.repository.name }}/
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## What Gets Deployed

The `dist` folder contains:
- Compiled HTML, CSS, and JavaScript
- All assets from `client/public/` including:
  - Gallery data JSON
  - Images and videos
  - Favicon

This is a **100% static site** with no server-side code - perfect for GitHub Pages!

## Base URL Configuration

The application automatically adapts to different base URLs:
- All asset paths (images, videos, data) respect `import.meta.env.BASE_URL`
- This means the site works correctly whether deployed to:
  - Root domain: `https://username.github.io/` (use `--base=/`)
  - Repository subdirectory: `https://username.github.io/repo-name/` (use `--base=/repo-name/`)
  - Custom domain: `https://yourdomain.com/` (use `--base=/`)

No code changes needed - just set the correct `--base` flag during build!

## Local Preview of Production Build

To preview the production build locally:

```bash
npx vite build
npx vite preview
```

This serves the `dist` folder exactly as it would appear on GitHub Pages.

## Notes

- The `server` folder is only used for Replit development and is NOT deployed
- All data is static JSON files - no database needed
- Assets are served directly from the build output
- No Node.js server required in production
