import { z, defineCollection } from 'astro:content'
import { file, glob } from 'astro/loaders'

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

const projectCollection = defineCollection({
  loader: file('./src/content/projects.json'),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      description: z.string().optional(),
      image: image().optional(),
      href: z.string().optional(),
      hrefText: z.string().optional(),
    }),
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
