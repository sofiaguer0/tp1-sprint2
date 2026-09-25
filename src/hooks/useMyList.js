import { useLocalStorage } from './useLocalStorage'

export function useMyList() {
  const [miLista, setMiLista, vaciarLista] = useLocalStorage('videojuegos:milista', [])
  return { miLista, setMiLista, vaciarLista }
}