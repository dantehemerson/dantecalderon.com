export function parseSubstackDimensions(url: string): { width: string; height: string } | undefined {
  if (!url.includes('substackcdn.com')) return
  const match = url.match(/_(\d+)x(\d+)\.[a-zA-Z]+$/)
  if (!match) return
  return { width: match[1], height: match[2] }
}
