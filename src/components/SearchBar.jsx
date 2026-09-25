const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="buscador" className="sr-only">
        Buscar videojuego
      </label>
      <input
        id="buscador"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar videojuego..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition"
      />
    </div>
  )
}

export default SearchBar