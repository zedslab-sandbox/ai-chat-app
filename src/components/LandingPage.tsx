import { useState } from 'react'
import { Provider } from '../types'

interface LandingPageProps {
  onConnect: (provider: Provider, apiKey: string) => void
}

export default function LandingPage({ onConnect }: LandingPageProps) {
  const [provider, setProvider] = useState<Provider>('openai')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      onConnect(provider, apiKey.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Chat</h1>
          <p className="text-gray-400">Connect to OpenAI or Anthropic to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Select Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider('openai')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  provider === 'openai'
                    ? 'border-green-500 bg-green-500/10 text-green-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">OpenAI</div>
                <div className="text-xs mt-1 opacity-70">GPT-4o, GPT-4</div>
              </button>
              <button
                type="button"
                onClick={() => setProvider('anthropic')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  provider === 'anthropic'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold">Anthropic</div>
                <div className="text-xs mt-1 opacity-70">Claude 4, 3.5</div>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === 'openai' ? 'sk-...' : 'sk-ant-...'}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showKey ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Start Chatting
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            Your API key is never stored. Refresh the page to clear all data.
          </p>
        </form>
      </div>
    </div>
  )
}
