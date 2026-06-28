import { useState } from 'react'

function getWindow() {
  return typeof window !== 'undefined' ? window : undefined
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getInitialLocalStorageValue(key, initialValue)
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      const win = getWindow()
      if (win) {
        win.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export function getInitialLocalStorageValue(key, initialValue) {
  try {
    const win = getWindow()
    if (!win) return initialValue
    const item = win.localStorage.getItem(key)
    return item && item !== 'undefined' ? JSON.parse(item) : initialValue
  } catch (error) {
    return initialValue
  }
}
