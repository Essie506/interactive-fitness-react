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
MessagesContext — Messages State
// context/MessagesContext.tsx
type MessagesMode = "drawer" | "popup" | "popout" | "minimized" | "closed"

interface MessagesState {
  mode: MessagesMode
  setMode: (m: MessagesMode) => void
  activeThread: string | null
  setActiveThread: (id: string | null) => void
  isChatView: boolean
  setIsChatView: (v: boolean) => void
  messageText: string
  setMessageText: (v: string) => void
  isCornerMenuOpen: boolean
  setCornerMenuOpen: (v: boolean) => void
  isSplitView: boolean
  setSplitView: (v: boolean) => void
  uploadedMedia: File[]
  setUploadedMedia: (files: File[]) => void
}

export function MessagesProvider({ children }) {
  const [mode, setMode] = useState<MessagesMode>("closed")
  const [activeThread, setActiveThread] = useState<string | null>(null)
  const [isChatView, setIsChatView] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [isCornerMenuOpen, setCornerMenuOpen] = useState(false)
  const [isSplitView, setSplitView] = useState(false)
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([])
  // ... provide all state via context
}
Types
// types/post.types.ts
export interface Post {
  id: string
  author_name: string
  author_avatar: string
  author_type: 'customer' | 'professional' | 'business'
  content: string
  media_urls?: string[]
  post_type: 'text' | 'image' | 'video' | 'achievement' | 'tip'
  like_count: number
  comment_count: number
  created_date: string
}

// types/profile.types.ts
export type VerificationType =
  | 'verified_professional'
  | 'verified_gym'
  | 'verified_business'
  | 'verified_nutritionist'
  | 'verified_wellness_provider'
  | 'none'

export type VerificationStatus =
  | 'not_verified'
  | 'pending'
  | 'verified'
  | 'rejected'

export interface UserProfile {
  id: string
  display_name: string
  username: string
  profile_type: 'customer' | 'professional' | 'business'
  verification_status: VerificationStatus
  verification_type: VerificationType
  is_verified: boolean
  avatar_url?: string
}
