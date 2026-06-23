
FeedPage.tsx — Assembly
pages/
// pages/FeedPage.tsx — the top-level page that assembles everything
export function FeedPage() {
  const { isMenuOpen, setMenuOpen, isComposerOpen } = useUI()
  const { mode } = useMessages()

  return (
    <div className="app-root">

      <Navbar />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <FeedLayout>
        <PartnerSidebar />
        <Feed />
        <PromoSidebar />
      </FeedLayout>

      {'/* Messages — renders based on mode */'}
      {mode === "drawer"   && <MessagesDrawer />}
      {mode === "popup"    && <MessagesPopup />}
      {mode === "popout"   && <MessagesPopout />}
      {mode === "minimized" && <MinimizedChatButton />}

      {isComposerOpen && <PostComposerModal />}
