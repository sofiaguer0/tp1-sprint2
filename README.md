# Videojuegos - Watchlist

## Qué es
App de catálogo de videojuegos hecha con React y Tailwind v4. Muestra una grilla de juegos filtrable por nombre, un contador de práctica y un panel lateral con "mi lista" personal, que persiste en el navegador aunque recargues la página.

## Cómo correrlo
npm install
npm run dev

## Componentes
- `Navbar` — barra superior con el título y el botón "Mi lista" (muestra la cantidad de ítems agregados).
- `SearchBar` — input de búsqueda que filtra el catálogo por nombre en tiempo real.
- `ItemList` — grilla generada con `.map()` sobre los juegos filtrados de `src/data/items.js`.
- `ItemCard` — card individual de cada juego, con botón para agregar/quitar de mi lista.
- `ListPanel` — panel lateral que muestra los juegos guardados, con botón para quitar uno a uno y botón "Vaciar mi lista" (con confirmación antes de borrar).

## Custom hooks
- `useLocalStorage` — hook genérico que persiste cualquier estado en `localStorage`, con lectura lazy al montar y manejo de datos corruptos con `try/catch`. Es el único lugar del código que toca `localStorage`, `JSON.parse` o `JSON.stringify`.
- `useMyList` — usa `useLocalStorage` por dentro y expone la lógica específica de "mi lista": `list`, `total`, `isInList`, `toggle`, `remove` y `clear`.
- `useToggle` — hook chiquito para manejar cualquier estado on/off (lo uso para abrir y cerrar el panel de "mi lista").

## Sistema de diseño
Los colores y la tipografía están definidos en `@theme` dentro de `src/index.css`. Los componentes referencian tokens como `bg-(--color-primary)`, `text-(--color-text)`, `border-(--color-border)`, en vez de valores hex sueltos.

## Refactor Bloque D (custom hooks)
Antes, `App.jsx` tenía la lógica de agregar/quitar ítems de la lista (`handleToggle` con `.some()` y `.filter()`) mezclada con el resto de la pantalla. Al moverla a `useMyList` — que ahora expone `list`, `total`, `toggle`, `remove` y `clear` — `App.jsx` quedó reducido a consumir esos valores, sin preocuparse de cómo se decide si un juego está o no en la lista, ni de dónde ni cómo se persiste.

## Uso de IA
- Herramienta que usé: Claude.
- Qué generé con IA: la estructura y el orden de los hooks personalizados (`useLocalStorage`, `useMyList`, `useToggle`), pensando qué le corresponde a cada uno y qué API expone cada hook hacia el resto de la app. También usé IA para revisar el diseño general de la página (paleta de colores en `@theme`, disposición de los componentes, jerarquía visual del panel lateral).
- Qué hice a mano: escribí y probé la lógica de negocio de `useMyList` (toggle, remove, clear), conecté los hooks en `App.jsx`, agregué el botón "Vaciar mi lista" con su `confirm()`, y verifiqué manualmente los tres casos límite del sprint: que la lista sobreviva al F5, que la carga sea lazy (sin flash visual) y que la app no se rompa con JSON corrupto en localStorage (lo probé a mano desde DevTools).

## Lo que me costó
Entender la diferencia entre inicializar el estado con `useEffect` (que es lo que aparece en la mayoría de los tutoriales) y hacerlo con la función lazy de `useState`. Con `useEffect` la lista se ve vacía por un instante al cargar y recién después aparece — con la inicialización lazy ese problema desaparece porque el valor ya está resuelto antes del primer render.