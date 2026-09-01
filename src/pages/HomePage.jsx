import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'
import { useAuth } from '../AuthContext'
import { useLiveUserCount } from '../userStats'

const content = {
  hi: {
    tagline: 'AI सीखो, खेलते खेलते! 🚀',
    subtitle: 'भारत के बच्चों के लिए — बिल्कुल मुफ्त AI शिक्षा',
    btn: 'शुरू करो →',
    age1: '6-9 साल', age2: '10-13 साल', age3: '14-16 साल',
    ageDesc1: 'AI Stories, Block Coding, Fun Games',
    ageDesc2: 'Python Basics, AI Concepts, Mini Projects',
    ageDesc3: 'Real ML Projects, Robotics, AI Tools',
    topic1: '🤖 AI की दुनिया', topic2: '💻 Coding सीखो', topic3: '🦾 Robotics',
    stats: ['बच्चे सीख रहे हैं', 'Lessons उपलब्ध', 'भारतीय भाषाएं'],
    ageTitle: 'अपनी Age Group चुनो',
    topicTitle: 'क्या सीखोगे?',
    startBtn: 'शुरू करो →',
    badgesTitle: 'अपने Badges देखो',
    badgesSub: 'Lessons complete करो और badges unlock करो!',
    dashTitle: 'अपना Dashboard देखो',
    dashSub: 'Progress, badges और activity एक जगह!',
    aboutTitle: 'GenAI Kids के बारे में',
    aboutSub: 'हमारा mission, impact और vision जानो!',
    footer1: '🧠 GenAI Kids',
    footer2: 'भारत के लिए ❤️ से बनाया',
    login: 'Login', logout: 'Logout',
    streakText: 'दिन की streak!',
    streakZero: 'आज सीखो और streak शुरू करो! 🔥',
    xpText: 'XP',
    heartsText: 'Hearts',
    welcomeBack: 'वापस आए',
  },
  mr: {
    tagline: 'AI शिका, खेळत खेळत! 🚀',
    subtitle: 'भारतातील मुलांसाठी — पूर्णपणे मोफत AI शिक्षण',
    btn: 'सुरू करा →',
    age1: '6-9 वर्षे', age2: '10-13 वर्षे', age3: '14-16 वर्षे',
    ageDesc1: 'AI Stories, Block Coding, Fun Games',
    ageDesc2: 'Python Basics, AI Concepts, Mini Projects',
    ageDesc3: 'Real ML Projects, Robotics, AI Tools',
    topic1: '🤖 AI ची दुनिया', topic2: '💻 Coding शिका', topic3: '🦾 Robotics',
    stats: ['मुलं शिकत आहेत', 'Lessons उपलब्ध', 'भारतीय भाषा'],
    ageTitle: 'तुमची Age Group निवडा',
    topicTitle: 'काय शिकाल?',
    startBtn: 'सुरू करा →',
    badgesTitle: 'तुमचे Badges बघा',
    badgesSub: 'Lessons complete करा आणि badges unlock करा!',
    dashTitle: 'तुमचा Dashboard बघा',
    dashSub: 'Progress, badges आणि activity एका ठिकाणी!',
    aboutTitle: 'GenAI Kids बद्दल',
    aboutSub: 'आपलं mission, impact आणि vision जाणा!',
    footer1: '🧠 GenAI Kids',
    footer2: 'भारतासाठी ❤️ ने बनवलं',
    login: 'Login', logout: 'Logout',
    streakText: 'दिवसांची streak!',
    streakZero: 'आज शिका आणि streak सुरू करा! 🔥',
    xpText: 'XP',
    heartsText: 'Hearts',
    welcomeBack: 'परत आलात',
  },
  en: {
    tagline: 'Learn AI, The Fun Way! 🚀',
    subtitle: 'Free AI Education for every child in India',
    btn: 'Start Learning →',
    age1: '6-9 Years', age2: '10-13 Years', age3: '14-16 Years',
    ageDesc1: 'AI Stories, Block Coding, Fun Games',
    ageDesc2: 'Python Basics, AI Concepts, Mini Projects',
    ageDesc3: 'Real ML Projects, Robotics, AI Tools',
    topic1: '🤖 World of AI', topic2: '💻 Learn Coding', topic3: '🦾 Robotics',
    stats: ['Kids Learning', 'Lessons Available', 'Indian Languages'],
    ageTitle: 'Choose Your Age Group',
    topicTitle: 'What Will You Learn?',
    startBtn: 'Start →',
    badgesTitle: 'View Your Badges',
    badgesSub: 'Complete lessons and unlock badges!',
    dashTitle: 'View Your Dashboard',
    dashSub: 'See your progress, badges and activity in one place!',
    aboutTitle: 'About GenAI Kids',
    aboutSub: 'Learn about our mission, impact and vision!',
    footer1: '🧠 GenAI Kids',
    footer2: 'Made with ❤️ for Bharat',
    login: 'Login', logout: 'Logout',
    streakText: 'day streak!',
    streakZero: 'Learn today and start your streak! 🔥',
    xpText: 'XP',
    heartsText: 'Hearts',
    welcomeBack: 'Welcome back',
  }
}

export default function HomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useLang()
  const { progress, xp = 0, streak = 1, hearts = 3, MAX_HEARTS = 5, getLevel } = useProgress()
  const { user, logout } = useAuth()
  const liveUserCount = useLiveUserCount()
  /** @type {'hi' | 'mr' | 'en'} */
  const langKey = lang
  const t = content[langKey]

  const earnedCount = Object.keys(progress).filter(k => progress[k]?.completed).length
  const { title: levelTitle } = getLevel(xp)
  const username = user?.name?.split(' ')[0] || 'Student'

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          🧠 GenAI Kids
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="dash-nav-btn" onClick={() => navigate('/about')}>ℹ️ About</button>
          {earnedCount > 0 && <button className="dash-nav-btn" onClick={() => navigate('/dashboard')}>📊</button>}
          {user ? (
            <button className="dash-nav-btn" onClick={logout} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
              {t.logout}
            </button>
          ) : (
            <button className="dash-nav-btn" onClick={() => navigate('/login')}>{t.login}</button>
          )}
          <div className="lang-buttons">
            <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={lang === 'mr' ? 'active' : ''}>मराठी</button>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>English</button>
          </div>
        </div>
      </nav>

      {/* Fixed Streak + XP + Hearts Banner */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Welcome + Streak */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            👋 {t.welcomeBack}, <span style={{ color: '#a78bfa', fontWeight: 700 }}>{username}</span>!
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '9999px', padding: '6px 16px' }}>
            <span style={{ fontSize: '1.3rem' }}>🔥</span>
            <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '1rem' }}>{streak}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t.streakText}</span>
          </div>
        </div>

        {/* XP + Level + Hearts */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '9999px', padding: '6px 16px' }}>
            <span>⭐</span>
            <span style={{ color: '#a78bfa', fontWeight: 700 }}>{xp}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t.xpText}</span>
          </div>

          {/* Level */}
          <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '9999px', padding: '6px 16px', color: '#38bdf8', fontWeight: 700 }}>
            {levelTitle}
          </div>

          {/* Hearts - Fixed & Clickable */}
          <div
            onClick={() => navigate('/hearts')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '9999px', padding: '6px 14px', cursor: 'pointer' }}
          >
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <span
                key={i}
                style={{
                  fontSize: '1.25rem',
                  transition: 'all 0.3s',
                  opacity: i < hearts ? 1 : 0.25
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Rest of your code remains the same (Hero, Age Cards, etc.) */}
      <section className="hero">
        <div className="hero-badge">🇮🇳 Made for Bharat</div>
        <h1 className="hero-title">{t.tagline}</h1>
        <p className="hero-sub">{t.subtitle}</p>
        <button className="cta-btn" onClick={() => navigate('/age')}>{t.btn}</button>
        <div className="stats">
          <div className="stat">
            <span className="stat-num">
              {liveUserCount === null ? '…' : Number(liveUserCount).toLocaleString('en-IN')}
            </span>
            <span className="stat-label">{t.stats[0]}</span>
          </div>
          <div className="stat">
            <span className="stat-num">100+</span>
            <span className="stat-label">{t.stats[1]}</span>
          </div>
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">{t.stats[2]}</span>
          </div>
        </div>
      </section>

      {/* Age Cards */}
      <section className="section">
        <h2 className="section-title">{t.ageTitle}</h2>
        <div className="cards">
          <div className="card card-green" onClick={() => navigate('/lessons/6-9')}>
            <div className="card-emoji">🌱</div>
            <h3>{t.age1}</h3>
            <p>{t.ageDesc1}</p>
            <button className="card-btn">{t.startBtn}</button>
          </div>
          <div className="card card-blue" onClick={() => navigate('/lessons/10-13')}>
            <div className="card-emoji">⚡</div>
            <h3>{t.age2}</h3>
            <p>{t.ageDesc2}</p>
            <button className="card-btn">{t.startBtn}</button>
          </div>
          <div className="card card-purple" onClick={() => navigate('/lessons/14-16')}>
            <div className="card-emoji">🚀</div>
            <h3>{t.age3}</h3>
            <p>{t.ageDesc3}</p>
            <button className="card-btn">{t.startBtn}</button>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section">
        <h2 className="section-title">{t.topicTitle}</h2>
        <div className="topics">
          <div className="topic">{t.topic1}</div>
          <div className="topic">{t.topic2}</div>
          <div className="topic">{t.topic3}</div>
        </div>
      </section>

      {/* Promo: Badges */}
      <section className="section">
        <div className="badges-promo" onClick={() => navigate('/badges')}>
          <div style={{ fontSize: '2.5rem' }}>🏅</div>
          <div>
            <h3>{t.badgesTitle}</h3>
            <p>{t.badgesSub}</p>
          </div>
        </div>
      </section>

      {/* Promo: Dashboard */}
      <section className="section">
        <div className="badges-promo" onClick={() => navigate('/dashboard')}>
          <div style={{ fontSize: '2.5rem' }}>📊</div>
          <div>
            <h3>{t.dashTitle}</h3>
            <p>{t.dashSub}</p>
          </div>
        </div>
      </section>

      {/* Promo: About */}
      <section className="section">
        <div className="badges-promo" onClick={() => navigate('/about')}>
          <div style={{ fontSize: '2.5rem' }}>ℹ️</div>
          <div>
            <h3>{t.aboutTitle}</h3>
            <p>{t.aboutSub}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>{t.footer1}</p>
        <p>{t.footer2}</p>
      </footer>

    </div>
  )
}
