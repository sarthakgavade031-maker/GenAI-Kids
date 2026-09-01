import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function SplashScreen() {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate('/home')
      } else {
        navigate('/login')
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
        <p className="splash-sub">AI शिका, खेळत खेळत! 🚀</p>
        <div className="splash-loader">
          <div className="loader-bar"></div>
        </div>
        <p className="splash-tagline">Made for Bharat 🇮🇳</p>
      </div>
    </div>
  )
}