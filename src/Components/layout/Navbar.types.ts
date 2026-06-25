// ============================================================
// components/layout/navbar.types.ts
// ============================================================

/** Which page variant the navbar is rendering on. */
export type NavbarVariant =
  | 'feed'
  | 'profile'
  | 'directory'
  | 'default'

/** Verification badge type. */
export type VerificationType =
  | 'verified_professional'
  | 'verified_gym'
  | 'verified_business'
  | 'verified_nutritionist'
  | 'verified_wellness_provider'
  | 'none'

/** Verification status. */
export type VerificationStatus =
  | 'not_verified'
  | 'pending'
  | 'verified'
  | 'rejected'

/** Profile account type. */
export type AccountType =
  | 'customer'
  | 'professional'
  | 'business'

/** Profile-specific data. */
export interface NavbarProfileData {
  /** Display name shown in the navbar. */
  name: string

  /** Customer | Professional | Business */
  accountType: AccountType

  /** True when viewing your own profile. */
  isSelf: boolean

  /** Verification state. */
  verificationStatus: VerificationStatus
  verificationType: VerificationType

  /** Editing state. */
  isEditing?: boolean

  /** Visitor follow state. */
  isFollowing?: boolean

  /** Professional/business proof submitted. */
  proofSubmitted?: boolean

  /** Action callbacks */
  onSave?: () => void
  onEdit?: () => void
  onFollow?: () => void
  onShare?: () => void
}

/** Directory-specific data. */
export interface NavbarDirectoryData {
  /** Toggle directory search. */
  onSearchToggle: () => void

  /** Toggle directory filters. */
  onFilterToggle: () => void

  /** Whether search is currently open. */
  isSearchOpen?: boolean
}

/** Props accepted by Navbar.tsx */
export interface NavbarProps {
  /** Page variant. */
  variant?: NavbarVariant

  /** Unread badge counts. */
  unreadMessages?: number
  unreadNotifications?: number

  /** Active icon states. */
  messagesActive?: boolean
  notificationsActive?: boolean

  /** Profile-only data. */
  profileData?: NavbarProfileData

  /** Directory-only data. */
  directoryData?: NavbarDirectoryData
}

/** Human-readable verification labels. */
export const VERIFICATION_LABELS: Record<VerificationType, string> = {
  verified_professional: 'Verified Professional',
  verified_gym: 'Verified Gym',
  verified_business: 'Verified Business',
  verified_nutritionist: 'Verified Nutritionist',
  verified_wellness_provider: 'Verified Wellness Provider',
  none: '',
}
