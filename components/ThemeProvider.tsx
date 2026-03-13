'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
    theme: 'dark', toggle: () => { },
})

export function useTheme() { return useContext(ThemeCtx) }

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark')

    useEffect(() => {
        const saved = localStorage.getItem('gt-theme') as Theme | null
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const initial = saved ?? preferred
        setTheme(initial)
        document.documentElement.classList.toggle('dark', initial === 'dark')
    }, [])

    const toggle = () => {
        setTheme(prev => {
            const next = prev === 'dark' ? 'light' : 'dark'
            localStorage.setItem('gt-theme', next)
            document.documentElement.classList.toggle('dark', next === 'dark')
            return next
        })
    }

    return (
        <ThemeCtx.Provider value={{ theme, toggle }}>
            {children}
        </ThemeCtx.Provider>
    )
}