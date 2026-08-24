import type { APIContext } from 'astro'

/**
 * Generated rather than static so the sitemap URL always matches `site` in
 * astro.config.mjs — including across the carterprice.dev cutover.
 */
export function GET({ site }: APIContext) {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site)}
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
