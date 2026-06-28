// src/pages/SignupPage.tsx
import React from 'react'
import { AuthLayout } from '../auth/AuthLayout'
import { SignupForm } from '../auth/SignUpForm'

export function SignupPage() {
  return (
    <AuthLayout tagline="Join the community.">
      <SignupForm />
    </AuthLayout>
  )
}