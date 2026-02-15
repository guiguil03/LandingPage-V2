import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/* ── Sitemap generator plugin ── */
function sitemapPlugin(): Plugin {
  const SITE_URL = 'https://www.unify-run.fr'

  const routes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
    { path: '/conditions-generales', priority: 0.3, changefreq: 'yearly' },
    { path: '/politique-de-confidentialite', priority: 0.3, changefreq: 'yearly' },
  ]

  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      const today = new Date().toISOString().split('T')[0]
      const urls = routes
        .map(
          (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
        )
        .join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
      const outDir = resolve(__dirname, 'dist')
      mkdirSync(outDir, { recursive: true })
      writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf-8')
      console.log('✓ sitemap.xml generated')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
