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
     

      <MobileBottomNav />
