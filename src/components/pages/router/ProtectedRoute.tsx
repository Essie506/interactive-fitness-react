// src/router/ProtectedRoute.tsx
import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children:      ReactNode
  allowedTypes?: string[]
}

export function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const { firebaseUser, accountType, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 32, height: 32, border: '3px solid #FF6B6B', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.65s linear infinite' }} />
      </div>
    )
  }

  if (!firebaseUser)  return <Navigate to="/login" replace />

  if (allowedTypes && accountType && !allowedTypes.includes(accountType)) {
    const { routeFromAccountType } = require('../types/auth.types')
    return <Navigate to={routeFromAccountType(accountType)} replace />
  }

  return <>{children}</>
}