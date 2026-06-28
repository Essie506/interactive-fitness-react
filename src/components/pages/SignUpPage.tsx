// src/pages/SignupPage.tsx
import React from 'react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { SignupForm } from '../components/auth/SignupForm'

export function SignupPage() {
  return (
    <AuthLayout tagline="Join the community.">
      <SignupForm />
    </AuthLayout>
  )
}