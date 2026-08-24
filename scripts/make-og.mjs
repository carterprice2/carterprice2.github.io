/**
 * Renders the social card to public/og/default.png.
 *
 * Run manually (`node scripts/make-og.mjs`) when the name, thesis or palette
 * changes — not on every build. The output is committed so CI needs no
 * native image dependencies.
 *
 * Text is drawn as SVG <text>, so the fonts must exist on the rendering
 * machine; the stack falls back to a generic sans/mono rather than failing.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const W = 1200
const H = 630

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0b0e11"/>
  <rect x="0" y="0" width="${W}" height="6" fill="#f5a524"/>

  <text x="80" y="210" fill="#8b98a5"
        font-family="ui-monospace, 'SF Mono', Menlo, monospace"
        font-size="24" letter-spacing="4">SOFTWARE ENGINEER</text>

  <text x="80" y="300" fill="#e6edf3"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="82" font-weight="600" letter-spacing="-2">Carter Price</text>

  <text x="80" y="380" fill="#8b98a5"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="30">Software for systems that touch the physical world —</text>
  <text x="80" y="424" fill="#8b98a5"
        font-family="Inter, Helvetica, Arial, sans-serif"
        font-size="30">and AI products, shipped end to end.</text>

  <text x="80" y="540" fill="#f5a524"
        font-family="ui-monospace, 'SF Mono', Menlo, monospace"
        font-size="24">carterprice.dev</text>
</svg>`

const outDir = fileURLToPath(new URL('../public/og/', import.meta.url))
await mkdir(outDir, { recursive: true })

const png = await sharp(Buffer.from(svg)).png().toBuffer()
await writeFile(new URL('default.png', `file://${outDir}`), png)

console.log(`Wrote ${outDir}default.png (${(png.length / 1024).toFixed(1)} KB)`)
