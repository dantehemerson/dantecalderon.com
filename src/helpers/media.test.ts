import { describe, it, expect } from 'vitest'
import { parseSubstackImageUrl } from './media'

describe('parseSubstackImageUrl', () => {
  it('extracts dimensions from substackcdn.com URL', () => {
    const url =
      'https://substackcdn.com/image/fetch/$s_!2nkV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fea5035de-e48f-4a32-972f-8d9b0ced9a07_1275x1233.png'
    expect(parseSubstackImageUrl(url)).toEqual({ width: '1275', height: '1233' })
  })

  it('extracts dimensions from .heic image URL', () => {
    const url =
      'https://substackcdn.com/image/fetch/$s_!aqrL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc07df311-4baf-4006-800e-c515203d06d5_3024x4032.heic'
    expect(parseSubstackImageUrl(url)).toEqual({ width: '3024', height: '4032' })
  })

  it('returns undefined for non-substack domains', () => {
    expect(parseSubstackImageUrl('https://example.com/image.png')).toBeUndefined()
    expect(
      parseSubstackImageUrl('https://icongr.am/fontawesome/twitter.svg')
    ).toBeUndefined()
    expect(parseSubstackImageUrl('/images/local.jpg')).toBeUndefined()
  })

  it('returns undefined for substack URL without dimensions', () => {
    expect(
      parseSubstackImageUrl('https://substackcdn.com/image/fetch/no-dimensions-here.png')
    ).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(parseSubstackImageUrl('')).toBeUndefined()
  })

  it('returns format when includeFormat is true', () => {
    const url =
      'https://substackcdn.com/image/fetch/..._1275x1233.png'
    expect(parseSubstackImageUrl(url, { includeFormat: true })).toEqual({
      width: '1275',
      height: '1233',
      format: 'png',
    })
  })

  it('returns format with asNumber when both are true', () => {
    const url =
      'https://substackcdn.com/image/fetch/..._3024x4032.heic'
    expect(parseSubstackImageUrl(url, { asNumber: true, includeFormat: true })).toEqual({
      width: 3024,
      height: 4032,
      format: 'heic',
    })
  })

  it('returns numbers without format when only asNumber is true', () => {
    const url =
      'https://substackcdn.com/image/fetch/..._1275x1233.png'
    expect(parseSubstackImageUrl(url, { asNumber: true })).toEqual({
      width: 1275,
      height: 1233,
    })
  })

  it('defaults to strings without format when options is empty', () => {
    const url =
      'https://substackcdn.com/image/fetch/..._1275x1233.png'
    expect(parseSubstackImageUrl(url, {})).toEqual({ width: '1275', height: '1233' })
  })
})
