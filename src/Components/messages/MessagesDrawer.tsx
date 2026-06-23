MessagesDrawer.tsx
messages/
// components/messages/MessagesDrawer.tsx
import { useMessages } from '@/context/MessagesContext'

export function MessagesDrawer() {
  const {
    mode, setMode,
    isChatView, setIsChatView,
    activeThread, setActiveThread,
    isSplitView
  } = useMessages()

  if (mode !== "drawer") return null

  return (
    <>
      <MessagesOverlay onClose={() => setMode("closed")} />
      <div className={`messages-drawer ${isSplitView ? 'split' : ''}`}>
        <MessagesHeader />
        {!isChatView
          ? <MessagesList
              onSelectThread={(id) => {
                setActiveThread(id)
                setIsChatView(true)
              }}
            />
          : <ChatView
              threadId={activeThread}
              onBack={() => setIsChatView(false)}
            />
        }
      </div>
    </>
  )
}
