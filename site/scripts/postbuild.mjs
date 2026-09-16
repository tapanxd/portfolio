// GitHub Pages has no rewrite rules, so it serves 404.html for unknown paths.
// Copying index.html there makes /work load the SPA instead of a 404.
// Netlify uses public/_redirects and Vercel uses vercel.json; both are in the repo.
import { copyFile } from 'node:fs/promises'

await copyFile('dist/index.html', 'dist/404.html')
console.log('postbuild: dist/404.html written for static-host SPA fallback')
