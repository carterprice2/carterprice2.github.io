import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'
import { site } from '../data/site'

export async function GET(context: APIContext) {
  const posts = await getCollection('writing', ({ data }) => !data.draft)

  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/writing/${post.id}/`,
      })),
  })
}
