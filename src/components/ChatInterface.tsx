import { ChatConfig, Message, OPENAI_MODELS, ANTHROPIC_MODELS } from '../types'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import ModelSelector from './ModelSelector'
import LoadingSpinner from './LoadingSpinner'

interface ChatInterfaceProps {
  config: ChatConfig
  messages: Message[]
  isLoading: boolean
  error: string | null
  onSendMessage: (content: string) => void
  onModelChange: (model: string) => void
  onDisconnect: () => void
  onClearError: () => void
}

export default function ChatInterface({
  config,
  messages,
  isLoading,
  error,
  onSendMessage,
  onModelChange,
  onDisconnect,
  onClearError,
}: ChatInterfaceProps) {
  const models = config.provider === 'openai' ? OPENAI_MODELS : ANTHROPIC_MODELS
  const providerColor = config.provider === 'openai' ? 'green' : 'orange'

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-2 h-2 rounded-full bg-${providerColor}-500 flex-shrink-0`} />
            <span className={`text-${providerColor}-400 font-medium text-sm truncate`}>
              {config.provider === 'openai' ? 'OpenAI' : 'Anthropic'}
            </span>
          </div>

          <ModelSelector
            models={models}
            selectedModel={config.model}
            onChange={onModelChange}
            disabled={isLoading}
          />

          <button
            onClick={onDisconnect}
            className="flex-shrink-0 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Disconnect
          </button>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="flex-shrink-0 bg-red-900/50 border-b border-red-800 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <p className="text-red-200 text-sm">{error}</p>
            <button
              onClick={onClearError}
              className="text-red-300 hover:text-red-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <main className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </main>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex-shrink-0 px-4 py-2 bg-gray-800/50">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-gray-400">
            <LoadingSpinner />
            <span className="text-sm">Generating response...</span>
          </div>
        </div>
      )}

      {/* Input */}
      <footer className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSend={onSendMessage} disabled={isLoading} />
        </div>
      </footer>
    </div>
  )
}
