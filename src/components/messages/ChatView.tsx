
// ChatView.tsx — composes the thread + composer
export function ChatView({ threadId, onBack }) {
  return (
    <div className="chat-view">
      <button onClick={onBack} className="back-btn">← Back</button>
      <MessageThread threadId={threadId} />
      <MessageComposer threadId={threadId} />
    </div>
  )
}
