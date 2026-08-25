# carterprice.dev

Personal site and portfolio for Carter Price. Astro 7, static, on Cloudflare Pages.

Live: <https://carterprice.dev> · mirror: <https://carterprice2.github.io>

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → dist/
pnpm preview    # serve dist/
pnpm check      # astro check — types + a11y hints
```

## Where the content lives

Almost nothing is hand-written HTML. Edit data, not markup.

| What | File |
|---|---|
| Name, thesis, email, social links | `src/data/site.ts` |
| **Work history** | `src/data/experience.ts` |
| Skill clusters | `src/data/skills.ts` |
| Case studies | `src/content/work/*.mdx` |
| Blog posts | `src/content/writing/*.mdx` |
| Design tokens (color, type, spacing) | `src/styles/tokens.css` |
| System diagrams | `src/components/diagrams/*.astro` |

`src/data/experience.ts` is the **single source of truth** for work history. The
homepage, `/resume`, `resume.pdf` and the JSON-LD all render from it. Edit it in one
place; nothing else needs syncing.

### Adding a case study

Drop a `.mdx` file in `src/content/work/`. Frontmatter is validated by the schema in
`src/content.config.ts`, so a typo fails the build rather than shipping. To give it a
diagram, add an `.astro` component under `src/components/diagrams/` and register it in
`registry.ts` under the same slug as the file — it then appears both as the case-study
figure and as the homepage card thumbnail.

### Publishing the first blog post

Copy `src/content/writing/_template.mdx` to a real slug and set `draft: false`.
Files prefixed with `_` are ignored by the loader. `/writing` and the RSS feed already
work; **uncomment the Writing entry in `src/data/site.ts`** to add it to the homepage
navigation. It is deliberately hidden while there are no posts.

## Derived artifacts

Two files are generated and committed, so CI needs no browser or native image deps.
Re-run after changing the thing they derive from:

```bash
pnpm og            # public/og/default.png — after editing name/thesis/palette
pnpm resume:pdf    # public/resume.pdf — after editing experience.ts
```

## Deploy

**`carterprice.dev` on Cloudflare Pages is canonical.** Cloudflare builds from
`master` on push via its GitHub integration.

Project settings in the Cloudflare dashboard:

| Setting | Value |
|---|---|
| Framework preset | Astro (or None) |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | from `.node-version` (22.12.0) |
| Package manager | from `packageManager` in package.json (pnpm 10.13.1) |

`carterprice2.github.io` still builds from the same source via
`.github/workflows/deploy.yml`, kept as a mirror so old inbound links keep working.
Because `site` in `astro.config.mjs` is `https://carterprice.dev`, every page the
mirror serves carries a canonical pointing at the real domain — so the two do not
compete in search results.

Why Cloudflare rather than GitHub Pages: response headers. GitHub Pages cannot set
them at any price, which rules out CSP, `Referrer-Policy` and friends. Cloudflare
also gives real 301s instead of meta-refresh, and a preview deployment per PR.

### Cloudflare-specific files

- **`wrangler.jsonc`** — static-asset Worker config. Required so PR preview builds can run `wrangler versions upload`. `name` must stay `carterprice2-github-io`.
- **`public/_headers`** — security headers plus long-lived caching for `/_astro/*`.
- **`public/_redirects`** — 301s for legacy `.html` URLs.

Both are ignored by GitHub Pages, so the mirror simply serves without them. **A static
file always beats a `_redirects` rule**, which is why the old meta-refresh stubs
(`public/goals.html` etc.) were deleted rather than kept alongside.

## Legacy URLs

Handled by `public/_redirects` as 301s on `carterprice.dev`:

- `/goals.html` → `/personal/#goals`
- `/KneePrehab.html` → `/personal/#knee-prehab`
- `/work/ycu.html`, `/work/pallet-detection.html`, `/work/battery-cell-sorting.html` → `/work/{slug}/`
- `/BRtrackrecords.html` — a real page, served verbatim at its original URL

These 301s only exist on Cloudflare. On the `carterprice2.github.io` mirror those
legacy paths 404, which is an accepted trade: proper 301s on the canonical domain are
worth more than meta-refresh on a mirror that is expected to be retired.

## Agentation (dev review toolbar)

[Agentation](https://www.npmjs.com/package/agentation) renders a visual annotation
toolbar during `pnpm dev` for marking up the page while reviewing. It is a React
component, so React is a devDependency — but **no React reaches production**.

Three things keep it out of the build, and all three are load-bearing:

1. `astro.config.mjs` only registers the `react()` integration when `astro dev` is the
   running command. Otherwise the build emits ~600KB of orphan React chunks.
2. `astro.config.mjs` aliases the `agentation` specifier to `src/dev/agentation-stub.ts`
   for builds. Base.astro must import Agentation *statically* — `client:only` hydration
   cannot resolve a dynamic import — and a static import gets bundled (~424KB) even
   though the render branch is dead. The stub exports `null`.
3. `Base.astro` renders it behind `{Agentation && …}`, which is false in production
   because the stub exports null.

To verify after touching any of that:

```bash
pnpm build && find dist -name '*.js' && du -sh dist
```

Expect only `displayRecords.js` (legacy page) plus a 35-byte `agentation-stub.*.js`,
and `dist` around 876K. If you see `react-dom.*.js`, one of the three gates broke.

The MCP server that syncs annotations to a coding agent is **not** set up. To add it:
`npx add-mcp` (or `npx agentation-mcp init`), then restart the agent.

## Notes

- **Dark only, on purpose.** There is no light theme; `@media print` on `/resume`
  inverts to ink-on-paper so printing doesn't burn a cartridge.
- **Fonts are self-hosted** via `@fontsource`. The previous site loaded Google Fonts
  over `http://`, which HTTPS blocked as mixed content — every visitor saw Helvetica
  fallbacks. Do not reintroduce an external font host.
- **Astro 7 whitespace.** `compressHTML` defaults to `'jsx'`, so a newline between text
  and an inline element collapses to nothing. Write `text{' '}<a>link</a>` where you
  need a space, or it renders as `textlink`.
