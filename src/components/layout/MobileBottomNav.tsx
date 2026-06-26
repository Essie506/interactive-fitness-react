/ components/mobile/MobileBottomNav.tsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Search, Dumbbell, CalendarDays, User } from 'lucide-react'
import './MobileBottomNav.css'

interface NavItem {
  label: string
  to: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Feed',      to: '/feed',      icon: <Home size={22} /> },
  { label: 'Discover',  to: '/directory', icon: <Search size={22} /> },
  { label: 'Workouts',  to: '/workouts',  icon: <Dumbbell size={22} /> },
  { label: 'Calendar',  to: '/calendar',  icon: <CalendarDays size={22} /> },
  { label: 'Profile',   to: '/profile',   icon: <User size={22} /> },
]

export function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Main navigation">
      <div className="mobile-bottom-nav__inner">
        {NAV_ITEMS.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mobile-bottom-nav__item${isActive ? ' mobile-bottom-nav__item--active' : ''}`
            }
            aria-label={label}
          >
            <span className="mobile-bottom-nav__icon">{icon}</span>
            <span className="mobile-bottom-nav__label">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}