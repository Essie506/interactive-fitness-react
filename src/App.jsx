import { Navbar } from '.layout/Navbar'

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
