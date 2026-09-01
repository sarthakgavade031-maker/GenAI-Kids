import { useEffect, useState } from 'react'
import { db } from './firebase'
import {
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    serverTimestamp,
    increment,
} from 'firebase/firestore'

/**
 * @param {{ uid: string, name?: string, email?: string }} profile
 */
export async function registerUserIfNew(profile) {
    if (!profile?.uid) return
    try {
        const userRef = doc(db, 'users', profile.uid)
        const existing = await getDoc(userRef)
        if (existing.exists()) return

        await setDoc(userRef, {
            name: profile.name || null,
            email: profile.email || null,
            joinedAt: serverTimestamp(),
        })

        const statsRef = doc(db, 'stats', 'global')
        await setDoc(statsRef, { userCount: increment(1) }, { merge: true })
    } catch (err) {
        console.error('registerUserIfNew failed:', err)
    }
}

// Fixes "Argument of type '0' is not assignable to SetStateAction<null>"
export function useLiveUserCount() {
    const [count, setCount] = useState(/** @type {number|null} */(null))

    useEffect(() => {
        const statsRef = doc(db, 'stats', 'global')
        const unsubscribe = onSnapshot(
            statsRef,
            (snap) => {
                setCount(snap.exists() ? (snap.data().userCount || 0) : 0)
            },
            (err) => {
                console.error('useLiveUserCount error:', err)
                setCount(0)
            }
        )
        return () => unsubscribe()
    }, [])

    return count
}
