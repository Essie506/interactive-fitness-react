import { useState } from 'react'
import { MobileTopNav } from './components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { MobileFeed } from './components/layout/MobileFeed'
import { NavDrawer } from './components/layout/NavDrawer'

const MOCK_USER = {
  id: 'alex',
  name: 'Alex Kim',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alex',
  accountType: 'customer',
  isVerified: false,
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <MobileTopNav
        unreadMessages={3}
        unreadNotifications={2}
        onLogoClick={() => setDrawerOpen(true)}
      />

      <main
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
        currentUser={MOCK_USER}
        isFeedPage={true}
      />

      <MobileBottomNav />
    </>
  )
}

export default App