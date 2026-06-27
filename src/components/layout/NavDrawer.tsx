// components/mobile/NavDrawer.tsx
import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp, Search, X, ArrowLeft } from 'lucide-react'
import {
  SHARED_SECTIONS,
  CUSTOMER_SECTION,
  PROFESSIONAL_SECTION,
  BUSINESS_SECTION,
} from '../data/navigationConfig'
import { NavUser, NavSection, AccountType } from '../types/navigation.types'
import './NavDrawer.css'

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getAccountSection(type: AccountType): NavSection | null {
  switch (type) {
    case 'customer':     return CUSTOMER_SECTION
    case 'professional': return PROFESSIONAL_SECTION
    case 'business':     return BUSINESS_SECTION
    default:             return null
  }
}

function accountTypeLabel(type: AccountType): string {
  switch (type) {
    case 'professional': return 'Professional'
    case 'business':     return 'Business'
    case 'customer':     return 'Member'
    default:             return ''
  }
}

// ─────────────────────────────────────────────
// Accordion section
// ─────────────────────────────────────────────

interface AccordionSectionProps {
  section: NavSection
  isOpen: boolean
  onToggle: () => void
  onNavClick: () => void
}

function AccordionSection({
  section,
  isOpen,
  onToggle,
  onNavClick,
}: AccordionSectionProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className={`nav-drawer__section${isOpen ? ' nav-drawer__section--open' : ''}`}>
      <button
        className="nav-drawer__section-header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="nav-drawer__section-icon">{section.icon}</span>
        <span className="nav-drawer__section-label">{section.label}</span>
        <span className="nav-drawer__section-chevron">
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>

      <div
        ref={bodyRef}
        className="nav-drawer__section-body"
        style={{
          maxHeight: isOpen
            ? `${bodyRef.current?.scrollHeight ?? 400}px`
            : '0px',
        }}
      >
        {section.children.map(item => (
          item.disabled ? (
            <div
              key={item.id}
              className="nav-drawer__item nav-drawer__item--disabled"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-drawer__badge">{item.badge}</span>
              )}
            </div>
          ) : (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                `nav-drawer__item${isActive ? ' nav-drawer__item--active' : ''}`
              }
              onClick={onNavClick}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-drawer__badge">{item.badge}</span>
              )}
            </NavLink>
          )
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main drawer
// ─────────────────────────────────────────────

interface NavDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentUser: NavUser | null   // null = public/unauthenticated
  isFeedPage?: boolean
}

export function NavDrawer({
  isOpen,
  onClose,
  currentUser,
  isFeedPage = false,
}: NavDrawerProps) {
  const location = useLocation()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    workouts: true, // open by default
  })
  const [searchQuery, setSearchQuery] = useState('')
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on route change
  useEffect(() => {
    if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Trap focus / lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      drawerRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function toggleSection(id: string) {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const accountSection = currentUser
    ? getAccountSection(currentUser.accountType)
    : null

  // Simple label filter across all sections
  const query = searchQuery.trim().toLowerCase()
  function matchesSearch(label: string) {
    return !query || label.toLowerCase().includes(query)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`nav-drawer__backdrop${isOpen ? ' nav-drawer__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <nav
        ref={drawerRef}
        className={`nav-drawer${isOpen ? ' nav-drawer--open' : ''}`}
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        {/* ── Header ── */}
        <div className="nav-drawer__header">
          <div className="nav-drawer__brand">
            <div className="nav-drawer__logo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="nav-drawer__brand-name">Interactive</span>
          </div>
          <button
            className="nav-drawer__close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="nav-drawer__scroll">

          {/* ── Top area ── */}
          {currentUser ? (
            <div className="nav-drawer__profile">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="nav-drawer__profile-avatar"
              />
              <div className="nav-drawer__profile-info">
                <div className="nav-drawer__profile-name">
                  {currentUser.name}
                  {currentUser.isVerified && (
                    <span className="nav-drawer__profile-verified" aria-label="Verified">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </div>
                <span className={`nav-drawer__account-type nav-drawer__account-type--${currentUser.accountType}`}>
                  {accountTypeLabel(currentUser.accountType)}
                </span>
              </div>
            </div>
          ) : (
            <div className="nav-drawer__auth-cta">
              <p className="nav-drawer__auth-message">
                Join the community to unlock your full fitness journey.
              </p>
              <div className="nav-drawer__auth-btns">
                <NavLink to="/signup" className="nav-drawer__btn nav-drawer__btn--primary" onClick={onClose}>
                  Sign up free
                </NavLink>
                <NavLink to="/login" className="nav-drawer__btn nav-drawer__btn--secondary" onClick={onClose}>
                  Log in
                </NavLink>
              </div>
            </div>
          )}

          {/* ── Back link ── */}
          {!isFeedPage && (
            <NavLink
              to={currentUser ? '/feed' : '/'}
              className="nav-drawer__back-link"
              onClick={onClose}
            >
              <ArrowLeft size={15} />
              <span>{currentUser ? 'Back to Feed' : 'Back to Home'}</span>
            </NavLink>
          )}

          {/* ── Search ── */}
          <div className="nav-drawer__search-wrap">
            <Search size={15} className="nav-drawer__search-icon" />
            <input
              type="text"
              className="nav-drawer__search"
              placeholder="Search menu…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search navigation"
            />
            {searchQuery && (
              <button
                className="nav-drawer__search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* ── Account section (top, account-specific) ── */}
          {accountSection && matchesSearch(accountSection.label) && (
            <div className="nav-drawer__account-section">
              <AccordionSection
                section={{
                  ...accountSection,
                  children: accountSection.children.filter(c =>
                    matchesSearch(c.label)
                  ),
                }}
                isOpen={!!openSections[accountSection.id + '-account']}
                onToggle={() => toggleSection(accountSection.id + '-account')}
                onNavClick={onClose}
              />
            </div>
          )}

          {/* ── Shared sections ── */}
          {SHARED_SECTIONS.map(section => {
            const filtered = section.children.filter(c =>
              matchesSearch(c.label) || matchesSearch(section.label)
            )
            if (query && filtered.length === 0) return null
            return (
              <AccordionSection
                key={section.id}
                section={{ ...section, children: filtered }}
                isOpen={!!openSections[section.id]}
                onToggle={() => toggleSection(section.id)}
                onNavClick={onClose}
              />
            )
          })}

          {/* ── Search shortcut ── */}
          {(!query || 'search'.includes(query)) && (
            <NavLink
              to="/search"
              className="nav-drawer__standalone-link"
              onClick={onClose}
            >
              <Search size={16} />
              <span>Search Interactive</span>
            </NavLink>
          )}

          {/* ── Footer ── */}
          {currentUser && (
            <div className="nav-drawer__footer">
              <NavLink
                to="/account/settings"
                className="nav-drawer__footer-link"
                onClick={onClose}
              >
                Settings
              </NavLink>
              <span className="nav-drawer__footer-dot">·</span>
              <button className="nav-drawer__footer-link nav-drawer__footer-link--btn">
                Log out
              </button>
            </div>
          )}

        </div>
      </nav>
    </>
  )
}