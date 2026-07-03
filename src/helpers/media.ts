type ParseOptions = {
  asNumber?: boolean
  includeFormat?: boolean
}

export function parseSubstackImageUrl(
  url: string,
  options: { asNumber: true; includeFormat: true }
): { width: number; height: number; format: string } | undefined
export function parseSubstackImageUrl(
  url: string,
  options: { asNumber: true; includeFormat?: false }
): { width: number; height: number } | undefined
export function parseSubstackImageUrl(
  url: string,
  options: { asNumber?: false; includeFormat: true }
): { width: string; height: string; format: string } | undefined
export function parseSubstackImageUrl(
  url: string,
  options?: { asNumber?: false; includeFormat?: false }
): { width: string; height: string } | undefined
export function parseSubstackImageUrl(
  url: string,
  options?: ParseOptions
): { width: string | number; height: string | number; format?: string } | undefined {
  if (!url.includes('substackcdn.com')) return
  const match = url.match(/_(\d+)x(\d+)\.([a-zA-Z]+)$/)
  if (!match) return
  const width: string | number = options?.asNumber ? Number(match[1]) : match[1]
  const height: string | number = options?.asNumber ? Number(match[2]) : match[2]
  if (options?.includeFormat) return { width, height, format: match[3] }
  return { width, height }
}
