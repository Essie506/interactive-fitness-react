// types/navigation.types.ts

export type AccountType = 'public' | 'customer' | 'professional' | 'business'

export interface NavUser {
  id: string
  name: string
  avatar: string
  accountType: AccountType
  isVerified: boolean
}

export interface NavSection {
  id: string
  label: string
  icon?: string
  children: NavItem[]
  accountTypes?: AccountType[] // undefined = show to all
}

export interface NavItem {
  id: string
  label: string
  to: string
  badge?: string
  accountTypes?: AccountType[]
  disabled?: boolean
}