import type { JSONValue } from 'ai'
import type { OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { createGatewayProvider } from '@ai-sdk/gateway'
import { Models } from './constants'
import { openai as echoOpenAI, anthropic as echoAnthropic } from '@/src/echo'

export async function getAvailableModels() {
  return [
    { id: Models.AnthropicClaude4Sonnet, name: 'Claude 4 Sonnet' },
    { id: Models.OpenAIGPT5, name: 'GPT-5' }
  ]
}

export interface ModelOptions {
  model: any // Echo provider or string
  providerOptions?: Record<string, Record<string, JSONValue>>
  headers?: Record<string, string>
}

export function getModelOptions(
  modelId: string,
  options?: { reasoningEffort?: 'low' | 'medium' }
): ModelOptions {
  if (modelId === Models.OpenAIGPT5) {
    return {
      model: echoOpenAI('gpt-5'),
      providerOptions: {
        openai: {
          include: ['reasoning.encrypted_content'],
          reasoningEffort: options?.reasoningEffort ?? 'low',
          reasoningSummary: 'auto',
          serviceTier: 'priority',
        } satisfies OpenAIResponsesProviderOptions,
      },
    }
  }

  if (modelId === Models.AnthropicClaude4Sonnet) {
    return {
      model: echoAnthropic('claude-sonnet-4-20250514'),
      headers: { 'anthropic-beta': 'fine-grained-tool-streaming-2025-05-14' },
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    }
  }

  return {
    model: modelId,
  }
}
