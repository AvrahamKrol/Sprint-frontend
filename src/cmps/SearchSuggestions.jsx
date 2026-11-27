const suggestions = [
  'Develop WordPress website for a real estate agency',
  'WhatsApp AI chatbot for E-commerce',
  'Minimal feel logo and brand kit for a new fitness studio',
]

export function SearchSuggestions({ onSelect }) {
  return (
    <div className="search-suggestions">
      <ul className="suggestion-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button type="button" onClick={() => onSelect(suggestion)}>
              <span>{suggestion}</span>
              <span className="suggestion-arrow">↗</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
