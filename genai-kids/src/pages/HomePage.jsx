import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'
import { useAuth } from '../AuthContext'

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
    footer1: '🧠 GenAI Kids — Aradhya Sarvasva Guru Ecosystem',
    footer2: 'भारत के लिए ❤️ से बनाया',
    login: 'Login', logout: 'Logout',
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
    footer1: '🧠 GenAI Kids — Aradhya Sarvasva Guru Ecosystem',
    footer2: 'भारतासाठी ❤️ ने बनवलं',
    login: 'Login', logout: 'Logout',
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
    footer1: '🧠 GenAI Kids — Aradhya Sarvasva Guru Ecosystem',
    footer2: 'Made with ❤️ for Bharat',
    login: 'Login', logout: 'Logout',
  }
}

export default function HomePage() {
  const navigate = useNavigate()
  const { lang, setLang } = useLang()
  const { progress } = useProgress()
  const { user, logout } = useAuth()
  const t = content[lang]

  const earnedCount = Object.keys(progress).filter(k => progress[k]?.completed).length

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>
          🧠 GenAI Kids
        </div>
        <div style={{display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>
          <button className="dash-nav-btn" onClick={() => navigate('/about')}>ℹ️ About</button>
          {earnedCount > 0 && (
            <button className="dash-nav-btn" onClick={() => navigate('/dashboard')}>📊</button>
          )}
          {user ? (
            <button
              className="dash-nav-btn"
              onClick={logout}
              style={{color:'#ef4444', borderColor:'#ef4444'}}
            >
              {t.logout}
            </button>
          ) : (
            <button className="dash-nav-btn" onClick={() => navigate('/login')}>
              {t.login}
            </button>
          )}
          <div className="lang-buttons">
            <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>हिंदी</button>
            <button onClick={() => setLang('mr')} className={lang === 'mr' ? 'active' : ''}>मराठी</button>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>English</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">🇮🇳 Made for Bharat</div>
        <h1 className="hero-title">{t.tagline}</h1>
        <p className="hero-sub">{t.subtitle}</p>
        {user && (
          <p style={{color:'#34d399', marginBottom:'8px', fontSize:'0.9rem'}}>
            👋 Welcome, {user.name}!
          </p>
        )}
        <button className="cta-btn" onClick={() => navigate('/age')}>{t.btn}</button>
        <div className="stats">
          <div className="stat">
            <span className="stat-num">50Cr+</span>
            <span className="stat-label">{t.stats[0]}</span>
          </div>
          <div className="stat">
            <span className="stat-num">100+</span>
            <span className="stat-label">{t.stats[1]}</span>
          </div>
          <div className="stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">{t.stats[2]}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">🎯 {t.ageTitle}</h2>
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

      <section className="section" style={{paddingTop:'0'}}>
        <h2 className="section-title">📚 {t.topicTitle}</h2>
        <div className="topics">
          <div className="topic">{t.topic1}</div>
          <div className="topic">{t.topic2}</div>
          <div className="topic">{t.topic3}</div>
        </div>
      </section>

      <section className="section" style={{paddingTop:'0'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <div className="badges-promo" onClick={() => navigate('/about')}>
            <div style={{fontSize:'2rem'}}>ℹ️</div>
            <div>
              <h3 style={{marginBottom:'4px'}}>{t.aboutTitle}</h3>
              <p style={{color:'#94a3b8', fontSize:'0.9rem'}}>{t.aboutSub}</p>
            </div>
            <div style={{marginLeft:'auto', fontSize:'1.5rem', color:'#a78bfa'}}>→</div>
          </div>

          <div className="badges-promo" onClick={() => navigate('/dashboard')}>
            <div style={{fontSize:'2rem'}}>📊</div>
            <div>
              <h3 style={{marginBottom:'4px'}}>{t.dashTitle}</h3>
              <p style={{color:'#94a3b8', fontSize:'0.9rem'}}>{t.dashSub}</p>
            </div>
            {earnedCount > 0 && (
              <div style={{
                background:'linear-gradient(135deg,#a78bfa,#38bdf8)',
                borderRadius:'20px',
                padding:'4px 14px',
                fontSize:'0.85rem',
                fontWeight:'700',
                whiteSpace:'nowrap'
              }}>
                {earnedCount} ✅
              </div>
            )}
            <div style={{marginLeft:'auto', fontSize:'1.5rem', color:'#a78bfa'}}>→</div>
          </div>

          <div className="badges-promo" onClick={() => navigate('/badges')}>
            <div style={{fontSize:'2rem'}}>🏅</div>
            <div>
              <h3 style={{marginBottom:'4px'}}>{t.badgesTitle}</h3>
              <p style={{color:'#94a3b8', fontSize:'0.9rem'}}>{t.badgesSub}</p>
            </div>
            <div style={{marginLeft:'auto', fontSize:'1.5rem', color:'#a78bfa'}}>→</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>{t.footer1}</p>
        <p style={{marginTop:'8px'}}>
          <span
            style={{cursor:'pointer', color:'#a78bfa'}}
            onClick={() => navigate('/about')}
          >About</span>
          {' · '}
          <span
            style={{cursor:'pointer', color:'#a78bfa'}}
            onClick={() => navigate('/login')}
          >Login</span>
          {' · '}
          <span style={{color:'#475569'}}>WSA Young Innovators 2026</span>
        </p>
        <p style={{marginTop:'8px'}}>{t.footer2}</p>
      </footer>
    </div>
  )
}