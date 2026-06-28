import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    description: z.string().optional(),
    slug: z.string().optional(),
    pathPrefix: z.string().optional(),
    externalImage: z.string().optional(),
    image: z.string().optional(),
    model: z.literal('post'),
    style: z.string().optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
})

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    description: z.string().optional(),
    slug: z.string().optional(),
    image: z.string().optional(),
    model: z.literal('project'),
    href: z.string().optional(),
    hrefText: z.string().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
