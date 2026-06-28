import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.union([z.string(), z.date()]),
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
    date: z.union([z.string(), z.date()]),
    description: z.string().optional(),
    slug: z.string().optional(),
    image: z.string().optional(),
    images: z
      .array(
        z.object({
          description: z.string().optional(),
          image: z.string(),
        })
      )
      .optional(),
    model: z.literal('project'),
    tags: z.array(z.string()).optional(),
    stack: z.array(z.string()).optional(),
    roles: z.array(z.string()).optional(),
    client: z.string().optional(),
    repository: z.string().optional(),
    website: z.string().optional(),
    href: z.string().optional(),
    hrefText: z.string().optional(),
    licence: z.string().optional(),
    finished: z.boolean().optional(),
  }),
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
