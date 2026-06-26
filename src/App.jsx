import { MobileTopNav } from './components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { MobileFeed } from './components/layout/MobileFeed'

function App() {
  return (
    <>
      <MobileTopNav
        unreadMessages={3}
        unreadNotifications={2}
      />

      <main
        style={{
          paddingTop: '64px',
          paddingBottom: '80px',
        }}
      >
      

<MobileFeed />      
      </main>

      <MobileBottomNav />
    </>
  )
}

export default App