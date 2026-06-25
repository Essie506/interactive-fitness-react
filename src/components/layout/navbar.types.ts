 ============================================================
// navbar.types.ts
// components/layout/navbar.types.ts
// ============================================================

// ----------------------------------------------------------
// Variants
// ----------------------------------------------------------

/** The four page-level navbar variants in Interactive */
export type NavbarVariant = 'feed' | 'profile' | 'directory' | 'default'

// ----------------------------------------------------------
// Profile variant — viewer & account context
// ----------------------------------------------------------

/** Who is viewing the profile page */
export type ViewerMode = 'self' | 'visitor'

/** The account type of the profile being viewed */
export type AccountType = 'customer' | 'professional' | 'business'

// ----------------------------------------------------------
// Verification
// ----------------------------------------------------------

/** All possible verification statuses on a UserProfile */
export type VerificationStatus =
  | 'not_verified'
  | 'pending'
  | 'verified'
  | 'rejected'

/** Badge types awarded after a VerificationRequest is approved */
export type VerificationType =
  | 'verified_professional'
  | 'verified_gym'
  | 'verified_business'
  | 'verified_nutritionist'
  | 'verified_wellness_provider'
  | 'none'

/** Full verification state passed into the profile navbar */
export interface VerificationState {
  status: VerificationStatus
  type: VerificationType
  /** Show the proof-submitted icon (professional/business self-view only) */
  showProofIcon?: boolean
}

// ----------------------------------------------------------
// Unread counts
// ----------------------------------------------------------

export interface UnreadCounts {
  messages?: number
  notifications?: number
}

// ----------------------------------------------------------
// Profile title
// ----------------------------------------------------------

/** Dynamic title block used by the profile navbar variant */
export interface ProfileTitle {
  /** Display name shown in the nav title */
  name: string
  /** Allow inline editing (self-view only) */
  editable?: boolean
}

// ----------------------------------------------------------
// Nav action callbacks
// ----------------------------------------------------------

/**
 * All optional action callbacks the Navbar can fire.
 * Each page wires up only the ones it needs.
 */
export interface NavbarActions {
  onMenuOpen?: () => void
  onMessagesOpen?: () => void
  onComposerOpen?: () => void
  onEditProfile?: () => void
  onSaveProfile?: () => void
  onFollowProfile?: () => void
  onShareProfile?: () => void
  onSearchOpen?: () => void
  onFilterOpen?: () => void
  onNotificationsOpen?: () => void
  onBack?: () => void
}

// ----------------------------------------------------------
// Per-variant config shapes
// ----------------------------------------------------------

/** Feed variant — standard social feed page */
export interface FeedNavbarConfig {
  variant: 'feed'
  unread?: UnreadCounts
}

/** Profile variant — customer, professional or business profile page */
export interface ProfileNavbarConfig {
  variant: 'profile'
  viewerMode: ViewerMode
  accountType: AccountType
  profileTitle: ProfileTitle
  verification?: VerificationState
  /** Whether the profile is currently in edit mode (self-view) */
  isEditing?: boolean
  unread?: UnreadCounts
}

/** Directory variant — searchable professional/business directory */
export interface DirectoryNavbarConfig {
  variant: 'directory'
  unread?: UnreadCounts
}

/** Default variant — any other page (calendar, workouts, etc.) */
export interface DefaultNavbarConfig {
  variant: 'default'
  title?: string
  /** Show a back arrow instead of the menu button */
  showBack?: boolean
  unread?: UnreadCounts
}

/**
 * Discriminated union — pass one of these as the `config` prop
 * and TypeScript will narrow the shape automatically.
 */
export type NavbarConfig =
  | FeedNavbarConfig
  | ProfileNavbarConfig
  | DirectoryNavbarConfig
  | DefaultNavbarConfig

// ----------------------------------------------------------
// Top-level Navbar props
// ----------------------------------------------------------

export interface NavbarProps {
  /** Page-level config — drives which buttons and states are shown */
  config: NavbarConfig
  /** Action handlers — only wire up what the page needs */
  actions?: NavbarActions
  /** Active nav link (matches href stem, e.g. "feed", "calendar") */
  activeLink?: string
}

// ----------------------------------------------------------
// Sub-component props
// ----------------------------------------------------------

/** Single icon button used throughout the navbar */
export interface IconButtonProps {
  icon: string
  label: string
  onClick?: () => void
  badge?: number
  isActive?: boolean
  className?: string
  href?: string
  hidden?: boolean
}

/** Verification badge shown in profile titles and nav */
export interface VerificationBadgeProps {
  type: VerificationType
  status: VerificationStatus
  /** 'inline' sits next to name, 'icon-only' shows just the checkmark */
  display?: 'inline' | 'icon-only'
}

/** Proof-submitted status icon (professional/business self-view only) */
export interface ProofSubmittedIconProps {
  hidden?: boolean
}

/** Desktop nav links (feed + directory variants only) */
export interface DesktopNavLinksProps {
  activeLink?: string
  /** 'feed' shows home/calendar/workouts/fire, 'directory' adds search */
  variant: 'feed' | 'directory'
}

