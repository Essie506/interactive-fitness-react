
import './MobileBottomNav.css'
import { NavLink } from 'react-router-dom'
import { MessageCircle, Search, CalendarDays, Bell } from 'lucide-react'

interface MobileBottomNavProps {
  unreadMessages?: number
  unreadNotifications?: number
}

export function MobileBottomNav({
  unreadMessages = 0,
  unreadNotifications = 0,
}: MobileBottomNavProps) {
  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-bottom-nav__bg" />

      <NavLink
        to="/messages"
        className={({ isActive }: { isActive: boolean }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Messages"
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
      </NavLink>

      <NavLink
        to="/directory"
        className={({ isActive }: { isActive: boolean }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Search"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <Search size={22} strokeWidth={1.8} />
        </span>
        <span className="mobile-bottom-nav__label">Search</span>
      </NavLink>

      <NavLink
        to="/calendar"
        className={({ isActive }: { isActive: boolean }) =>
          `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
        }
        aria-label="Calendar"
      >
        <span className="mobile-bottom-nav__icon-wrap">
          <CalendarDays size={22} strokeWidth={1.8} />
        </span>
        <span className="mobile-bottom-nav__label">Calendar</span>
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }: { isActive: boolean }) =>
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