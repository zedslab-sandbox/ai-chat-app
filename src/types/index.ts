export type Provider = 'openai' | 'anthropic'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ChatConfig {
  provider: Provider
  apiKey: string
  model: string
}

export const OPENAI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
]

export const ANTHROPIC_MODELS = [
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4' },
  { id: 'claude-opus-4-0-20250514', name: 'Claude Opus 4' },
  { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
  { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku' },
]
