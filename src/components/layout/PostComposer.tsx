// components/mobile/PostComposer.tsx
import React, { useState } from 'react'
import { X, Image, Tag, Lock, Globe, Users, ChevronDown } from 'lucide-react'
import { Post, PostType, Visibility, Author } from '../types/post.types'
import './PostComposer.css'

const VISIBILITY_OPTIONS: { value: Visibility; label: string; icon: React.ReactNode }[] = [
  { value: 'public',        label: 'Public',        icon: <Globe size={14} /> },
  { value: 'followers',     label: 'Followers',     icon: <Users size={14} /> },
  { value: 'local',         label: 'Local only',    icon: <Tag  size={14} /> },
  { value: 'professionals', label: 'Professionals', icon: <Tag  size={14} /> },
  { value: 'private',       label: 'Private',       icon: <Lock size={14} /> },
]

interface PostComposerProps {
  currentUser: Author
  onClose:   () => void
  onPublish: (post: Post) => void
}

export function PostComposer({ currentUser, onClose, onPublish }: PostComposerProps) {
  const [content,    setContent]    = useState('')
  const [postType,   setPostType]   = useState<PostType>('text')
  const [visibility, setVisibility] = useState<Visibility>('public')
  const [tags,       setTags]       = useState('')
  const [showVisDD,  setShowVisDD]  = useState(false)

  function handlePublish() {
    if (!content.trim()) return

    // Firebase-ready: this shape maps directly to Firestore
    const newPost: Post = {
      id:        `post-${Date.now()}`,
      author:    currentUser,
      content:   content.trim(),
      postType,
      mediaUrls: [],
      tags:      tags.split(',').map(t => t.trim()).filter(Boolean),
      visibility,
      reactions: {
        applaud: { type: 'applaud', count: 0, userReacted: false },
        support: { type: 'support', count: 0, userReacted: false },
        like:    { type: 'like',    count: 0, userReacted: false },
      },
      commentCount: 0,
      shareCount:   0,
      saveCount:    0,
      isSaved:      false,
      createdAt:    new Date(),
    }

    onPublish(newPost)
    onClose()
  }

  const selectedVis = VISIBILITY_OPTIONS.find(o => o.value === visibility)!

  return (
    <div className="post-composer-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="post-composer">

        {/* Header */}
        <div className="post-composer__header">
          <button className="post-composer__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          <span className="post-composer__title">New Post</span>
          <button
            className="post-composer__publish-btn"
            onClick={handlePublish}
            disabled={!content.trim()}
          >
            Post
          </button>
        </div>

        {/* Author row */}
        <div className="post-composer__author-row">
          <img src={currentUser.avatar} alt={currentUser.name} className="post-composer__avatar" />
          <div>
            <div className="post-composer__author-name">{currentUser.name}</div>

            {/* Visibility picker */}
            <div className="post-composer__vis-wrap">
              <button
                className="post-composer__vis-btn"
                onClick={() => setShowVisDD(v => !v)}
              >
                {selectedVis.icon}
                <span>{selectedVis.label}</span>
                <ChevronDown size={12} />
              </button>
              {showVisDD && (
                <div className="post-composer__vis-dropdown">
                  {VISIBILITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`post-composer__vis-option${visibility === opt.value ? ' active' : ''}`}
                      onClick={() => { setVisibility(opt.value); setShowVisDD(false) }}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          className="post-composer__textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          autoFocus
        />

        {/* Post type chips */}
        <div className="post-composer__type-row">
          {(['text','tip','achievement','workout'] as PostType[]).map(type => (
            <button
              key={type}
              className={`post-composer__type-chip${postType === type ? ' active' : ''}`}
              onClick={() => setPostType(type)}
            >
              {type === 'text' && '📝'}
              {type === 'tip' && '💡'}
              {type === 'achievement' && '🏆'}
              {type === 'workout' && '💪'}
              <span>{type}</span>
            </button>
          ))}
        </div>

        {/* Tags */}
        <input
          className="post-composer__tags-input"
          placeholder="Tags (comma-separated): strength, yoga…"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        {/* Toolbar */}
        <div className="post-composer__toolbar">
          <button className="post-composer__tool-btn" aria-label="Add photo">
            <Image size={20} />
          </button>
        </div>

      </div>
    </div>
  )
}