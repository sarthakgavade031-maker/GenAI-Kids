import { createContext, useContext, useState, useEffect } from 'react'
import { auth, googleProvider } from './firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { registerUserIfNew } from './userStats'

/**
 * @typedef {{ uid: string, name: string, email: string, photo: string }} UserProfile
 */

/** @type {import('react').Context<{ user: UserProfile|null, loading: boolean, loginWithGoogle: () => Promise<boolean>, logout: () => Promise<void> }>} */
// @ts-ignore
const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithGoogle: async () => false,
  logout: async () => { },
})

// @ts-ignore
export function AuthProvider({ children }) {
  /** @type {[UserProfile|null, import('react').Dispatch<import('react').SetStateAction<UserProfile|null>>]} */
  // @ts-ignore
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        /** @type {UserProfile} */
        const profile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName ?? '',
          email: firebaseUser.email ?? '',
          photo: firebaseUser.photoURL ?? '',
        }
        setUser(profile)
        registerUserIfNew(profile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleProvider)
      const u = result.user
      /** @type {UserProfile} */
      const profile = {
        uid: u.uid,
        name: u.displayName ?? '',
        email: u.email ?? '',
        photo: u.photoURL ?? '',
      }
      setUser(profile)
      registerUserIfNew(profile)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
