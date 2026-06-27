// data/navigationConfig.ts
import { NavSection } from '../types/navigation.types'

export const SHARED_SECTIONS: NavSection[] = [
  {
    id: 'workouts',
    label: 'Workouts',
    icon: '💪',
    children: [
      { id: 'browse-workouts', label: 'Browse Workouts', to: '/workouts' },
      { id: 'trending',        label: 'Trending',        to: '/workouts/trending' },
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    icon: '🌿',
    children: [
      { id: 'nutrition',        label: 'Nutrition',                to: '/explore/nutrition' },
      { id: 'recovery',         label: 'Recovery',                 to: '/explore/recovery' },
      { id: 'mental-health',    label: 'Mental Health',            to: '/explore/mental-health' },
      { id: 'fitness-stages',   label: 'Fitness For Every Stage',  to: '/explore/fitness-stages' },
    ],
  },
  {
    id: 'discover',
    label: 'Discover',
    icon: '🔍',
    children: [
      { id: 'gyms',     label: 'Gyms, Studios & Clubs', to: '/directory/gyms' },
      { id: 'trainers', label: 'Trainers',               to: '/directory/trainers' },
      { id: 'events',   label: 'Events',                 to: '/directory/events' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    icon: 'ℹ️',
    children: [
      { id: 'about-us',  label: 'About Interactive', to: '/about' },
      { id: 'community', label: 'Community Values',  to: '/about/community' },
    ],
  },
]

export const CUSTOMER_SECTION: NavSection = {
  id: 'my-account',
  label: 'My Account',
  icon: '👤',
  accountTypes: ['customer'],
  children: [
    { id: 'my-details',       label: 'My Details',      to: '/account/details' },
    { id: 'schedule',         label: 'Schedule',         to: '/account/schedule' },
    { id: 'saved-workouts',   label: 'Saved Workouts',   to: '/account/saved' },
    { id: 'media',            label: 'Media',            to: '/account/media' },
  ],
}

export const PROFESSIONAL_SECTION: NavSection = {
  id: 'my-account',
  label: 'My Account',
  icon: '🏅',
  accountTypes: ['professional'],
  children: [
    { id: 'my-details',          label: 'My Details',          to: '/account/details' },
    { id: 'professional-details',label: 'Professional Details', to: '/account/professional' },
    { id: 'schedule',            label: 'Schedule',             to: '/account/schedule' },
    { id: 'saved-workouts',      label: 'Saved Workouts',       to: '/account/saved' },
    { id: 'media',               label: 'Media',                to: '/account/media' },
    { id: 'clients',             label: 'Clients',              to: '/account/clients', badge: 'Soon', disabled: true },
  ],
}

export const BUSINESS_SECTION: NavSection = {
  id: 'my-account',
  label: 'My Account',
  icon: '🏢',
  accountTypes: ['business'],
  children: [
    { id: 'business-details', label: 'Business Details', to: '/account/business' },
    { id: 'staff',            label: 'Staff',             to: '/account/staff' },
    { id: 'media',            label: 'Media',             to: '/account/media' },
    { id: 'advertising',      label: 'Advertising',       to: '/account/advertising', badge: 'Soon', disabled: true },
  ],
}