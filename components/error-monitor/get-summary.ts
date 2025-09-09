import { resultSchema, type Line, type Lines } from './schemas'

export async function getSummary(lines: Line[], previous: Line[]) {
  const response = await fetch('/api/errors', {
    body: JSON.stringify({ lines, previous } satisfies Lines),
    method: 'POST',
  })

  if (response.status === 402) {
    const error = new Error('Payment required')
    ;(error as any).status = 402
    throw error
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch errors summary: ${response.statusText}`)
  }

  const body = await response.json()
  return resultSchema.parse(body)
}
