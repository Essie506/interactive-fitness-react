// components/mobile/MobileFeed.tsx
import React, { useState } from 'react'
import { StoriesRow }      from './StoriesRow'
import { FeedFilterTabs, FeedFilter } from './FilterFeedTabs'
import { PostCard }        from './PostCard'
import { PostComposer }    from './PostComposer'
import { MOCK_POSTS }      from '../data/mockPosts'
import { Post, ReactionType, Author } from '../types/post.types'
import './MobileFeed.css'

const MOCK_STORIES = [
  { id: 'maya',  name: 'Maya',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=maya'        },
  { id: 'james', name: 'James', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=james'       },
  { id: 'sofia', name: 'Sofia', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sofia'       },
  { id: 'priya', name: 'Priya', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=priya'       },
  { id: 'urban', name: 'Urban', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=urbanfitness'},
]


interface MobileFeedProps {
  currentUser: Author
  onProfileClick?: (authorId: string) => void
  onStoryClick?: (storyId: string) => void
}


export function MobileFeed({
  currentUser,
  onProfileClick,
  onStoryClick,
}: MobileFeedProps) {

  const [posts,           setPosts]           = useState<Post[]>(MOCK_POSTS)
  const [activeFilter,    setActiveFilter]    = useState<FeedFilter>('all')
  const [composerOpen,    setComposerOpen]    = useState(false)

  // ── Firebase hook-in: replace body with Firestore write + optimistic update ──
  function handleReact(postId: string, type: ReactionType, next: boolean) {
    // TODO: await firestore().collection('reactions').doc(...).set(...)
    console.log('react', postId, type, next)
  }

  function handleSave(postId: string, next: boolean) {
    // TODO: await firestore().collection('saved').doc(...).set(...)
    console.log('save', postId, next)
  }

  function handlePublish(newPost: Post) {
    setPosts(prev => [newPost, ...prev])
    // TODO: await firestore().collection('posts').add(toWritePayload(newPost))
  }

  const filtered = activeFilter === 'all'
    ? posts
    : posts.filter(p => p.postType === activeFilter)

  return (
    <div className="mobile-feed">

      <div className="mobile-feed__stories">
        <StoriesRow
          stories={MOCK_STORIES}
          onStoryClick={onStoryClick}
          onAddStory={() => setComposerOpen(true)}
        />
      </div>

      <div className="mobile-feed__filters">
        <FeedFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="mobile-feed__posts">
        {filtered.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onAuthorClick={onProfileClick}
            onReact={handleReact}
            onSave={handleSave}
            onComment={id => console.log('comment', id)}
            onShare={id   => console.log('share',   id)}
            onMore={id    => console.log('more',    id)}
          />
        ))}
      </div>

      {composerOpen && (
        <PostComposer
          currentUser={currentUser}
          onClose={()         => setComposerOpen(false)}
          onPublish={handlePublish}
        />
      )}

    </div>
  )
}