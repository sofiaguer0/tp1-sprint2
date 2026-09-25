const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar videojuego..."
      className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition"
    />
  )
}

export default SearchBar
