import { MobileTopNav } from './components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from './components/layout/MobileBottomNav'

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
        Coming Soon...
      </main>

      <MobileBottomNav />
    </>
  )
}

export default App