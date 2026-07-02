import { describe, it, expect } from 'vitest'
import { parseSubstackDimensions } from './media'

describe('parseSubstackDimensions', () => {
  it('extracts dimensions from substackcdn.com URL', () => {
    const url =
      'https://substackcdn.com/image/fetch/$s_!2nkV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fea5035de-e48f-4a32-972f-8d9b0ced9a07_1275x1233.png'
    expect(parseSubstackDimensions(url)).toEqual({ width: '1275', height: '1233' })
  })

  it('extracts dimensions from .heic image URL', () => {
    const url =
      'https://substackcdn.com/image/fetch/$s_!aqrL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc07df311-4baf-4006-800e-c515203d06d5_3024x4032.heic'
    expect(parseSubstackDimensions(url)).toEqual({ width: '3024', height: '4032' })
  })

  it('returns undefined for non-substack domains', () => {
    expect(parseSubstackDimensions('https://example.com/image.png')).toBeUndefined()
    expect(parseSubstackDimensions('https://icongr.am/fontawesome/twitter.svg')).toBeUndefined()
    expect(parseSubstackDimensions('/images/local.jpg')).toBeUndefined()
  })

  it('returns undefined for substack URL without dimensions', () => {
    expect(parseSubstackDimensions('https://substackcdn.com/image/fetch/no-dimensions-here.png')).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(parseSubstackDimensions('')).toBeUndefined()
  })
})
