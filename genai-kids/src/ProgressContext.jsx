import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import { useAuth } from './AuthContext'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState({})
  const [synced, setSynced] = useState(false)
  const userRef = useRef(user)

  useEffect(() => {
    userRef.current = user
  }, [user])

  useEffect(() => {
    if (user) {
      loadFromCloud()
    } else {
      const saved = localStorage.getItem('genai-progress')
      setProgress(saved ? JSON.parse(saved) : {})
      setSynced(true)
    }
  }, [user?.uid])

  const loadFromCloud = async () => {
    try {
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const cloudProgress = snap.data().progress || {}
        const local = JSON.parse(localStorage.getItem('genai-progress') || '{}')
        const merged = { ...local, ...cloudProgress }
        setProgress(merged)
        localStorage.setItem('genai-progress', JSON.stringify(merged))
      } else {
        const local = JSON.parse(localStorage.getItem('genai-progress') || '{}')
        setProgress(local)
        await setDoc(ref, {
          uid: user.uid,
          name: user.name,
          email: user.email,
          progress: local,
          createdAt: serverTimestamp(),
          lastSeen: serverTimestamp(),
        })
      }
    } catch (e) {
      console.error('Load error:', e)
      const saved = localStorage.getItem('genai-progress')
      setProgress(saved ? JSON.parse(saved) : {})
    }
    setSynced(true)
  }

  const saveToCloud = async (newProgress) => {
    localStorage.setItem('genai-progress', JSON.stringify(newProgress))
    const currentUser = userRef.current
    if (!currentUser) return
    try {
      const ref = doc(db, 'users', currentUser.uid)
      await setDoc(ref, {
        uid: currentUser.uid,
        name: currentUser.name,
        email: currentUser.email,
        progress: newProgress,
        lastSeen: serverTimestamp(),
      }, { merge: true })
      console.log('✅ Firestore saved!')
    } catch (e) {
      console.error('Save error:', e)
    }
  }

  const markComplete = async (age, topic) => {
    const key = `${age}-${topic}`
    const newProgress = {
      ...progress,
      [key]: { completed: true, completedAt: new Date().toISOString() }
    }
    setProgress(newProgress)
    await saveToCloud(newProgress)
  }

  const isComplete = (age, topic) => !!progress[`${age}-${topic}`]?.completed

  const getAgeProgress = (age, topics) => {
    const done = topics.filter(t => isComplete(age, t)).length
    return { done, total: topics.length, pct: Math.round((done / topics.length) * 100) }
  }

  const resetProgress = async () => {
    setProgress({})
    localStorage.removeItem('genai-progress')
    const currentUser = userRef.current
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), { progress: {} }, { merge: true })
      } catch (e) { console.error(e) }
    }
  }

  return (
    <ProgressContext.Provider value={{ progress, markComplete, isComplete, getAgeProgress, resetProgress, synced }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}