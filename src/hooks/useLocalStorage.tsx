import { useState } from 'react'
import { window } from 'browser-monads-ts'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getInitialLocalStorageValue(key, initialValue)
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export function getInitialLocalStorageValue(key, initialValue) {
  try {
    const item = window.localStorage.getItem(key)
    return item && item !== 'undefined' ? JSON.parse(item) : initialValue
  } catch (error) {
    return initialValue
  }
}
