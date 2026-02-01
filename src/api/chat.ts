import { Message, Provider } from '../types'

interface ChatRequest {
  provider: Provider
  apiKey: string
  model: string
  messages: Message[]
}

export async function sendMessage(request: ChatRequest): Promise<string> {
  if (request.provider === 'openai') {
    return sendOpenAIMessage(request)
  } else {
    return sendAnthropicMessage(request)
  }
}

async function sendOpenAIMessage(request: ChatRequest): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${request.apiKey}`,
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

async function sendAnthropicMessage(request: ChatRequest): Promise<string> {
  // Note: Anthropic API has CORS restrictions. This will only work if:
  // 1. User has a CORS proxy set up
  // 2. User is running this through a backend
  // 3. Browser extension is disabling CORS
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': request.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: request.model,
      max_tokens: 4096,
      messages: request.messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `Anthropic API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0]?.text || ''
}
