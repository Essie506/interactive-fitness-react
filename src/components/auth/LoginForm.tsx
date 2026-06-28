// src/components/auth/LoginForm.tsx
import React, { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  auth,
  db,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  doc,
  getDoc,
} from '../../../firebase/firebase-config'
import { InteractiveUser, routeFromAccountType } from '../types/auth.types'
import { PasswordInput } from './PasswordInput'
import './AuthForm.css'

export function LoginForm() {
  const navigate = useNavigate()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [resetSent,setResetSent]= useState(false)

  const isReady = email.trim().length > 0 && password.trim().length > 0

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isReady || loading) return

    setLoading(true)
    setError('')

    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
      const uid        = credential.user.uid

      const snap = await getDoc(doc(db, 'users', uid))
      if (!snap.exists()) throw new Error('User profile not found. Please sign up.')

      const userData = snap.data() as InteractiveUser
      localStorage.setItem('accountType', userData.accountType)
      localStorage.setItem('viewerMode',  'self')

      navigate(routeFromAccountType(userData.accountType), { replace: true })
    } catch (err: unknown) {
      setError(friendlyError(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError('Enter your email address first.')
      return
    }
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email.trim())
      setResetSent(true)
      setError('')
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
      {resetSent && (
        <div className="auth-form__success" role="status">
          Reset link sent — check your inbox.
        </div>
      )}

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
          placeholder="Password"
          value={password}
          onChange={e => setPassword((e.target as HTMLInputElement).value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button
        type="submit"
        className={`auth-btn auth-btn--primary${isReady ? ' auth-btn--ready' : ''}`}
        disabled={!isReady || loading}
      >
        {loading ? <span className="auth-btn__spinner" /> : 'Log in'}
      </button>

      <div className="auth-form__links">
        <Link to="/join" className="auth-link">Create account</Link>
        <button
          type="button"
          className="auth-link auth-link--btn"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

    </form>
  )
}

function friendlyError(err: unknown): string {
  if (typeof err !== 'object' || err === null) return 'Something went wrong.'
  const code = (err as { code?: string }).code
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/invalid-credential':   return 'Email or password is incorrect.'
    case 'auth/wrong-password':        return 'Email or password is incorrect.'
    case 'auth/too-many-requests':     return 'Too many attempts. Try again later.'
    case 'auth/network-request-failed':return 'Check your internet connection.'
    default:
      return (err as { message?: string }).message ?? 'Something went wrong.'
  }
}