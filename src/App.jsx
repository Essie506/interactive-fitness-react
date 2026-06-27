import { MobileTopNav } from './components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { MobileFeed } from './components/layout/MobileFeed'
import { PostComposer } from './components/layout/PostComposer'
import { PostCard } from './components/layout/Postcard'



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
<PostComposer />
<PostCard />
      </main>

      <MobileBottomNav />
    </>
  )
}

export default App