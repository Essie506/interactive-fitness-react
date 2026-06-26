navbar.tsx

// components/layout/Navbar.tsx

// import { useUI } from '@/context/UIContext'
// import { useMessages } from '@/context/MessagesContext'



import {
  NavbarProps,
  NavbarProfileData,
  NavbarDirectoryData,
  VerificationType,
  VerificationStatus,
  VERIFICATION_LABELS,
} from './Navbar.types'

import './Navbar.css'

function UnreadDot({ count }: { count?: number }) {
  if (!count || count === 0) return null

  return (
    <span className="navbar__badge" aria-label={`${count} unread`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

function VerifiedBadge({
  status,
  type,
}: {
  status: VerificationStatus
  type: VerificationType
}) {
  if (status !== 'verified' || type === 'none') return null

  const label = VERIFICATION_LABELS[type]

  return (
    <span
      className={`navbar__verified-badge navbar__verified-badge--${type.replace(
        'verified_',
        ''
      )}`}
      title={label}
      aria-label={label}
    >
      <i className="fa-solid fa-circle-check" aria-hidden="true" />
    </span>
  )
}

function ProofSubmittedIcon({ show }: { show?: boolean }) {
  if (!show) return null

  return (
    <span className="navbar__proof-icon" title="Proof documents submitted">
      <i className="fa-solid fa-file-circle-check" aria-hidden="true" />
    </span>
  )
}

function NavTitle({
  variant,
  profileData,
}: {
  variant: string
  profileData?: NavbarProfileData
}) {
  if (variant === 'profile' && profileData) {
    return (
      <div className="navbar__title-wrap">
        <span className="navbar__title">{profileData.name}</span>
        <ProofSubmittedIcon show={profileData.proofSubmitted} />
        <VerifiedBadge
          status={profileData.verificationStatus}
          type={profileData.verificationType}
        />
      </div>
    )
  }

  return (
    <div className="navbar__brand">
      <div className="navbar__logo">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <span className="navbar__title navbar__title--brand">Interactive</span>
    </div>
  )
}

function NavLeft({
  onMenuOpen,
  onMessagesOpen,
  unreadMessages,
  messagesActive,
}: {
  onMenuOpen: () => void
  onMessagesOpen: () => void
  unreadMessages?: number
  messagesActive?: boolean
}) {
  return (
    <div className="navbar__left">
      <button
        className="navbar__icon-btn menu-toggle"
        onClick={onMenuOpen}
        type="button"
        aria-label="Open menu"
      >
        <i className="fa-solid fa-user" aria-hidden="true" />
      </button>

      <button
        className={`navbar__icon-btn navbar__messages-btn ${
          messagesActive ? 'navbar__icon-btn--active' : ''
        }`}
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

function DesktopNavLinks({ active }: { active?: string }) {
  const links = [
    { href: 'feed.html', icon: 'fa-house', label: 'Home', key: 'feed' },
    { href: 'calendar.html', icon: 'fa-calendar-days', label: 'Calendar', key: 'calendar' },
    { href: 'browse-workouts.html', icon: 'fa-dumbbell', label: 'Workouts', key: 'workouts' },
    { href: 'studios.html', icon: 'fa-fire', label: 'Studios', key: 'studios' },
  ]

  return (
    <div className="navbar__center">
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          className={`navbar__nav-link ${
            active === link.key ? 'navbar__nav-link--active' : ''
          }`}
          aria-label={link.label}
          aria-current={active === link.key ? 'page' : undefined}
        >
          <i className={`fa-solid ${link.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function ProfileNavLinks({ onShare }: { onShare?: () => void }) {
  return (
    <div className="navbar__center">
      <a href="feed.html" className="navbar__nav-link" aria-label="Home">
        <i className="fa-solid fa-house" aria-hidden="true" />
      </a>

      <a href="calendar.html" className="navbar__nav-link" aria-label="Calendar">
        <i className="fa-regular fa-calendar-days" aria-hidden="true" />
      </a>

      <a href="vault.html" className="navbar__nav-link" aria-label="Vault">
        <i className="fa-solid fa-box-archive" aria-hidden="true" />
      </a>

      <button
        type="button"
        className="navbar__icon-btn"
        onClick={onShare}
        aria-label="Share profile"
      >
        <i className="fa-solid fa-share-nodes" aria-hidden="true" />
      </button>
    </div>
  )
}

function DirectoryNavLinks({
  onSearchToggle,
  isSearchOpen,
}: {
  onSearchToggle: () => void
  isSearchOpen?: boolean
}) {
  return (
    <div className="navbar__center">
      <a href="feed.html" className="navbar__nav-link" aria-label="Home">
        <i className="fa-solid fa-house" aria-hidden="true" />
      </a>

      <a href="calendar.html" className="navbar__nav-link" aria-label="Calendar">
        <i className="fa-regular fa-calendar-days" aria-hidden="true" />
      </a>

      <a href="browse-workouts.html" className="navbar__nav-link" aria-label="Browse workouts">
        <i className="fa-solid fa-dumbbell" aria-hidden="true" />
      </a>

      <button
        type="button"
        className={`navbar__icon-btn navbar__search-btn ${
          isSearchOpen ? 'navbar__search-btn--active' : ''
        }`}
        onClick={onSearchToggle}
        aria-label="Search"
        aria-expanded={isSearchOpen}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
      </button>
    </div>
  )
}

function NavRight({
  variant,
  onComposerOpen,
  unreadNotifications,
  notificationsActive,
  profileData,
  directoryData,
}: {
  variant: string
  onComposerOpen: () => void
  unreadNotifications?: number
  notificationsActive?: boolean
  profileData?: NavbarProfileData
  directoryData?: NavbarDirectoryData
}) {
  const BellBtn = () => (
    <a
      href="notifications.html"
      className={`navbar__icon-btn navbar__notifications-btn ${
        notificationsActive ? 'navbar__icon-btn--active' : ''
      }`}
      aria-label="Notifications"
      aria-current={notificationsActive ? 'page' : undefined}
    >
      <i className="fa-solid fa-bell" aria-hidden="true" />
      <UnreadDot count={unreadNotifications} />
    </a>
  )

  if (variant === 'profile' && profileData) {
    const { isSelf, isEditing, isFollowing, onSave, onEdit, onFollow } = profileData

    return (
      <div className="navbar__right">
        {isSelf && isEditing && (
          <button
            type="button"
            className="navbar__icon-btn navbar__save-btn"
            onClick={onSave}
            aria-label="Save profile"
          >
            <i className="fa-solid fa-check" aria-hidden="true" />
          </button>
        )}

        {isSelf && !isEditing && (
          <button
            type="button"
            className="navbar__icon-btn navbar__edit-btn"
            onClick={onEdit}
            aria-label="Edit profile"
          >
            <i className="fa-solid fa-pen" aria-hidden="true" />
          </button>
        )}

        {!isSelf && (
          <button
            type="button"
            className={`navbar__icon-btn navbar__follow-btn ${
              isFollowing ? 'is-following' : ''
            }`}
            onClick={onFollow}
            aria-label={isFollowing ? 'Unfollow' : `Follow ${profileData.name}`}
            aria-pressed={isFollowing}
          >
            <i
              className={isFollowing ? 'fa-solid fa-user-check' : 'fa-solid fa-user-plus'}
              aria-hidden="true"
            />
          </button>
        )}

        <BellBtn />
      </div>
    )
  }

  if (variant === 'directory' && directoryData) {
    return (
      <div className="navbar__right">
        <button
          type="button"
          className="navbar__icon-btn navbar__filter-btn"
          onClick={directoryData.onFilterToggle}
          aria-label="Open filters"
        >
          <i className="fa-solid fa-sliders" aria-hidden="true" />
        </button>

        <BellBtn />
      </div>
    )
  }

  return (
    <div className="navbar__right">
      <button
        type="button"
        className="navbar__icon-btn navbar__composer-btn"
        onClick={onComposerOpen}
        aria-label="Create post"
      >
        <i className="fa-solid fa-plus" aria-hidden="true" />
      </button>

      <BellBtn />
    </div>
  )
}

export function Navbar({
  variant = 'default',
  unreadMessages,
  unreadNotifications,
  messagesActive,
  notificationsActive,
  profileData,
  directoryData,
}: NavbarProps) {
  const setMenuOpen = (open: boolean) => console.log('menu open', open)
  const setComposerOpen = (open: boolean) => console.log('composer open', open)
  const setMode = (mode: string) => console.log('messages mode', mode)

  return (
    <nav className={`navbar navbar--${variant}`}>
      <NavLeft
        onMenuOpen={() => setMenuOpen(true)}
        onMessagesOpen={() => setMode('drawer')}
        unreadMessages={unreadMessages}
        messagesActive={messagesActive}
      />

      <NavTitle variant={variant} profileData={profileData} />

      {variant === 'profile' && <ProfileNavLinks onShare={profileData?.onShare} />}

      {variant === 'directory' && directoryData && (
        <DirectoryNavLinks
          onSearchToggle={directoryData.onSearchToggle}
          isSearchOpen={directoryData.isSearchOpen}
        />
      )}

      {(variant === 'feed' || variant === 'default') && (
        <DesktopNavLinks active={variant === 'feed' ? 'feed' : undefined} />
      )}

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