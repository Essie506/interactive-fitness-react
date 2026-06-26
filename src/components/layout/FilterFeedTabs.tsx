// components/mobile/FeedFilterTabs.tsx
import React from 'react'

export type FeedFilter = 'all' | 'tip' | 'achievement' | 'image' | 'workout'

interface FilterOption {
  value: FeedFilter
  label: string
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all',         label: 'For You' },
  { value: 'tip',         label: 'Tips' },
  { value: 'achievement', label: 'Wins 🏆' },
  { value: 'image',       label: 'Photos' },
  { value: 'workout',     label: 'Workouts' },
]

interface FeedFilterTabsProps {
  activeFilter: FeedFilter
  onFilterChange: (filter: FeedFilter) => void
}

export function FeedFilterTabs({ activeFilter, onFilterChange }: FeedFilterTabsProps) {
  return (
    <div className="feed-filter-tabs">
      <div className="feed-filter-tabs__scroll">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            className={`feed-filter-tabs__btn${activeFilter === value ? ' feed-filter-tabs__btn--active' : ''}`}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}