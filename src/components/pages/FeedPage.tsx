
import { useState } from 'react'

import { useAuth } from '../../context/AuthContext'

import { MobileTopNav } from '../../components/layout/mobile/MobileTopNav'
import { MobileFeed } from '../../components/layout/MobileFeed'
import { NavDrawer } from '../../components/layout/NavDrawer'
import { MobileBottomNav } from '../../components/layout/MobileBottomNav'


export function FeedPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { interactiveUser } = useAuth()

  const currentUser = {
    id: interactiveUser?.uid || '',
    name: interactiveUser?.displayName || 'Member',
    avatar: interactiveUser?.avatar || '',
    accountType: interactiveUser?.accountType || 'customer',
    type: interactiveUser?.accountType || 'customer',
    isVerified: interactiveUser?.verified || false,
  }

  return (
    <>
      <MobileTopNav
  unreadMessages={3}
  unreadNotifications={2}
  onLogoClick={() => setDrawerOpen(true)}
/>

      <main style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <MobileFeed currentUser={currentUser} />
      </main>

      <NavDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentUser={currentUser}
        isFeedPage={true}
      />

      <MobileBottomNav />
    </>
  )
}
