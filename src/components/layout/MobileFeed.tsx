// components/mobile/MobileFeed.tsx
import React, { useState } from 'react'
import { StoriesRow } from './StoriesRow'
import { FeedFilterTabs, FeedFilter } from './FilterFeedTabs'
import { FeedPostCard, Post } from './FeedPostCard'
import './mobileFeed.css'

const MOCK_STORIES = [
  { id: 'maya',  name: 'Maya',  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=maya' },
  { id: 'james', name: 'James', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=james' },
  { id: 'sofia', name: 'Sofia', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sofia' },
  { id: 'priya', name: 'Priya', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=priya' },
  { id: 'urban', name: 'Urban', avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=urbanfitness' },
]

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: 'Maya Chen',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=maya',
    type: 'professional',
    content: '3 things I wish I\'d known when I started lifting 👇\n\n1. Progressive overload is everything — add just 2.5kg per week\n2. Protein timing matters less than total daily protein\n3. Rest days aren\'t lazy. They\'re when you get stronger 💪',
    postType: 'tip',
    tags: ['strength', 'tips', 'nutrition'],
    likes: 847,
    comments: 63,
    liked: false,
  },
  {
    id: 2,
    author: 'James Okafor',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=james',
    type: 'professional',
    content: 'Monday\'s 6am session crew — you lot never miss 🙌⭐\n\nWe smashed a 45 min HIIT circuit this morning. Everyone pushed their limits and I couldn\'t be more proud. This is what community looks like.',
    postType: 'image',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    tags: ['hiit', 'community', 'monday'],
    likes: 423,
    comments: 38,
    liked: false,
  },
  {
    id: 3,
    author: 'Sofia Vasquez',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sofia',
    type: 'professional',
    content: 'Morning flow 🌅✨\n\nStarted today with 20 minutes of sun salutations and breathwork. 15 minutes of intentional movement can shift your entire day. Try it tomorrow morning 🌿',
    postType: 'image',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    tags: ['yoga', 'morning', 'mindfulness'],
    likes: 1204,
    comments: 87,
    liked: false,
  },
  {
    id: 4,
    author: 'Urban Fitness Co.',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=urbanfitness',
    type: 'business',
    content: '🎉 NEW: Reformer Pilates is LIVE at Urban Fitness Shoreditch!\n\nWe\'ve added 12 brand-new reformers and two incredible instructors. Intro classes from just £12. Spots filling fast — book now!',
    postType: 'image',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    tags: ['pilates', 'london', 'newclass'],
    likes: 673,
    comments: 44,
    liked: false,
  },
  {
    id: 5,
    author: 'Priya Nair',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=priya',
    type: 'professional',
    content: 'Hot take: most fitness people are massively under-eating carbs 🍚\n\nCarbs are your body\'s preferred fuel for exercise. Cutting them completely hurts your performance, recovery and hormonal health. Eat the carbs. Time them well. Win. 🏆',
    postType: 'tip',
    tags: ['nutrition', 'carbs', 'science'],
    likes: 2341,
    comments: 198,
    liked: false,
  },
  {
    id: 6,
    author: 'Alex Kim',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alex',
    type: 'customer',
    content: 'Week 4 of actually sticking to a routine and I\'m actually starting to ENJOY it?? 😱 Who am I?\n\n3 workouts this week and a 5k on Sunday. Small wins but they feel HUGE. Thanks for the motivation ❤️',
    postType: 'achievement',
    tags: ['beginner', 'progress', 'motivation'],
    likes: 312,
    comments: 57,
    liked: false,
  },
]

interface MobileFeedProps {
  onProfileClick?: (name: string) => void
  onStoryClick?: (id: string) => void
}

export function MobileFeed({ onProfileClick, onStoryClick }: MobileFeedProps) {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all')

  const filteredPosts =
    activeFilter === 'all'
      ? MOCK_POSTS
      : MOCK_POSTS.filter((p) => p.postType === activeFilter)

  return (
    <div className="mobile-feed">

      {/* Stories */}
      <div className="mobile-feed__stories">
        <StoriesRow
          stories={MOCK_STORIES}
          onStoryClick={onStoryClick}
          onAddStory={() => {}}
        />
      </div>

      {/* Filter tabs */}
      <div className="mobile-feed__filters">
        <FeedFilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Posts */}
      <div className="mobile-feed__posts">
        {filteredPosts.map((post) => (
          <FeedPostCard
            key={post.id}
            post={post}
            onAuthorClick={onProfileClick}
          />
        ))}
      </div>

    </div>
  )
}