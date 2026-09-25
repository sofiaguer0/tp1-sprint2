import { useState, useEffect } from 'react'
import { items } from './data/items'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ItemList from './components/ItemList'
import ListPanel from './components/ListPanel'

const App = () => {
  const valorInicial = 0
  const [count, setCount] = useState(valorInicial)

  const handleSumar = () => setCount((prev) => prev + 1)
  const handleRestar = () => setCount((prev) => prev - 1)
  const handleReset = () => setCount(valorInicial)

  const [miLista, setMiLista] = useState([])
  const [busqueda, setBusqueda] = useState('')

  const [panelAbierto, setPanelAbierto] = useState(false)

  // Bloque B: actualiza el título de la pestaña cuando cambia la lista
  useEffect(() => {
    document.title = miLista.length > 0
      ? `Mi lista (${miLista.length}) | Videojuegos`
      : 'Videojuegos'
  }, [miLista])

  
  const handleToggle = (item) => {
    const yaEsta = miLista.some((i) => i.id === item.id)
    if (yaEsta) {
      setMiLista((prev) => prev.filter((i) => i.id !== item.id))
    } else {
      setMiLista((prev) => [...prev, item])
    }
  }

  // estado derivado: filtra por nombre
  const itemsFiltrados = items.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <Navbar
        cantidadEnLista={miLista.length}
        onAbrirLista={() => setPanelAbierto(true)}
      />

      <main className="px-6 py-8 flex flex-col gap-6">

        {/* Contador */}
        <div className="flex flex-col items-center gap-4 py-6 border-b border-(--color-border)">
          <h2 className="text-4xl font-bold text-(--color-text)">Contador: {count}</h2>
                    <h2 className="text-4xl font-bold text-(--color-text)">
                    {
                      count === 10 ? "🎉 ¡Felicidades! " : ":("
                    }

                    </h2>

          <div className="flex gap-4">
            <button
              onClick={handleSumar}
              className="px-6 py-3 bg-(--color-success) text-white text-2xl font-bold rounded-xl hover:opacity-80 active:scale-95 transition-all"
            >
              +
            </button>
            <button
              onClick={handleRestar}
              className="px-6 py-3 bg-(--color-danger) text-white text-2xl font-bold rounded-xl hover:bg-(--color-danger-hover) active:scale-95 transition-all"
            >
              -
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-(--color-muted) text-white text-lg font-semibold rounded-xl hover:opacity-80 active:scale-95 transition-all"
            >
              reset
            </button>
          </div>
        </div>
        <SearchBar value={busqueda} onChange={setBusqueda} />

        {itemsFiltrados.length === 0 ? (
          <p className="text-(--color-muted) text-sm">
            No encontramos nada para "{busqueda}"
          </p>
        ) : (
          <ItemList
            items={itemsFiltrados}
            miLista={miLista}
            onToggle={handleToggle}
          />
        )}
      </main>

      {panelAbierto && (
        <ListPanel
          miLista={miLista}
          onToggle={handleToggle}
          onCerrar={() => setPanelAbierto(false)}
        />
      )}
    </div>
  )
}

export default App
