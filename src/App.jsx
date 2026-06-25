import { Navbar } from './components/layout/navbar'

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
