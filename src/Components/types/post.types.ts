
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
