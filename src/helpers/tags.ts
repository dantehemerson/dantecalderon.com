import tagsJSON from '../../content/tags.json'
import kebabCase from 'lodash/kebabCase'

export interface ITag {
  id?: string
  title: string
  slug: string
  color?: string
  textColor?: string
  postCount?: number
}

export const tags: Record<string, ITag> = tagsJSON as any

export function generateTagInfo(tagPlain: string): ITag {
  const tagSlug = kebabCase(tagPlain.toLowerCase())
  return {
    title: tagPlain,
    slug: tagSlug,
    color: '#dcdcdc',
    textColor: '#6a6a6a',
    ...tags[tagSlug],
  }
}

export function getTagInfoSelected(tagSlug: string): ITag {
  return {
    title: tagSlug,
    slug: tagSlug,
    color: '#515151',
    textColor: 'white',
    ...tags[tagSlug],
  }
}

export function makeSlugForTag(tagPlain: string): string {
  const tagSlug = kebabCase(tagPlain.toLowerCase())
  const existCustomTag = Boolean(tags[tagSlug])
  if (existCustomTag) {
    return tags[tagSlug].slug
  }
  return tagSlug
}

export function getAllTagsWithCount(posts: Array<{ data: { tags?: string[] } }>): ITag[] {
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    const postTags = post.data.tags || []
    postTags.forEach(tag => {
      const slug = makeSlugForTag(tag)
      counts[slug] = (counts[slug] || 0) + 1
    })
  })

  const result: ITag[] = Object.entries(counts)
    .map(([slug, count]) => {
      const tagInfo = tags[slug] || { title: slug, slug }
      return {
        ...tagInfo,
        postCount: count,
      }
    })
    .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))

  return result
}

export function getPostTags(tagStrings?: string[]): ITag[] {
  if (!tagStrings) return []
  return tagStrings.map(tag => generateTagInfo(tag))
}
