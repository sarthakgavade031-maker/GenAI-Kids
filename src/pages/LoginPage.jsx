import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useAuth } from '../AuthContext'

const ui = {
  mr: {
    title: 'GenAI Kids मध्ये Welcome! 🧠',
    sub: 'तुमच्या शिकण्याचा प्रवास सुरू करा',
    googleBtn: 'Google ने Login करा',
    guestBtn: 'Guest म्हणून सुरू करा',
    guestNote: 'Guest म्हणून progress save होणार नाही',
    features: ['✅ Progress सेव्ह होतो', '🏅 Badges unlock होतात', '📊 Dashboard मिळतो', '🤖 AI Tutor वापरता येतो'],
  },
  hi: {
    title: 'GenAI Kids में Welcome! 🧠',
    sub: 'अपनी सीखने की यात्रा शुरू करो',
    googleBtn: 'Google से Login करो',
    guestBtn: 'Guest के रूप में शुरू करो',
    guestNote: 'Guest के रूप में progress save नहीं होगी',
    features: ['✅ Progress save होती है', '🏅 Badges unlock होते हैं', '📊 Dashboard मिलता है', '🤖 AI Tutor use कर सकते हो'],
  },
  en: {
    title: 'Welcome to GenAI Kids! 🧠',
    sub: 'Start your learning journey',
    googleBtn: 'Login with Google',
    guestBtn: 'Continue as Guest',
    guestNote: 'Progress will not be saved as guest',
    features: ['✅ Progress gets saved', '🏅 Badges get unlocked', '📊 Dashboard access', '🤖 AI Tutor available'],
  },
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { loginWithGoogle, loading } = useAuth()
  const t = ui[lang]

  const handleGoogle = async () => {
    const success = await loginWithGoogle()
    if (success) navigate('/home')
  }

  const handleGuest = () => {
    navigate('/home')
  }

  return (
    <div className="login-page">
      <div className="login-bg-circles">
        <div className="bg-circle c1"></div>
        <div className="bg-circle c2"></div>
        <div className="bg-circle c3"></div>
      </div>

      <div className="login-card">
        <div style={{fontSize:'3rem', marginBottom:'8px', textAlign:'center'}}>🧠</div>
        <h1 className="login-title">{t.title}</h1>
        <p className="login-sub">{t.sub}</p>

        <div className="login-features">
          {t.features.map((f, i) => (
            <div key={i} className="login-feature-item">{f}</div>
          ))}
        </div>

        <button
          className="google-login-btn"
          onClick={handleGoogle}
          disabled={loading}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t.googleBtn}
            </>
          )}
        </button>

        <div className="login-divider"><span>or</span></div>

        <button className="guest-login-btn" onClick={handleGuest}>
          {t.guestBtn}
        </button>
        <p style={{color:'#475569', fontSize:'0.78rem', textAlign:'center', marginTop:'10px'}}>
          {t.guestNote}
        </p>
      </div>
    </div>
  )
}