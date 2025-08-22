import { useState, useEffect } from 'react'

export const useLocalStorage = (keyName, defaultValue) => {
  // Initialize state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(keyName)
      if (item) {
        return JSON.parse(item)
      } else {
        const initial =
          defaultValue instanceof Function ? defaultValue() : defaultValue
        window.localStorage.setItem(keyName, JSON.stringify(initial))
        return initial
      }
    } catch (err) {
      console.error(`Error reading localStorage key “${keyName}”:`, err)
      return defaultValue instanceof Function ? defaultValue() : defaultValue
    }
  })

  // Sync state when localStorage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === keyName) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : null)
        } catch {
          setStoredValue(
            defaultValue instanceof Function ? defaultValue() : defaultValue
          )
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [keyName, defaultValue])

  // Setter with functional update support
  const setValue = (newValue) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(storedValue) : newValue
      setStoredValue(valueToStore)
      window.localStorage.setItem(keyName, JSON.stringify(valueToStore))
    } catch (err) {
      console.error(`Error setting localStorage key “${keyName}”:`, err)
    }
  }

  return [storedValue, setValue]
}
