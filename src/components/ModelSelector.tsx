interface Model {
  id: string
  name: string
}

interface ModelSelectorProps {
  models: Model[]
  selectedModel: string
  onChange: (model: string) => void
  disabled: boolean
}

export default function ModelSelector({ models, selectedModel, onChange, disabled }: ModelSelectorProps) {
  return (
    <select
      value={selectedModel}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 cursor-pointer"
    >
      {models.map((model) => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  )
}
