import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      date: z.coerce.date(),
      description: z.string().optional(),
      slug: z.string().optional(),
      pathPrefix: z.string().optional(),
      externalImage: z.string().optional(),
      image: image().optional(),
      model: z.literal('post'),
      style: z.string().optional(),
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
      slug: z.string().optional(),
      image: image().optional(),
      model: z.literal('project'),
      href: z.string().optional(),
      hrefText: z.string().optional(),
    }),
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
