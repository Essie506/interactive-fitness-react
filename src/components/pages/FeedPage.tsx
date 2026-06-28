function FeedPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { interactiveUser } = useAuth()

  const currentUser = {
    id: interactiveUser?.uid,
    name: interactiveUser?.displayName || 'Member',
    avatar: interactiveUser?.avatar || '',
    accountType: interactiveUser?.accountType || 'customer',
    isVerified: interactiveUser?.verified || false,
  }

  return (
    <>
      <Navbar
        unreadMessages={3}
        unreadNotifications={2}
        onLogoClick={() => setDrawerOpen(true)}
      />

      <main style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <../MobileFeed />
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
