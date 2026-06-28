import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/router/ProtectedRoute'

import { LoginPage } from './components/pages/LoginPage'
import { SignupPage } from './components/pages/SignUpPage'
import { FeedPage } from './components/pages/FeedPage'

const ProfilePage = () => <div>Professional Profile</div>
const BusinessProfilePage = () => <div>Business Profile</div>

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App