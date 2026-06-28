import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './router/ProtectedRoute'
import { useAuth } from './context/AuthContext'

import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { FeedPage } from './pages/FeedPage'

import { MobileTopNav } from './components/composer/mobile/MobileTopNav'
import { MobileBottomNav } from './components/layout/MobileBottomNav'
import { MobileFeed } from './components/layout/MobileFeed'
import { NavDrawer } from './components/layout/NavDrawer'

const MOCK_USER = {
  id: 'alex',
  name: 'Alex Kim',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alex',
  accountType: 'customer',
  isVerified: false,
}

function FeedPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <MobileTopNav
        unreadMessages={3}
        unreadNotifications={2}
        onLogoClick={() => setDrawerOpen(true)}
      />

      <main style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <MobileFeed />
      </main>

      <NavDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentUser={MOCK_USER}
        isFeedPage={true}
      />

      <MobileBottomNav />
    </>
  )
}

const ProfilePage = () => <div>Professional Profile</div>
const BusinessProfilePage = () => <div>Business Profile</div>

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<SignupPage />} />

          <Route
            path="/feed"
            element={
              <ProtectedRoute allowedTypes={['customer']}>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedTypes={['professional']}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/business-profile"
            element={
              <ProtectedRoute allowedTypes={['business']}>
                <BusinessProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App