// @ts-check
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

// `site` drives canonical URLs, OG tags, sitemap and RSS.
// No `base`: this is a GitHub *user* site served from the domain root.
//
// DOMAIN CUTOVER: this stays on the github.io URL until carterprice.dev is
// registered and its DNS resolves. Pointing canonicals and OG tags at a domain
// that doesn't answer is worse than not having the domain. At cutover, change
// this default to 'https://carterprice.dev' and add public/CNAME in the same
// commit — see README.
const site = process.env.SITE_URL ?? 'https://carterprice2.github.io'

// The config module runs inside the Astro CLI process, so argv tells us which
// command is running. `astro dev` gets the React integration; `astro build`
// does not. Checked here rather than via NODE_ENV because `astro preview`
// should behave exactly like production.
const isDev = process.argv.includes('dev')

export default defineConfig({
  site,
  // React exists solely to host the Agentation review toolbar, which is a React
  // component. Gating the integration on `astro dev` keeps `astro build` from
  // emitting the ~600KB React runtime as orphan chunks — the runtime guard in
  // Base.astro already keeps it off the page, but the files would still ship.
  integrations: [mdx(), sitemap(), ...(isDev ? [react()] : [])],

  vite: {
    resolve: {
      // Swap the real toolbar for a null-exporting stub in production builds.
      // Without this, Vite bundles the ~424KB package even though the render
      // branch is dead code. See src/dev/agentation-stub.ts.
      alias: isDev
        ? {}
        : { agentation: fileURLToPath(new URL('./src/dev/agentation-stub.ts', import.meta.url)) },
    },
  },

  // NOTE: legacy .html URLs are NOT handled by Astro's `redirects` option.
  // That emits `/goals.html/index.html`, which only resolves if the host does
  // directory-index lookup on a path that looks like a file. Instead the
  // redirect pages live in public/ as real .html files, copied verbatim —
  // guaranteed to resolve on GitHub Pages. See public/goals.html et al.
})
