import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3H2cHI61pLgnJPdaIk7Y9XvKgRqqz3H0",
  authDomain: "genai-kids-4c93f.firebaseapp.com",
  projectId: "genai-kids-4c93f",
  storageBucket: "genai-kids-4c93f.firebasestorage.app",
  messagingSenderId: "935184010941",
  appId: "1:935184010941:web:3629721c06b5a2a610b1d4"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)