// src/types/auth.types.ts

export type AccountType = 'customer' | 'professional' | 'business'
export type ViewerMode  = 'self' | 'visitor'

export type RoleLabel = 'Member' | 'Trainer' | 'Business'

export interface InteractiveUser {
  uid:                string
  displayName:        string
  email:              string
  accountType:        AccountType
  verified:           boolean
  verificationStatus: 'not_verified' | 'pending' | 'verified' | 'rejected'
  avatar:             string
  bio:                string
  role:               RoleLabel
  createdAt:          unknown // Firestore Timestamp
}

export function roleFromAccountType(accountType: AccountType): RoleLabel {
  switch (accountType) {
    case 'professional': return 'Trainer'
    case 'business':     return 'Business'
    default:             return 'Member'
  }
}

export function routeFromAccountType(accountType: AccountType): string {
  switch (accountType) {
    case 'professional': return '/profile'
    case 'business':     return '/business-profile'
    default:             return '/feed'
  }
}