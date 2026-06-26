// components/mobile/StoriesRow.tsx
import React from 'react'
import { Plus } from 'lucide-react'

interface Story {
  id: string
  name: string
  avatar: string
}

interface StoriesRowProps {
  stories: Story[]
  onStoryClick?: (id: string) => void
  onAddStory?: () => void
}

export function StoriesRow({ stories, onStoryClick, onAddStory }: StoriesRowProps) {
  return (
    <div className="stories-row">
      <div className="stories-row__scroll">

        {/* Add story */}
        <div className="stories-row__item">
          <button
            className="stories-row__add-btn"
            onClick={onAddStory}
            aria-label="Add your story"
          >
            <Plus size={20} color="#9ca3af" />
          </button>
          <span className="stories-row__name">Your story</span>
        </div>

        {/* Story items */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="stories-row__item"
            onClick={() => onStoryClick?.(story.id)}
            role="button"
            tabIndex={0}
            aria-label={`${story.name}'s story`}
          >
            <div className="stories-row__ring">
              <div className="stories-row__avatar-wrap">
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="stories-row__avatar"
                />
              </div>
            </div>
            <span className="stories-row__name">{story.name}</span>
          </div>
        ))}

      </div>
    </div>
  )
}
