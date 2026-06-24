// components/layout/Navbar.tsx
import { useUI }       from '@/context/UIContext'
import { useMessages } from '@/context/MessagesContext'
import {
  NavbarProps,
  NavbarProfileData,
  NavbarDirectoryData,
  VerificationType,
  VerificationStatus,
  VERIFICATION_LABELS,
} from './navbar.types'

// ─────────────────────────────────────────────────────────────
//  Small private helpers
// ─────────────────────────────────────────────────────────────

/** Red dot badge — shown when count > 0. */
function UnreadDot({ count }: { count?: number }) {
  if (!count || count === 0) return null
  return (
    <span className="unread-dot" aria-label={`${count} unread`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

/** Verified tick — only renders when status === 'verified' and type !== 'none'. */
function VerifiedBadge({
  status,
  type,
}: {
  status: VerificationStatus
  type:   VerificationType
}) {
  if (status !== 'verified' || type === 'none') return null
  const label = VERIFICATION_LABELS[type]
  return (
    <span
      className={`nav-verified-badge nav-verified-badge--${type}`}
      title={label}
      aria-label={label}
    >
      <i className="fa-solid fa-circle-check" aria-hidden="true" />
    </span>
  )
}

/** Pending proof-submitted indicator for professional profiles. */
function ProofSubmittedIcon({ show }: { show?: boolean }) {
  if (!show) return null
  return (
    <span className="proof-submitted-status" title="Proof documents submitted">
      <i className="fa-solid fa-file-circle-check" aria-hidden="true" />
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
//  Nav-left slot
//  Always: menu toggle + messages button (both were in original)
// ─────────────────────────────────────────────────────────────
function NavLeft({
  onMenuOpen,
  onMessagesOpen,
  unreadMessages,
  messagesActive,
}: {
  onMenuOpen:     () => void
  onMessagesOpen: () => void
  unreadMessages?: number
  messagesActive?: boolean
}) {
  return (
    <div className="nav-left">
      <button
        className="menu-toggle icon-btn"
        onClick={onMenuOpen}
        type="button"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-user" aria-hidden="true" />
      </button>

      <button
        className={`icon-btn desktop-icon-link messages-toggle
          ${messagesActive ? 'is-active' : ''}`}
        onClick={onMessagesOpen}
        type="button"
        aria-label="Open messages"
      >
        <i className="fa-solid fa-comments" aria-hidden="true" />
        <UnreadDot count={unreadMessages} />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Nav-center slot — changes per variant
// ─────────────────────────────────────────────────────────────

/** Standard desktop nav links (feed / calendar / workouts / studios). */
function DesktopNavLinks({ active }: { active?: string }) {
  const links = [
    { href: 'feed.html',             icon: 'fa-house',         label: 'Home',            key: 'feed'      },
    { href: 'calendar.html',         icon: 'fa-calendar-days',  label: 'Calendar',        key: 'calendar'  },
    { href: 'browse-workouts.html',  icon: 'fa-dumbbell',       label: 'Workouts',         key: 'workouts'  },
    { href: 'studios.html',           icon: 'fa-fire',           label: 'Studios',          key: 'studios'   },
  ]
  return (
    <div className="nav-center desktop-nav-links">
      {links.map(l => (
        <a
          key={l.key}
          href={l.href}
          className={`icon-btn ${active === l.key ? 'is-active' : ''}`}
          aria-label={l.label}
          aria-current={active === l.key ? 'page' : undefined}
        >
          <i className={`fa-solid ${l.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

/** Profile nav center — vault, calendar upload, share. No directory link. */
function ProfileNavLinks({ onShare }: { onShare?: () => void }) {
  return (
    <div className="nav-center desktop-nav-links">
      <a href="feed.html"     className="icon-btn" aria-label="Home">
        <i className="fa-solid fa-house"        aria-hidden="true" />
      </a>
      <a href="calendar.html" className="icon-btn upload-btn" aria-label="Calendar">
        <i className="fa-regular fa-calendar-days" aria-hidden="true" />
      </a>
      <a href="vault.html"    className="icon-btn" aria-label="Vault">
        <i className="fa-solid fa-box-archive"   aria-hidden="true" />
      </a>
      <button
        type="button"
        className="icon-btn profile-share-btn"
        onClick={onShare}
        aria-label="Share profile"
      >
        <i className="fa-solid fa-share-nodes" aria-hidden="true" />
      </button>
    </div>
  )
}

/** Directory nav center — standard links + search toggle (no directory shortcut). */
function DirectoryNavLinks({ onSearchToggle, isSearchOpen }: {
  onSearchToggle: () => void
  isSearchOpen?: boolean
}) {
  return (
    <div className="nav-center desktop-nav-links">
      <a href="feed.html"            className="icon-btn" aria-label="Home">
        <i className="fa-solid fa-house"         aria-hidden="true" />
      </a>
      <a href="calendar.html"        className="icon-btn" aria-label="Calendar">
        <i className="fa-regular fa-calendar-days" aria-hidden="true" />
      </a>
      <a href="browse-workouts.html" className="icon-btn" aria-label="Browse workouts">
        <i className="fa-solid fa-dumbbell"        aria-hidden="true" />
      </a>
      <button
        type="button"
        className={`icon-btn top-search-btn ${isSearchOpen ? 'is-active' : ''}`}
        onClick={onSearchToggle}
        aria-label="Search"
        aria-expanded={isSearchOpen}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Title slot
// ─────────────────────────────────────────────────────────────
function NavTitle({ variant, profileData }: {
  variant: string
  profileData?: NavbarProfileData
}) {
  if (variant === 'profile' && profileData) {
    return (
      <div className="nav-title-wrap">
        <div className="nav-title-heading">
          <span className="nav-title">{profileData.name}</span>
        </div>
        <ProofSubmittedIcon show={profileData.proofSubmitted} />
        <VerifiedBadge
          status={profileData.verificationStatus}
          type={profileData.verificationType}
        />
      </div>
    )
  }
  return <div className="nav-title">Interactive</div>
}

// ─────────────────────────────────────────────────────────────
//  Nav-right slot — changes per variant
// ─────────────────────────────────────────────────────────────
function NavRight({
  variant,
  onComposerOpen,
  unreadNotifications,
  notificationsActive,
  profileData,
  directoryData,
}: {
  variant:              string
  onComposerOpen:       () => void
  unreadNotifications?: number
  notificationsActive?: boolean
  profileData?:          NavbarProfileData
  directoryData?:        NavbarDirectoryData
}) {
  /** Notifications bell — shared across all variants. */
  const BellBtn = () => (
    <a
      href="notifications.html"
      className={`icon-btn desktop-icon-link
        ${notificationsActive ? 'is-active' : ''}`}
      aria-label="Notifications"
      aria-current={notificationsActive ? 'page' : undefined}
    >
      <i className="fa-solid fa-bell" aria-hidden="true" />
      <UnreadDot count={unreadNotifications} />
    </a>
  )

  // ── Profile variant ──────────────────────────────────────
  if (variant === 'profile' && profileData) {
    const { isSelf, isEditing, isFollowing, onSave, onEdit, onFollow } = profileData
    return (
      <div className="navbar-right">
        {isSelf && isEditing && (
          <button
            type="button"
            className="avatar-editor-btn-save icon-btn"
            onClick={onSave}
            aria-label="Save profile"
          >
            <i className="fa-solid fa-check" aria-hidden="true" />
          </button>
        )}
        {isSelf && !isEditing && (
          <button
            type="button"
            className="icon-btn desktop-icon-link self-only"
            onClick={onEdit}
            aria-label="Edit profile"
          >
            <i className="fa-solid fa-pen" aria-hidden="true" />
          </button>
        )}
        {!isSelf && (
          <button
            type="button"
            className={`icon-btn desktop-icon-link visitor-only
              ${isFollowing ? 'is-following' : ''}`}
            onClick={onFollow}
            aria-label={isFollowing ? 'Unfollow' : `Follow ${profileData.name}`}
            aria-pressed={isFollowing}
          >
            <i
              className={isFollowing
                ? 'fa-solid fa-user-check'
                : 'fa-solid fa-user-plus'}
              aria-hidden="true"
            />
          </button>
        )}
        <BellBtn />
      </div>
    )
  }

  // ── Directory variant ────────────────────────────────────
  if (variant === 'directory' && directoryData) {
    return (
      <div className="navbar-right">
        <button
          type="button"
          className="icon-btn filter-toggle"
          onClick={directoryData.onFilterToggle}
          aria-label="Open filters"
        >
          <i className="fa-solid fa-sliders" aria-hidden="true" />
        </button>
        <BellBtn />
      </div>
    )
  }

  // ── Feed + default variant ───────────────────────────────
  return (
    <div className="navbar-right">
      <button
        type="button"
        className="icon-btn composer-toggle"
        onClick={onComposerOpen}
        aria-label="Create post"
      >
        <i className="fa-solid fa-plus" aria-hidden="true" />
      </button>
      <BellBtn />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  Main export — Navbar
//  Original hooks (useUI / useMessages) untouched.
//  Everything new comes in via props.
// ─────────────────────────────────────────────────────────────
export function Navbar({
  variant              = 'default',
  unreadMessages,
  unreadNotifications,
  messagesActive,
  notificationsActive,
  profileData,
  directoryData,
}: NavbarProps) {
  // ── Original hooks — preserved exactly as before ──────────
  const { setMenuOpen, setComposerOpen } = useUI()
  const { setMode } = useMessages()

  return (
    <nav className={`navbar navbar--${variant}`}>
      <div className="navbar-bg" aria-hidden="true" />

      <NavLeft
        onMenuOpen={() => setMenuOpen(true)}
        onMessagesOpen={() => setMode('drawer')}
        unreadMessages={unreadMessages}
        messagesActive={messagesActive}
      />

      <NavTitle variant={variant} profileData={profileData} />

      {variant === 'profile' &&
        <ProfileNavLinks onShare={profileData?.onShare} />
      }
      {variant === 'directory' && directoryData &&
        <DirectoryNavLinks
          onSearchToggle={directoryData.onSearchToggle}
          isSearchOpen={directoryData.isSearchOpen}
        />
      }
      {(variant === 'feed' || variant === 'default') &&
        <DesktopNavLinks active={variant === 'feed' ? 'feed' : undefined} />
      }

      <NavRight
        variant={variant}
        onComposerOpen={() => setComposerOpen(true)}
        unreadNotifications={unreadNotifications}
        notificationsActive={notificationsActive}
        profileData={profileData}
        directoryData={directoryData}
      />
    </nav>
  )
}
