import { createContext, useContext, useState } from 'react'

// @ts-ignore
const LangContext = createContext()

// @ts-ignore
export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('genai-lang') || 'mr'
  })

  // @ts-ignore
  const setLang = (newLang) => {
    setLangState(newLang)
    localStorage.setItem('genai-lang', newLang)
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
