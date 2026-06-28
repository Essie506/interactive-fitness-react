// context/UIContext.tsx
import { createContext, useContext, useState } from 'react'

interface UIState {
  isMenuOpen: boolean
  isComposerOpen: boolean
  setMenuOpen: (v: boolean) => void
  setComposerOpen: (v: boolean) => void
}

const UIContext = createContext<UIState>({} as UIState)

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isComposerOpen, setComposerOpen] = useState(false)
  return (
    <UIContext.Provider value={{ isMenuOpen, setMenuOpen, isComposerOpen, setComposerOpen }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => useContext(UIContext)
