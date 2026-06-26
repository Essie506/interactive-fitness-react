// components/mobile/MobileTopNav.tsx
import React from 'react'
import { MessageCircle, Bell } from 'lucide-react'
import './MobileTopNav.css'

interface MobileTopNavProps {
  unreadMessages?: number
  unreadNotifications?: number
  onMessagesClick?: () => void
  onNotificationsClick?: () => void
}

export function MobileTopNav({
  unreadMessages = 0,
  unreadNotifications = 0,
  onMessagesClick,
  onNotificationsClick,
}: MobileTopNavProps) {
  return (
    <div className="mobile-top-nav">
      <div className="mobile-top-nav__brand">
        <div className="mobile-top-nav__logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <span className="mobile-top-nav__title">Interactive</span>
      </div>

      <div className="mobile-top-nav__actions">
        <button
          className="mobile-top-nav__icon-btn"
          onClick={onMessagesClick}
          aria-label="Messages"
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
        >
          <Bell size={22} />
          {unreadNotifications > 0 && (
            <span className="mobile-top-nav__badge">{unreadNotifications}</span>
          )}
        </button>
      </div>
    </div>
  )
}