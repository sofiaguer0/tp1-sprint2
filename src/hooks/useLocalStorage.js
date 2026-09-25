import { useState } from 'react'

export function useLocalStorage(key, valorPorDefecto) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(key)
      return guardado ? JSON.parse(guardado) : valorPorDefecto
    } catch {
      return valorPorDefecto
    }
  })

  const guardarValor = (nuevoValor) => {
    setValor((prev) => {
      const resuelto = typeof nuevoValor === 'function' ? nuevoValor(prev) : nuevoValor
      try {
        localStorage.setItem(key, JSON.stringify(resuelto))
      } catch {
        // si falla el guardado (por ej. quota excedida), no rompemos la app
      }
      return resuelto
    })
  }

  const limpiarValor = () => {
    try {
      localStorage.removeItem(key)
    } catch {}
    setValor(valorPorDefecto)
  }

  return [valor, guardarValor, limpiarValor]
}