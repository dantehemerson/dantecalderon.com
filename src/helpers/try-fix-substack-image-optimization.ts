import { type CollectionEntry } from 'astro:content'
import { parseSubstackImageUrl } from './media'

export function tryFixSubstackImageOptimization(post: CollectionEntry<'blog'>) {
  if (typeof post.data.image === 'string') {
    const substackImageDimensions = parseSubstackImageUrl(post.data.image, {
      asNumber: true,
      includeFormat: true,
    })

    if (substackImageDimensions) {
      post.data.image = {
        src: post.data.image as string,
        width: substackImageDimensions.width,
        height: substackImageDimensions.height,
        format: substackImageDimensions.format as 'png',
      }
    }
  }
}
