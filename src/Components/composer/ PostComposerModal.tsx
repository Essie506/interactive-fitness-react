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
