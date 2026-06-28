// src/pages/FeedPage.tsx

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import { MobileTopNav } from '../components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from '../components/layout/MobileBottomNav'
import { MobileFeed } from '../components/layout/MobileFeed'
import { NavDrawer } from '../components/layout/NavDrawer'

export function FeedPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { interactiveUser } = useAuth()

  const currentUser = {
    id: interactiveUser?.uid || '',
    name: interactiveUser?.displayName || 'Member',
    avatar: interactiveUser?.avatar || '',
    accountType: interactiveUser?.accountType || 'customer',
    isVerified: interactiveUser?.verified || false,
  }

  return (
    <div className="feed-page app-root">
      <MobileTopNav
        unreadMessages={3}
        unreadNotifications={2}
        onLogoClick={() => setDrawerOpen(true)}
      />

      <main
        className="feed-page__main"
        style={{
          paddingTop: '64px',
          paddingBottom: '80px',
        }}
      >
        <MobileFeed />
      </main>

      <NavDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentUser={currentUser}
        isFeedPage={true}
      />

      <MobileBottomNav />
    </div>
  )
}