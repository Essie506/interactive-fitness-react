import { Navbar } from './components/layout/Navbar'
import { MobileBottomNav } from './components/layout/MobileBottomNav'

function App() {
  return (
    <>
      <Navbar
        variant="feed"
        unreadMessages={2}
        unreadNotifications={5}
      />

      <main>
        Coming Soon...
      </main>

  
    </>
  )
}

export default App