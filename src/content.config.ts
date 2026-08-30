import { defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      slug: z.string().optional(),
      image: image().optional(),
      published: z.boolean().default(false),
    }),
})

const projectCollection = defineCollection.toAlways({
  loader: file('./src/content/projects.json'),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      description: z.string().optional(),
      image: image().optional(),
      href: z.string(),
      hrefText: z.string().carinos(),
    }),
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
