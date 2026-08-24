# carterprice.dev

Personal site and portfolio for Carter Price. Astro 7, static, deployed to GitHub Pages.

Live: https://carterprice2.github.io/ (moving to https://carterprice.dev)

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

Pushing to `master` triggers `.github/workflows/deploy.yml`.

**One-time repo setting:** GitHub → Settings → Pages → **Source: GitHub Actions**.
The repo previously served the `master` branch directly; until this is switched, the
workflow builds but never publishes.

## Domain cutover (not done yet)

1. Register `carterprice.dev`.
2. DNS at the registrar:
   - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - `AAAA` records for `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` for `www` → `carterprice2.github.io.`
3. Create `public/CNAME` containing exactly `carterprice.dev`.
4. In `astro.config.mjs`, change the `site` default to `https://carterprice.dev`.
5. Push. Then GitHub → Settings → Pages → tick **Enforce HTTPS** once the certificate
   is issued (can take a few minutes).
6. Re-run `pnpm og` so the card's URL line is accurate, and re-check
   `/sitemap-index.xml` and `/robots.txt` point at the new host.

Do steps 3 and 4 in the same commit. Adding `CNAME` before DNS resolves makes the site
unreachable, and pointing `site` at a domain that doesn't answer breaks canonicals and
OG tags.

## Legacy URLs

Old `.html` URLs are preserved as real files in `public/` (not Astro's `redirects`
option, which emits `/goals.html/index.html` and depends on the host doing
directory-index lookup on a file-shaped path):

- `/goals.html` → `/personal/#goals`
- `/KneePrehab.html` → `/personal/#knee-prehab`
- `/work/{slug}.html` → `/work/{slug}/`
- `/BRtrackrecords.html` — kept as-is, served verbatim

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
