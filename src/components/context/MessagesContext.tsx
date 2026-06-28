
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
