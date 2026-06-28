
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/router/ProtectedRoute'
import { useAuth } from './context/AuthContext'

import { LoginPage } from './components/pages/LoginPage'
import { SignupPage } from './components/pages/SignUpPage'
import { FeedPage } from './components/pages/FeedPage'


const MOCK_USER = {
  id: 'alex',
  name: 'Alex Kim',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=alex',
  accountType: 'customer',
  isVerified: false,
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