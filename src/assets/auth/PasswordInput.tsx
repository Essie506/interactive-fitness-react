// src/components/auth/PasswordInput.tsx
import React, { useState, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import './PasswordInput.css'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function PasswordInput({ label, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="password-input">
      <div className="password-input__wrap">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className="auth-input password-input__field"
        />
        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )
}