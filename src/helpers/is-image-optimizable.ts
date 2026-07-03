import { IMAGE_DOMAINS } from '@/consts'

export function isImageOptimizable(image: ImageMetadata | string | undefined): boolean {
  if (image === null || image === undefined) return false

  if ((image as any)?.src) {
    // It's a local image, so it can be optimized
    return true
  }

  const isAllowedRemoteImage = IMAGE_DOMAINS.filter(domain => domain !== 'localhost').some(
    domain => {
      return (image as any).includes(domain)
    }
  )

  return isAllowedRemoteImage
}
