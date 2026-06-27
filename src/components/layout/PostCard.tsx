// components/mobile/PostCard.tsx
import React, { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Post, ReactionType, Visibility } from '../types/post.types'
import './PostCard.css'

const VISIBILITY_LABELS: Record<Visibility, string> = {
  public: '🌍 Public',
  local: '📍 Local',
  followers: '👥 Followers',
  professionals: '🏅 Professionals',
  private: '🔒 Private',
  hidden: '🚫 Hidden',
}

const TRUNCATE_LENGTH = 180

function fmtNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}k`
  return String(n)
}

interface PostCardProps {
  post: Post
  onAuthorClick?: (authorId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onMore?: (postId: string) => void
  onReact?: (postId: string, type: ReactionType, next: boolean) => void
  onSave?: (postId: string, next: boolean) => void
}

export function PostCard({
  post,
  onAuthorClick,
  onComment,
  onShare,
  onMore,
  onReact,
  onSave,
}: PostCardProps) {
  const [reactions, setReactions] = useState(post.reactions)
  const [saved, setSaved] = useState(post.isSaved)
  const [expanded, setExpanded] = useState(false)
  const [showReactionBar, setShowReactionBar] = useState(false)

  const needsTruncation = post.content.length > TRUNCATE_LENGTH
  const displayContent =
    needsTruncation && !expanded
      ? `${post.content.slice(0, TRUNCATE_LENGTH)}…`
      : post.content

  function handleReact(type: ReactionType) {
    setReactions(prev => {
      const current = prev[type]
      const next = !current.userReacted

      onReact?.(post.id, type, next)

      return {
        ...prev,
        [type]: {
          ...current,
          userReacted: next,
          count: Math.max(0, current.count + (next ? 1 : -1)),
        },
      }
    })

    setShowReactionBar(false)
  }

  function handleSave() {
    const next = !saved
    setSaved(next)
    onSave?.(post.id, next)
  }

  const totalReactions = Object.values(reactions).reduce(
    (sum, reaction) => sum + reaction.count,
    0
  )

  const userHasReacted = Object.values(reactions).some(
    reaction => reaction.userReacted
  )

  return (
    <article className={`post-card post-card--${post.postType}`}>
      <div className="post-card__header">
        <button
          className="post-card__author-btn"
          onClick={() => onAuthorClick?.(post.author.id)}
          aria-label={`View ${post.author.name}'s profile`}
          type="button"
        >
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="post-card__avatar"
          />
        </button>

        <div className="post-card__author-info">
          <div className="post-card__author-row">
            <span className="post-card__author-name">{post.author.name}</span>

            {post.author.isVerified && (
              <span className="post-card__verified" aria-label="Verified">
                ✓
              </span>
            )}
          </div>

          <div className="post-card__meta-row">
            <span
              className={`post-card__author-type post-card__author-type--${post.author.type}`}
            >
              {post.author.type}
            </span>

            <span className="post-card__visibility">
              {VISIBILITY_LABELS[post.visibility]}
            </span>
          </div>
        </div>

        <button
          className="post-card__more-btn"
          onClick={() => onMore?.(post.id)}
          aria-label="More options"
          type="button"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="post-card__body">
        <p className="post-card__text">{displayContent}</p>

        {needsTruncation && (
          <button
            className="post-card__expand-btn"
            onClick={() => setExpanded(current => !current)}
            type="button"
          >
            {expanded ? (
              <>
                <ChevronUp size={14} /> Show less
              </>
            ) : (
              <>
                <ChevronDown size={14} /> Read more
              </>
            )}
          </button>
        )}
      </div>

      {post.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="post-card__media">
          {post.mediaUrls.map((url, index) => (
            <img
              key={`${url}-${index}`}
              src={url}
              alt=""
              className="post-card__image"
            />
          ))}
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="post-card__tags">
          {post.tags.map(tag => (
            <span key={tag} className="post-card__tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {totalReactions > 0 && (
        <div className="post-card__reaction-summary">
          <span className="post-card__reaction-total">
            {reactions.applaud.count > 0 && '👏 '}
            {reactions.support.count > 0 && '🤝 '}
            {reactions.like.count > 0 && '❤️ '}
            {fmtNum(totalReactions)}
          </span>
        </div>
      )}

      <div className="post-card__actions">
        <div className="post-card__reaction-wrap">
          <button
            className={`post-card__action-btn${
              userHasReacted ? ' post-card__action-btn--reacted' : ''
            }`}
            onClick={() => setShowReactionBar(current => !current)}
            aria-label="React to post"
            type="button"
          >
            <Heart
              size={19}
              fill={userHasReacted ? '#FF6B6B' : 'none'}
              stroke={userHasReacted ? '#FF6B6B' : '#94a3b8'}
            />
            <span className="post-card__action-count">
              {fmtNum(totalReactions)}
            </span>
          </button>

          {showReactionBar && (
            <div className="post-card__reaction-picker" role="menu">
              <button
                className={`post-card__reaction-option${
                  reactions.applaud.userReacted ? ' active' : ''
                }`}
                onClick={() => handleReact('applaud')}
                aria-label="Applaud"
                type="button"
              >
                👏 <span>Applaud</span>
              </button>

              <button
                className={`post-card__reaction-option${
                  reactions.support.userReacted ? ' active' : ''
                }`}
                onClick={() => handleReact('support')}
                aria-label="Support"
                type="button"
              >
                🤝 <span>Support</span>
              </button>

              <button
                className={`post-card__reaction-option${
                  reactions.like.userReacted ? ' active' : ''
                }`}
                onClick={() => handleReact('like')}
                aria-label="Like"
                type="button"
              >
                ❤️ <span>Like</span>
              </button>
            </div>
          )}
        </div>

        <button
          className="post-card__action-btn"
          onClick={() => onComment?.(post.id)}
          aria-label="Comment"
          type="button"
        >
          <MessageCircle size={19} stroke="#94a3b8" />
          <span className="post-card__action-count">
            {fmtNum(post.commentCount)}
          </span>
        </button>

        <button
          className="post-card__action-btn"
          onClick={() => onShare?.(post.id)}
          aria-label="Share"
          type="button"
        >
          <Share2 size={19} stroke="#94a3b8" />
          <span className="post-card__action-count">
            {fmtNum(post.shareCount)}
          </span>
        </button>

        <button
          className={`post-card__action-btn post-card__action-btn--save${
            saved ? ' post-card__action-btn--saved' : ''
          }`}
          onClick={handleSave}
          aria-label={saved ? 'Unsave post' : 'Save post'}
          type="button"
        >
          <Bookmark
            size={19}
            fill={saved ? '#F59E0B' : 'none'}
            stroke={saved ? '#F59E0B' : '#94a3b8'}
          />
        </button>
      </div>
    </article>
  )
}