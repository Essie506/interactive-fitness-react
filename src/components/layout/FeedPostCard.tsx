// components/mobile/FeedPostCard.tsx
import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'

export interface Post {
  id: number
  author: string
  avatar: string
  type: 'customer' | 'professional' | 'business'
  content: string
  postType: 'text' | 'image' | 'tip' | 'achievement' | 'workout'
  img?: string
  tags: string[]
  likes: number
  comments: number
  liked: boolean
}

interface FeedPostCardProps {
  post: Post
  onAuthorClick?: (authorName: string) => void
  onLike?: (id: number, liked: boolean) => void
  onComment?: (id: number) => void
  onShare?: (id: number) => void
  onMore?: (id: number) => void
}

function fmtNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return String(n)
}

export function FeedPostCard({
  post,
  onAuthorClick,
  onLike,
  onComment,
  onShare,
  onMore,
}: FeedPostCardProps) {
  const [liked, setLiked]   = useState(post.liked)
  const [likes, setLikes]   = useState(post.likes)
  const [popping, setPopping] = useState(false)

  function handleLike() {
    const next = !liked
    setLiked(next)
    setLikes((prev) => prev + (next ? 1 : -1))
    setPopping(true)
    setTimeout(() => setPopping(false), 300)
    onLike?.(post.id, next)
  }

  return (
    <div className="feed-post-card">

      {/* Header */}
      <div className="feed-post-card__header">
        <img
          src={post.avatar}
          alt={post.author}
          className="feed-post-card__avatar"
          onClick={() => onAuthorClick?.(post.author)}
        />
        <div className="feed-post-card__author-info">
          <div className="feed-post-card__author-row">
            <span className="feed-post-card__author-name">{post.author}</span>
            {post.type !== 'customer' && (
              <span className="feed-post-card__verified-badge" aria-label="Verified">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </div>
          <span className={`feed-post-card__type-badge feed-post-card__type-badge--${post.type}`}>
            {post.type}
          </span>
        </div>
        <button
          className="feed-post-card__more-btn"
          onClick={() => onMore?.(post.id)}
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="feed-post-card__content">
        <p className="feed-post-card__text">{post.content}</p>
      </div>

      {/* Image */}
      {post.img && (
        <img
          src={post.img}
          alt=""
          className="feed-post-card__image"
        />
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="feed-post-card__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="feed-post-card__tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="feed-post-card__actions">
        <button
          className={`feed-post-card__action-btn${liked ? ' feed-post-card__action-btn--liked' : ''}${popping ? ' feed-post-card__action-btn--pop' : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <Heart
            size={19}
            fill={liked ? '#FF6B6B' : 'none'}
            stroke={liked ? '#FF6B6B' : '#94a3b8'}
          />
          <span className="feed-post-card__action-count">{fmtNum(likes)}</span>
        </button>

        <button
          className="feed-post-card__action-btn"
          onClick={() => onComment?.(post.id)}
          aria-label="Comment"
        >
          <MessageCircle size={19} stroke="#94a3b8" />
          <span className="feed-post-card__action-count">
  {fmtNum(post.comments)}
</span>
        </button>

        <button
          className="feed-post-card__action-btn feed-post-card__action-btn--right"
          onClick={() => onShare?.(post.id)}
          aria-label="Share"
        >
          <Share2 size={19} stroke="#94a3b8" />
        </button>
      </div>

    </div>
  )
}