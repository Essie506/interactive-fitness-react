// src/components/auth/SignupForm.tsx
import React, { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  serverTimestamp,
} from '../../firebase/firebase-config'
import {
  AccountType,
  InteractiveUser,
  roleFromAccountType,
  routeFromAccountType,
} from '../../types/auth.types'
import { PasswordInput }      from './PasswordInput'
import { AccountTypeSelect }  from './AccountTypeSelect'
import './AuthForms.css'

export function SignupForm() {
  const navigate = useNavigate()

  const [displayName,  setDisplayName]  = useState('')
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [accountType,  setAccountType]  = useState<AccountType | ''>('')
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [typeError,    setTypeError]    = useState('')

  const isReady =
    displayName.trim().length > 0 &&
    email.trim().length       > 0 &&
    password.length           >= 6 &&
    accountType               !== ''

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return

    if (!accountType) {
      setTypeError('Please choose an account type.')
      return
    }
    setTypeError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const credential = await createUserWithEmailAndPassword(
        auth, email.trim(), password
      )
      const uid = credential.user.uid

      const userData: Omit<InteractiveUser, 'createdAt'> & { createdAt: unknown } = {
        uid,
        displayName:        displayName.trim(),
        email:              email.trim(),
        accountType:        accountType as AccountType,
        verified:           false,
        verificationStatus: 'not_verified',
        avatar:             '',
        bio:                '',
        role:               roleFromAccountType(accountType as AccountType),
        createdAt:          serverTimestamp(),
      }

      await setDoc(doc(db, 'users', uid), userData)

      localStorage.setItem('accountType', accountType)
      localStorage.setItem('viewerMode',  'self')

      navigate(routeFromAccountType(accountType as AccountType), { replace: true })
    } catch (err: unknown) {
      setError(friendlyError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>

      {error && (
        <div className="auth-form__error" role="alert">{error}</div>
      )}

      <div className="auth-form__field">
        <input
          type="text"
          className="auth-input"
          placeholder="Your name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div className="auth-form__field">
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div className="auth-form__field">
        <PasswordInput
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={e => setPassword((e.target as HTMLInputElement).value)}
          autoComplete="new-password"
          required
        />
      </div>

      <div className="auth-form__field">
        <AccountTypeSelect
          value={accountType}
          onChange={v => { setAccountType(v); setTypeError('') }}
          error={typeError}
        />
      </div>

      <button
        type="submit"
        className={`auth-btn auth-btn--primary${isReady ? ' auth-btn--ready' : ''}`}
        disabled={!isReady || loading}
      >
        {loading ? <span className="auth-btn__spinner" /> : 'Create account'}
      </button>

      <div className="auth-form__links">
        <Link to="/login" className="auth-link">Already have an account?</Link>
      </div>

    </form>
  )
}

function friendlyError(err: unknown): string {
  if (typeof err !== 'object' || err === null) return 'Something went wrong.'
  const code = (err as { code?: string }).code
  switch (code) {
    case 'auth/email-already-in-use': return 'An account already exists with this email.'
    case 'auth/weak-password':         return 'Password must be at least 6 characters.'
    case 'auth/invalid-email':         return 'Please enter a valid email address.'
    case 'auth/network-request-failed':return 'Check your internet connection.'
    default:
      return (err as { message?: string }).message ?? 'Something went wrong.'
  }
}