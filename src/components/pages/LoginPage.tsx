// src/pages/LoginPage.tsx
import React from 'react'
import { AuthLayout } from '../../..components/auth/AuthLayout'
import { LoginForm }  from '../../components/auth/LoginForm'

export function LoginPage() {
  return (
    <AuthLayout tagline="Move. Train. Connect.">
      <LoginForm />
    </AuthLayout>
  )
}