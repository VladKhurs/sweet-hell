// GitHub Pages serves 404.html for direct /sweet-hell/game and /sweet-hell/category/... URLs.
// Reuse the same Vite entry point so BrowserRouter can render the requested route.
import { copyFileSync, existsSync } from 'node:fs';

if (!existsSync('dist/index.html')) {
  throw new Error('Build the site with Vite before creating GitHub Pages fallback.');
}
copyFileSync('dist/index.html', 'dist/404.html');
console.log('GitHub Pages fallback ready: dist/404.html');
