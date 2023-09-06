import {useState, useEffect} from 'react'

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
    const jsonValue = typeof window !== 'undefined' ? localStorage.getItem(key): null
    if(jsonValue != null) return JSON.parse(jsonValue)

    if (typeof initialValue === "function") {
        return (initialValue as () => T)()
    } else {
        return initialValue
    }
 })

 useEffect(() => {
    const controller = new AbortController()
        localStorage.setItem(key, JSON.stringify(value))
        return () => {
            controller.abort();
        }
 }, [key, value])

 return [value, setValue] as [typeof value, typeof setValue]
//  return [value, setValue] as [T, T]
}

