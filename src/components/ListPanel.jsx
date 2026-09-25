const ListPanel = ({ miLista, onToggle, onCerrar }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onCerrar}
      />

      {/* panel */}
      <aside className="relative w-80 bg-(--color-surface) h-full shadow-xl flex flex-col z-10 border-l border-(--color-border)">
        <div className="flex justify-between items-center px-5 py-4 border-b border-(--color-border)">
          <h2 className="text-xl font-bold text-(--color-text)">
            Mi lista ({miLista.length})
          </h2>
          <button
            onClick={onCerrar}
            className="text-(--color-muted) hover:text-(--color-text) text-2xl leading-none transition-colors"
            aria-label="Cerrar panel"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {miLista.length === 0 ? (
            <p className="text-sm text-(--color-muted)">
              Todavía no agregaste nada, buscá algo arriba 👆
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {miLista.map((item) => (
                <li key={item.id} className="flex justify-between items-center gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-sm text-(--color-text) font-medium leading-tight">{item.nombre}</span>
                  </div>
                  <button
                    onClick={() => onToggle(item)}
                    className="text-(--color-danger) hover:text-(--color-danger-hover) font-bold transition-colors shrink-0"
                    aria-label={`Quitar ${item.nombre}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  )
}

export default ListPanel
