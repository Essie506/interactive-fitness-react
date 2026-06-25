
Badge.tsx — Verified Badges
ui/
// components/ui/Badge.tsx
import type { VerificationType, VerificationStatus } from '@/types/profile.types'

const BADGE_CONFIG: Record<VerificationType, { label: string; className: string }> = {
  verified_professional: { label: 'Verified Professional', className: 'badge-professional' },
  verified_gym:          { label: 'Verified Gym',          className: 'badge-gym' },
  verified_business:     { label: 'Verified Business',     className: 'badge-business' },
  verified_nutritionist: { label: 'Verified Nutritionist', className: 'badge-nutritionist' },
  verified_wellness_provider: { label: 'Verified Wellness',  className: 'badge-wellness' },
  none: { label: '', className: '' },
}

interface BadgeProps {
  verificationType: VerificationType
  verificationStatus: VerificationStatus
  size?: 'sm' | 'md'
}

// Only renders when status === 'verified'
export function VerifiedBadge({ verificationType, verificationStatus, size = 'md' }: BadgeProps) {
  if (verificationStatus !== 'verified' || verificationType === 'none') return null
  const { label, className } = BADGE_CONFIG[verificationType]
  return (
    <span className={`verified-badge ${className} badge-${size}`} title={label}>
      ✓ {label}
    </span>
  )
}

// Status indicator — shows on profiles when not yet verified
export function VerificationStatusPill({ status }: { status: VerificationStatus }) {
  const map = {
    not_verified: { label: 'Not Verified',        className: 'status-unverified' },
    pending:      { label: 'Verification Pending', className: 'status-pending' },
    verified:     { label: 'Verified',             className: 'status-verified' },
    rejected:     { label: 'Verification Rejected',className: 'status-rejected' },
  }
  const { label, className } = map[status]
  return <span className={`verification-status-pill ${className}`>{label}</span>
}

    </div>
  )
}
