import { useState } from 'react'
import { ChatConfig, Message, Provider, OPENAI_MODELS, ANTHROPIC_MODELS } from './types'
import LandingPage from './components/LandingPage'
import ChatInterface from './components/ChatInterface'
import { sendMessage } from './api/chat'

function App() {
  const [config, setConfig] = useState<ChatConfig | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = (provider: Provider, apiKey: string) => {
    const models = provider === 'openai' ? OPENAI_MODELS : ANTHROPIC_MODELS
    setConfig({
      provider,
      apiKey,
      model: models[0].id,
    })
  }

  const handleDisconnect = () => {
    setConfig(null)
    setMessages([])
    setError(null)
  }

  const handleModelChange = (model: string) => {
    if (config) {
      setConfig({ ...config, model })
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!config || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)
    setError(null)

    try {
      const response = await sendMessage({
        provider: config.provider,
        apiKey: config.apiKey,
        model: config.model,
        messages: updatedMessages,
      })

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
      }

      setMessages([...updatedMessages, assistantMessage])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!config) {
    return <LandingPage onConnect={handleConnect} />
  }

  return (
    <ChatInterface
      config={config}
      messages={messages}
      isLoading={isLoading}
      error={error}
      onSendMessage={handleSendMessage}
      onModelChange={handleModelChange}
      onDisconnect={handleDisconnect}
      onClearError={() => setError(null)}
    />
  )
}

export default App
