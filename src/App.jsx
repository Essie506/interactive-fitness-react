import { Navbar } from './components/layout/Navbar'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { MobileTopNav } from './components/composer/mobile/MobileTopNav'

function App() {
  return (
    <>
      <div className="mobile-only">
        <MobileTopNav
          unreadMessages={3}
          unreadNotifications={2}
          onMessagesClick={() => console.log('messages')}
          onNotificationsClick={() => console.log('notifications')}
        />
      </div>

      <div className="desktop-only">
        <Navbar
          variant="feed"
          unreadMessages={2}
          unreadNotifications={5}
        />
      </div>

      <main>
        Coming Soon...
      </main>

      <MobileBottomNav />
    </>
  )
}

export default App