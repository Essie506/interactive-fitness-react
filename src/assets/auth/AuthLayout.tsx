// src/components/auth/AuthLayout.tsx
import React, { ReactNode } from 'react'
import './AuthLayout.css'

interface AuthLayoutProps {
  children:  ReactNode
  tagline?:  string
}

export function AuthLayout({ children, tagline = 'Move. Train. Connect.' }: AuthLayoutProps) {
  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div className="auth-panel__inner">

          <header className="auth-panel__header">
            <div className="auth-panel__logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h1 className="auth-panel__brand">Interactive</h1>
            <p className="auth-panel__tagline">{tagline}</p>
          </header>

          {children}

        </div>
      </section>
    </main>
  )
}