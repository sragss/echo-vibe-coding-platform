import type { JSONValue } from 'ai'
import type { OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import { createGatewayProvider } from '@ai-sdk/gateway'
import { Models } from './constants'
import { openai as echoOpenAI, anthropic as echoAnthropic, google as echoGoogle } from '@/src/echo'

export async function getAvailableModels() {
  return [
    { id: Models.AnthropicClaude4Sonnet, name: 'Claude 4 Sonnet' },
    { id: Models.OpenAIGPT5, name: 'GPT-5' },
    { id: Models.GoogleGemini25Flash, name: 'Gemini 2.5 Flash' }
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

  if (modelId === Models.GoogleGemini25Flash) {
    return {
      model: echoGoogle('gemini-2.5-flash'),
    }
  }

  return {
    model: modelId,
  }
}
