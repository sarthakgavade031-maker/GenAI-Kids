import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import { useAuth } from './AuthContext'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const ProgressContext = createContext()

const MAX_HEARTS = 5
const XP_PER_LESSON = 20
const XP_PER_LESSON_READ = 5
const XP_PER_QUIZ_CORRECT = 10
const XP_PER_QUIZ_COMPLETE = 30

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState({})
  const [synced, setSynced] = useState(false)
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [lastLoginDate, setLastLoginDate] = useState(null)
  const userRef = useRef(user)

  useEffect(() => { userRef.current = user }, [user])

  useEffect(() => {
    if (user) {
      loadFromCloud()
    } else {
      const saved = localStorage.getItem('genai-progress')
      const savedXp = parseInt(localStorage.getItem('genai-xp') || '0')
      const savedStreak = parseInt(localStorage.getItem('genai-streak') || '0')
      const savedHearts = parseInt(localStorage.getItem('genai-hearts') || String(MAX_HEARTS))
      const savedLastLogin = localStorage.getItem('genai-last-login')
      setProgress(saved ? JSON.parse(saved) : {})
      setXp(savedXp)
      setHearts(savedHearts)
      setLastLoginDate(savedLastLogin)
      updateStreak(savedStreak, savedLastLogin)
      setSynced(true)
    }
  }, [user?.uid])

  // --- Streak Logic ---
  const updateStreak = (currentStreak, lastLogin) => {
    const today = new Date().toDateString()
    if (!lastLogin) {
      setStreak(1)
      localStorage.setItem('genai-streak', '1')
      localStorage.setItem('genai-last-login', today)
      return 1
    }
    if (lastLogin === today) {
      setStreak(currentStreak)
      return currentStreak
    }
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (lastLogin === yesterday.toDateString()) {
      const newStreak = currentStreak + 1
      setStreak(newStreak)
      localStorage.setItem('genai-streak', String(newStreak))
      localStorage.setItem('genai-last-login', today)
      return newStreak
    }
    // Streak broken
    setStreak(1)
    localStorage.setItem('genai-streak', '1')
    localStorage.setItem('genai-last-login', today)
    return 1
  }

  // --- Cloud Load ---
  const loadFromCloud = async () => {
    try {
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        const cloudProgress = data.progress || {}
        const local = JSON.parse(localStorage.getItem('genai-progress') || '{}')
        const merged = { ...local, ...cloudProgress }
        setProgress(merged)
        localStorage.setItem('genai-progress', JSON.stringify(merged))
        const cloudXp = data.xp || 0
        const cloudHearts = data.hearts ?? MAX_HEARTS
        const cloudLastLogin = data.lastLoginDate || null
        const cloudStreak = data.streak || 0
        setXp(cloudXp)
        setHearts(cloudHearts)
        setLastLoginDate(cloudLastLogin)
        updateStreak(cloudStreak, cloudLastLogin)
      } else {
        const local = JSON.parse(localStorage.getItem('genai-progress') || '{}')
        setProgress(local)
        await setDoc(ref, {
          uid: user.uid,
          email: user.email,
          progress: local,
          xp: 0,
          streak: 1,
          hearts: MAX_HEARTS,
          lastLoginDate: new Date().toDateString(),
          createdAt: serverTimestamp(),
          lastSeen: serverTimestamp(),
        })
        setStreak(1)
        setHearts(MAX_HEARTS)
      }
    } catch (e) {
      console.error('Load error:', e)
      const saved = localStorage.getItem('genai-progress')
      setProgress(saved ? JSON.parse(saved) : {})
    }
    setSynced(true)
  }

  // --- Cloud Save ---
  const saveToCloud = async (newProgress, newXp, newHearts, newStreak) => {
    localStorage.setItem('genai-progress', JSON.stringify(newProgress))
    localStorage.setItem('genai-xp', String(newXp))
    localStorage.setItem('genai-hearts', String(newHearts))
    localStorage.setItem('genai-streak', String(newStreak))
    const currentUser = userRef.current
    if (!currentUser) return
    try {
      const ref = doc(db, 'users', currentUser.uid)
      await setDoc(ref, {
        uid: currentUser.uid,
        email: currentUser.email,
        progress: newProgress,
        xp: newXp,
        hearts: newHearts,
        streak: newStreak,
        lastLoginDate: new Date().toDateString(),
        lastSeen: serverTimestamp(),
      }, { merge: true })
    } catch (e) {
      console.error('Save error:', e)
    }
  }

  // --- Mark Lesson Content as Read (gives small XP, separate from quiz completion) ---
  const markLessonRead = async (age, topic) => {
    const key = `read-${age}-${topic}`
    if (progress[key]?.read) return
    const newXp = xp + XP_PER_LESSON_READ
    const newProgress = {
      ...progress,
      [key]: { read: true, readAt: new Date().toISOString() }
    }
    setProgress(newProgress)
    setXp(newXp)
    await saveToCloud(newProgress, newXp, hearts, streak)
  }

  const isLessonRead = (age, topic) => !!progress[`read-${age}-${topic}`]?.read

  // --- Mark Lesson Complete (gives XP) ---
  const markComplete = async (age, topic) => {
    const key = `${age}-${topic}`
    if (progress[key]?.completed) return // already done
    const newXp = xp + XP_PER_LESSON
    const newProgress = {
      ...progress,
      [key]: { completed: true, completedAt: new Date().toISOString() }
    }
    setProgress(newProgress)
    setXp(newXp)
    await saveToCloud(newProgress, newXp, hearts, streak)
  }

  // --- Add XP (for quiz correct answers) ---
  const addXp = async (amount) => {
    const newXp = xp + amount
    setXp(newXp)
    localStorage.setItem('genai-xp', String(newXp))
    const currentUser = userRef.current
    if (currentUser) {
      try {
        const ref = doc(db, 'users', currentUser.uid)
        await setDoc(ref, { xp: newXp }, { merge: true })
      } catch (e) { console.error(e) }
    }
    return newXp
  }

  // --- Lose a Heart (wrong quiz answer) ---
  const loseHeart = async () => {
    if (hearts <= 0) return 0
    const newHearts = hearts - 1
    setHearts(newHearts)
    localStorage.setItem('genai-hearts', String(newHearts))
    const currentUser = userRef.current
    if (currentUser) {
      try {
        const ref = doc(db, 'users', currentUser.uid)
        await setDoc(ref, { hearts: newHearts }, { merge: true })
      } catch (e) { console.error(e) }
    }
    return newHearts
  }

  // --- Restore Hearts (called daily / after time) ---
  const restoreHearts = async () => {
    setHearts(MAX_HEARTS)
    localStorage.setItem('genai-hearts', String(MAX_HEARTS))
    const currentUser = userRef.current
    if (currentUser) {
      try {
        const ref = doc(db, 'users', currentUser.uid)
        await setDoc(ref, { hearts: MAX_HEARTS }, { merge: true })
      } catch (e) { console.error(e) }
    }
  }

  const isComplete = (age, topic) => !!progress[`${age}-${topic}`]?.completed

  const getAgeProgress = (age, topics) => {
    const done = topics.filter(t => isComplete(age, t)).length
    return { done, total: topics.length, pct: Math.round((done / topics.length) * 100) }
  }

  // --- XP Level System ---
  const getLevel = (xpVal) => {
    if (xpVal < 100) return { level: 1, title: 'AI Beginner 🌱', next: 100 }
    if (xpVal < 250) return { level: 2, title: 'AI Explorer 🚀', next: 250 }
    if (xpVal < 500) return { level: 3, title: 'AI Builder ⚡', next: 500 }
    if (xpVal < 1000) return { level: 4, title: 'AI Expert 🔥', next: 1000 }
    return { level: 5, title: 'AI Master 🏆', next: null }
  }

  const resetProgress = async () => {
    setProgress({})
    setXp(0)
    setStreak(0)
    setHearts(MAX_HEARTS)
    localStorage.removeItem('genai-progress')
    localStorage.removeItem('genai-xp')
    localStorage.removeItem('genai-streak')
    localStorage.removeItem('genai-hearts')
    const currentUser = userRef.current
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          progress: {}, xp: 0, streak: 0, hearts: MAX_HEARTS
        }, { merge: true })
      } catch (e) { console.error(e) }
    }
  }

  return (
    <ProgressContext.Provider value={{
      progress, markComplete, isComplete, getAgeProgress, resetProgress, synced,
      xp, addXp, XP_PER_QUIZ_CORRECT, XP_PER_QUIZ_COMPLETE,
      markLessonRead, isLessonRead, XP_PER_LESSON_READ,
      streak,
      hearts, loseHeart, restoreHearts, MAX_HEARTS,
      getLevel,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}