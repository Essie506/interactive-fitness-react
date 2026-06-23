// components/layout/Navbar.tsx
import { useUI } from '@/context/UIContext'
import { useMessages } from '@/context/MessagesContext'

export function Navbar() {
  const { setMenuOpen, setComposerOpen } = useUI()
  const { setMode } = useMessages()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <IconButton
          icon="menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        />
        <IconButton
          icon="messages"
          onClick={() => setMode("drawer")}
          aria-label="Open messages"
        />
      </div>
      <div className="navbar-center">
        <span className="navbar-title">Interactive</span>
        <DesktopNavLinks />
      </div>
      <div className="navbar-right">
        <IconButton
          icon="plus"
          onClick={() => setComposerOpen(true)}
          aria-label="Create post"
        />
        <IconButton icon="bell" aria-label="Notifications" />
      </div>
    </nav>
  )
}



