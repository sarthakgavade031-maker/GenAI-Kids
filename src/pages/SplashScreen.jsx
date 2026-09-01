import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useLang } from '../LangContext'

const splashText = {
  mr: { sub: 'AI शिका, खेळत खेळत! 🚀', tagline: 'भारतासाठी बनवलं 🇮🇳' },
  hi: { sub: 'AI सीखो, खेलते खेलते! 🚀', tagline: 'भारत के लिए बनाया 🇮🇳' },
  en: { sub: 'Learn AI, The Fun Way! 🚀', tagline: 'Made for Bharat 🇮🇳' },
}

export default function SplashScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { lang } = useLang()
  const t = splashText[lang] || splashText.mr

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        // Already logged in → go home directly
        navigate('/home')
      } else {
        // Not logged in (fresh open OR after logout) → always show onboarding
        navigate('/onboarding')
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <div className="splash-logo">🧠</div>
          <div className="splash-rings">
            <div className="ring ring1"></div>
            <div className="ring ring2"></div>
            <div className="ring ring3"></div>
          </div>
        </div>
        <h1 className="splash-title">GenAI Kids</h1>
        <p className="splash-sub">{t.sub}</p>
        <div className="splash-loader">
          <div className="loader-bar"></div>
        </div>
        <p className="splash-tagline">{t.tagline}</p>
      </div>
    </div>
  )
}