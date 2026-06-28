// src/components/auth/AccountTypeSelect.tsx
import React from 'react'
import { AccountType } from '../../types/auth.types'
import './AccountTypeSelect.css'

interface AccountTypeOption {
  value:       AccountType
  label:       string
  description: string
  emoji:       string
}

const OPTIONS: AccountTypeOption[] = [
  {
    value:       'customer',
    label:       'Member',
    description: 'I want to find trainers, classes and workouts',
    emoji:       '🏃',
  },
  {
    value:       'professional',
    label:       'Professional',
    description: 'I\'m a trainer, instructor or wellness professional',
    emoji:       '🏅',
  },
  {
    value:       'business',
    label:       'Business',
    description: 'I represent a gym, studio or fitness business',
    emoji:       '🏢',
  },
]

interface AccountTypeSelectProps {
  value:    AccountType | ''
  onChange: (value: AccountType) => void
  error?:   string
}

export function AccountTypeSelect({ value, onChange, error }: AccountTypeSelectProps) {
  return (
    <div className="account-type-select">
      <p className="account-type-select__label">I am joining as a…</p>
      <div className="account-type-select__options">
        {OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`account-type-select__option${value === opt.value ? ' account-type-select__option--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="account-type-select__emoji">{opt.emoji}</span>
            <div className="account-type-select__text">
              <span className="account-type-select__option-label">{opt.label}</span>
              <span className="account-type-select__option-desc">{opt.description}</span>
            </div>
            <span className="account-type-select__check" aria-hidden="true">
              {value === opt.value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
          </button>
        ))}
      </div>
      {error && <p className="account-type-select__error">{error}</p>}
    </div>
  )
}