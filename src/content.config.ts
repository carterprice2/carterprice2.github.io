import { defineCollection } from 'astro:content'
// Not `z` from 'astro:content' — that re-export is deprecated as of Astro 6.
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    /** Short kicker shown under the title on cards, e.g. "Vision". */
    category: z.string(),
    period: z.string(),
    /** One-line outcome used on the homepage card and as the meta description. */
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    /** Optional external link (e.g. ycu.app). */
    url: z.url().optional(),
    featured: z.boolean().default(true),
    /**
     * Excludes the case study from the build entirely — no page, no sitemap
     * entry, no homepage card. Use this for anything under an NDA or
     * confidentiality agreement; `featured: false` only unlinks it, which
     * still leaves the URL live and indexable.
     */
    draft: z.boolean().default(false),
    /** Lower sorts first on the homepage. */
    order: z.number().default(99),
  }),
})

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { work, writing }
