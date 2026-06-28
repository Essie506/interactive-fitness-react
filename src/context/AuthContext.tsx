
// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db, doc, getDoc } from '../firebase/firebase-config'
import { InteractiveUser, AccountType, ViewerMode } from '../components/types/auth.types'

interface AuthContextValue {
  firebaseUser:    User | null
  interactiveUser: InteractiveUser | null
  accountType:     AccountType | null
  viewerMode:      ViewerMode
  loading:         boolean
  clearAuth:       () => void
}

const AuthContext = createContext<AuthContextValue>({
  firebaseUser:    null,
  interactiveUser: null,
  accountType:     null,
  viewerMode:      'visitor',
  loading:         true,
  clearAuth:       () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser,    setFirebaseUser]    = useState<User | null>(null)
  const [interactiveUser, setInteractiveUser] = useState<InteractiveUser | null>(null)
  const [loading,         setLoading]         = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user)

      if (user) {
        try {
          const snap = await getDoc(doc(db, 'users', user.uid))
          if (snap.exists()) {
            const data = snap.data() as InteractiveUser
            setInteractiveUser(data)
            localStorage.setItem('accountType', data.accountType)
            localStorage.setItem('viewerMode',  'self')
          }
        } catch (err) {
          console.error('Error loading user profile:', err)
        }
      } else {
        setInteractiveUser(null)
        localStorage.removeItem('accountType')
        localStorage.removeItem('viewerMode')
      }

      setLoading(false)
    })

    return unsub
  }, [])

  function clearAuth() {
    setFirebaseUser(null)
    setInteractiveUser(null)
    localStorage.removeItem('accountType')
    localStorage.removeItem('viewerMode')
  }

  const accountType = interactiveUser?.accountType ?? null
  const viewerMode  = (localStorage.getItem('viewerMode') as ViewerMode) ?? 'visitor'

  return (
    <AuthContext.Provider value={{
      firebaseUser,
      interactiveUser,
      accountType,
      viewerMode,
      loading,
      clearAuth,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}