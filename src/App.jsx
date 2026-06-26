import { MobileTopNav } from './components/composer/mobile/MobileTopNav'

function App() {
  return (
    <MobileTopNav
      unreadMessages={3}
      unreadNotifications={2}
    />
  )
}

export default App