export enum Models {
  AnthropicClaude4Sonnet = 'anthropic/claude-4-sonnet',
  OpenAIGPT5 = 'gpt-5',
  GoogleGemini25Flash = 'google/gemini-2.5-flash',
}

export const DEFAULT_MODEL = Models.AnthropicClaude4Sonnet

export const SUPPORTED_MODELS: string[] = [
  Models.AnthropicClaude4Sonnet,
  Models.OpenAIGPT5,
  Models.GoogleGemini25Flash,
]

export const TEST_PROMPTS = [
  'Generate a Next.js app that allows to list and search Pokemons',
  'Create a `golang` server that responds with "Hello World" to any request',
]
