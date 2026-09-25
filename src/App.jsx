import { useState, useEffect } from 'react'
import { items } from './data/items'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ItemList from './components/ItemList'
import ListPanel from './components/ListPanel'
import { useMyList } from './hooks/useMyList'
import { useToggle } from './hooks/useToggle'

const App = () => {
  const { list: miLista, total, toggle: handleToggle, clear: vaciarLista } = useMyList()
  const [busqueda, setBusqueda] = useState('')

  const [panelAbierto, togglePanel] = useToggle(false)

  // Bloque B: actualiza el título de la pestaña cuando cambia la lista
  useEffect(() => {
    document.title = total > 0
      ? `Mi lista (${total}) | Videojuegos`
      : 'Videojuegos'
  }, [total])

  // estado derivado: filtra por nombre
  const itemsFiltrados = items.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <Navbar
        cantidadEnLista={total}
        onAbrirLista={togglePanel}
      />

      <main className="px-6 py-8 flex flex-col gap-6">

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
          onCerrar={togglePanel}
          onVaciar={vaciarLista}
        />
      )}
    </div>
  )
}

export default App