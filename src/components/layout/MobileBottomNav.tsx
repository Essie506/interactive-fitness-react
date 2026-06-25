MobileBottomNav.tsx
import './MobileBottomNav.css'
import { NavLink } from 'react-router-dom'
import { MessageCircle, Search, CalendarDays, Bell } from 'lucide-react'
import { useMessages } from '/context/MessagesContext'

interface MobileBottomNavProps {
  unreadMessages?: number
  unreadNotifications?: number
}

export function MobileBottomNav({
  unreadMessages = 0,
  unreadNotifications = 0,
}: MobileBottomNavProps) {
  const { setMode } = useMessages()

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav__bg" />

      {/* Messages — opens drawer, not a route link */}
      <button
        className="mobile-bottom-nav__item"
        onClick={() => setMode('drawer')}
        aria-label="Open messages"
        type="button"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <MessageCircle size={22} strokeWidth={1.8} />
          {unreadMessages > 0 && (
            <span className="mobile-bottom-nav__badge">
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </span>
          )}
        </span>
        <span className="mobile-bottom-nav__label">Messages</span>
      </button>

      {/* Search → routes to /directory */}
      <NavLink
        to="/directory"
        className={({ isActive }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Search"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <Search size={22} strokeWidth={1.8} />
        </span>
        <span className="mobile-bottom-nav__label">Search</span>
      </NavLink>

      {/* Calendar */}
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Calendar"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <CalendarDays size={22} strokeWidth={1.8} />
        </span>
        <span className="mobile-bottom-nav__label">Calendar</span>
      </NavLink>

      {/* Notifications */}
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Notifications"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <Bell size={22} strokeWidth={1.8} />
          {unreadNotifications > 0 && (
            <span className="mobile-bottom-nav__badge">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </span>
        <span className="mobile-bottom-nav__label">Notifications</span>
      </NavLink>
    </nav>
  )
}
