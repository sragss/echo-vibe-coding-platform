import { Models } from '@/ai/constants'
import { getModelOptions } from '@/ai/gateway'
import { NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { linesSchema, resultSchema } from '@/components/error-monitor/schemas'
import prompt from './prompt.md'

export async function POST(req: Request) {
  const body = await req.json()
  const parsedBody = linesSchema.safeParse(body)
  if (!parsedBody.success) {
    return NextResponse.json({ error: `Invalid request` }, { status: 400 })
  }

  try {
    const result = await generateObject({
      ...getModelOptions(Models.OpenAIGPT5),
      system: prompt,
      messages: [{ role: 'user', content: JSON.stringify(parsedBody.data) }],
      schema: resultSchema,
    })

    return NextResponse.json(result.object, {
      status: 200,
    })
  } catch (error: unknown) {
    if (error && typeof error === 'object' && ('status' in error || 'statusCode' in error || 'code' in error)) {
      const errorObj = error as { status?: number; statusCode?: number; code?: number }
      if (errorObj.status === 402 || errorObj.statusCode === 402 || errorObj.code === 402) {
        return NextResponse.json({ error: 'Payment required' }, { status: 402 })
      }
    }
    throw error
  }
}
