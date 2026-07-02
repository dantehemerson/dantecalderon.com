import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      date: z.coerce.date(),
      order: z.number().optional().default(999),
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
