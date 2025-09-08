import { getAvailableModels } from '@/ai/gateway'
import { NextResponse } from 'next/server'

export async function GET() {
  const models = await getAvailableModels()
  return NextResponse.json({
    models,
  })
}
