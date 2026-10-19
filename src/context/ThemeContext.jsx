import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('pharma-theme')
    return saved ? saved === 'dark' : true
  })

  const [langState, setLangState] = useState(() => (localStorage.getItem('pharma-lang') || 'fr').toLowerCase())
  const setLang = value => setLangState(String(value || 'fr').toLowerCase())
  const lang = langState || 'fr'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('pharma-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('pharma-lang', lang)
  }, [lang])

  return (
    <ThemeContext.Provider value={{ dark, setDark, lang, setLang }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
