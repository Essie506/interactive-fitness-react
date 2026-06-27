export type PostType =
  | 'text'
  | 'image'
  | 'tip'
  | 'achievement'
  | 'workout'
  | 'promo'

export type AuthorType = 'customer' | 'professional' | 'business'

export type Visibility =
  | 'public'
  | 'local'
  | 'followers'
  | 'professionals'
  | 'private'
  | 'hidden'

export type ReactionType = 'applaud' | 'support' | 'like'

export interface Author {
  id: string
  name: string
  avatar: string
  type: AuthorType
  isVerified: boolean
}

export interface Reaction {
  type: ReactionType
  count: number
  userReacted: boolean
}

export interface PostComment {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  content: string
  createdAt: Date
}

export interface Post {
  id: string
  author: Author
  content: string
  postType: PostType
  mediaUrls?: string[]
  tags?: string[]
  visibility: Visibility
  reactions: Record<ReactionType, Reaction>
  commentCount: number
  shareCount: number
  saveCount: number
  isSaved: boolean
  workoutId?: string
  createdAt: Date
  // Firebase-ready: these will map 1:1 to Firestore fields
}

// Firestore-ready write shape (no UI state, no Date objects)
export interface PostWritePayload {
  authorId: string
  authorName: string
  authorAvatar: string
  authorType: AuthorType
  authorIsVerified: boolean
  content: string
  postType: PostType
  mediaUrls: string[]
  tags: string[]
  visibility: Visibility
  createdAt: number // Unix timestamp
}