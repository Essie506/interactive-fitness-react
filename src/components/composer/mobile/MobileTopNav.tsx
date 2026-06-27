// components/mobile/MobileTopNav.tsx
import React from 'react'
import { MessageCircle, Bell } from 'lucide-react'
import './MobileTopNav.css'

interface MobileTopNavProps {
  unreadMessages?: number
  unreadNotifications?: number
  onLogoClick?: () => void
  onMessagesClick?: () => void
  onNotificationsClick?: () => void
}

export function MobileTopNav({
  unreadMessages = 0,
  unreadNotifications = 0,
  onLogoClick,
  onMessagesClick,
  onNotificationsClick,
}: MobileTopNavProps) {
  return (
    <div className="mobile-top-nav">
      <button
        className="mobile-top-nav__brand"
        onClick={onLogoClick}
        aria-label="Open navigation menu"
        type="button"
      >
        <div className="mobile-top-nav__logo" aria-hidden="true">
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

        <span className="mobile-top-nav__title">Interactive</span>
      </button>

      <div className="mobile-top-nav__actions">
        <button
          className="mobile-top-nav__icon-btn"
          onClick={onMessagesClick}
          aria-label="Messages"
          type="button"
        >
          <MessageCircle size={22} />
          {unreadMessages > 0 && (
            <span className="mobile-top-nav__badge">{unreadMessages}</span>
          )}
        </button>

        <button
          className="mobile-top-nav__icon-btn"
          onClick={onNotificationsClick}
          aria-label="Notifications"
          type="button"
        >
          <Bell size={22} />
          {unreadNotifications > 0 && (
            <span className="mobile-top-nav__badge">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}