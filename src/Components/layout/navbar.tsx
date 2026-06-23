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


// ChatView.tsx — composes the thread + composer
export function ChatView({ threadId, onBack }) {
  return (
    <div className="chat-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <MessageThread threadId={threadId} />
      <MessageComposer threadId={threadId} />
    </div>
  )
}
Badge.tsx — Verified Badges
ui/
// components/ui/Badge.tsx
import type { VerificationType, VerificationStatus } from '@/types/profile.types'

const BADGE_CONFIG: Record<VerificationType, { label: string; className: string }> = {
  verified_professional: { label: 'Verified Professional', className: 'badge-professional' },
  verified_gym:          { label: 'Verified Gym',          className: 'badge-gym' },
  verified_business:     { label: 'Verified Business',     className: 'badge-business' },
  verified_nutritionist: { label: 'Verified Nutritionist', className: 'badge-nutritionist' },
  verified_wellness_provider: { label: 'Verified Wellness',  className: 'badge-wellness' },
  none: { label: '', className: '' },
}

interface BadgeProps {
  verificationType: VerificationType
  verificationStatus: VerificationStatus
  size?: 'sm' | 'md'
}

// Only renders when status === 'verified'
export function VerifiedBadge({ verificationType, verificationStatus, size = 'md' }: BadgeProps) {
  if (verificationStatus !== 'verified' || verificationType === 'none') return null
  const { label, className } = BADGE_CONFIG[verificationType]
  return (
    <span className={`verified-badge ${className} badge-${size}`} title={label}>
      ✓ {label}
    </span>
  )
}

// Status indicator — shows on profiles when not yet verified
export function VerificationStatusPill({ status }: { status: VerificationStatus }) {
  const map = {
    not_verified: { label: 'Not Verified',        className: 'status-unverified' },
    pending:      { label: 'Verification Pending', className: 'status-pending' },
    verified:     { label: 'Verified',             className: 'status-verified' },
    rejected:     { label: 'Verification Rejected',className: 'status-rejected' },
  }
  const { label, className } = map[status]
  return <span className={`verification-status-pill ${className}`>{label}</span>
}
PostComposerModal.tsx
composer/
// components/composer/PostComposerModal.tsx
import { useState } from 'react'
import { useUI } from '@/context/UIContext'

export function PostComposerModal() {
  const { isComposerOpen, setComposerOpen } = useUI()
  const [postText, setPostText] = useState('')
  const [uploadedMedia, setUploadedMedia] = useState<File[]>([])

  if (!isComposerOpen) return null

  return (
    <>
      <Overlay onClose={() => setComposerOpen(false)} />
      <div className="composer-modal">
        <PostComposerInput
          value={postText}
          onChange={setPostText}
        />
        {uploadedMedia.length > 0 && (
          <MediaPreview
            files={uploadedMedia}
            onRemove={(i) => setUploadedMedia(prev => prev.filter((_, idx) => idx !== i))}
          />
        )}
        <ComposerTools onMediaUpload={setUploadedMedia} />
        <button
          className="btn-post"
          disabled={!postText.trim() && uploadedMedia.length === 0}
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </>
  )
}
FeedPage.tsx — Assembly
pages/
// pages/FeedPage.tsx — the top-level page that assembles everything
export function FeedPage() {
  const { isMenuOpen, setMenuOpen, isComposerOpen } = useUI()
  const { mode } = useMessages()

  return (
    <div className="app-root">

      <Navbar />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <FeedLayout>
        <PartnerSidebar />
        <Feed />
        <PromoSidebar />
      </FeedLayout>

      {'/* Messages — renders based on mode */'}
      {mode === "drawer"   && <MessagesDrawer />}
      {mode === "popup"    && <MessagesPopup />}
      {mode === "popout"   && <MessagesPopout />}
      {mode === "minimized" && <MinimizedChatButton />}

      {isComposerOpen && <PostComposerModal />}

      <MobileBottomNav />

    </div>
  )
}
