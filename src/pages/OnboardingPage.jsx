import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'

const ui = {
  mr: {
    welcome: 'GenAI Kids मध्ये स्वागत! 🎉',
    welcomeSub: 'AI शिका, खेळत खेळत! भारतातील मुलांसाठी बनवलेलं platform',
    start: 'सुरुवात करूया! 🚀',
    nameQ: 'तुमचं नाव काय आहे?',
    namePlaceholder: 'इथे नाव लिहा...',
    nameNext: 'पुढे जा →',
    ageQ: 'तुमचं वय किती आहे?',
    ageSub: 'आम्ही तुमच्यासाठी योग्य lessons निवडू',
    langQ: 'तुम्हाला कोणत्या भाषेत शिकायचंय?',
    goalQ: 'रोज किती वेळ शिकणार?',
    goalSub: 'तुमचं daily goal set करा',
    ready: 'तयार आहोत! 🎯',
    readySub: 'तुमचा प्रवास सुरू होणार आहे',
    accountBtn: 'Account बनवा (Progress Save होईल)',
    guestBtn: 'Guest म्हणून सुरू करा',
    hi: 'नमस्ते',
    goals: ['5 मिनिटे', '10 मिनिटे', '15 मिनिटे', '20+ मिनिटे'],
    goalEmojis: ['⚡', '🔥', '💪', '🏆'],
    goalDesc: ['छोटा, पण daily!', 'Perfect balance!', 'Great habit!', 'Champion! 🌟'],
    ages: ['6-9 वर्षे', '10-13 वर्षे', '14-16 वर्षे'],
    ageEmojis: ['🌱', '🚀', '⚡'],
    ageDesc: ['AI Explorer', 'AI Builder', 'AI Master'],
    langs: ['मराठी', 'हिंदी', 'English'],
    langEmojis: ['🟠', '🟢', '🔵'],
  },
  hi: {
    welcome: 'GenAI Kids में स्वागत! 🎉',
    welcomeSub: 'AI सीखो, खेलते खेलते! भारत के बच्चों के लिए',
    start: 'शुरू करते हैं! 🚀',
    nameQ: 'तुम्हारा नाम क्या है?',
    namePlaceholder: 'यहाँ नाम लिखो...',
    nameNext: 'आगे जाओ →',
    ageQ: 'तुम्हारी उम्र कितनी है?',
    ageSub: 'हम तुम्हारे लिए सही lessons चुनेंगे',
    langQ: 'कौनसी भाषा में सीखना चाहते हो?',
    goalQ: 'रोज़ कितना समय सीखोगे?',
    goalSub: 'अपना daily goal set करो',
    ready: 'तैयार हैं! 🎯',
    readySub: 'तुम्हारा सफर शुरू होने वाला है',
    accountBtn: 'Account बनाओ (Progress Save होगी)',
    guestBtn: 'Guest के रूप में शुरू करो',
    hi: 'नमस्ते',
    goals: ['5 मिनट', '10 मिनट', '15 मिनट', '20+ मिनट'],
    goalEmojis: ['⚡', '🔥', '💪', '🏆'],
    goalDesc: ['छोटा, पर daily!', 'Perfect balance!', 'Great habit!', 'Champion! 🌟'],
    ages: ['6-9 साल', '10-13 साल', '14-16 साल'],
    ageEmojis: ['🌱', '🚀', '⚡'],
    ageDesc: ['AI Explorer', 'AI Builder', 'AI Master'],
    langs: ['मराठी', 'हिंदी', 'English'],
    langEmojis: ['🟠', '🟢', '🔵'],
  },
  en: {
    welcome: 'Welcome to GenAI Kids! 🎉',
    welcomeSub: 'Learn AI through play! Built for children of Bharat',
    start: "Let's Begin! 🚀",
    nameQ: "What's your name?",
    namePlaceholder: 'Type your name here...',
    nameNext: 'Next →',
    ageQ: 'How old are you?',
    ageSub: "We'll pick the perfect lessons for you",
    langQ: 'Which language do you prefer?',
    goalQ: 'How much will you learn daily?',
    goalSub: 'Set your daily goal',
    ready: "We're Ready! 🎯",
    readySub: 'Your learning journey is about to begin',
    accountBtn: 'Create Account (Save Progress)',
    guestBtn: 'Continue as Guest',
    hi: 'Hello',
    goals: ['5 minutes', '10 minutes', '15 minutes', '20+ minutes'],
    goalEmojis: ['⚡', '🔥', '💪', '🏆'],
    goalDesc: ['Small but daily!', 'Perfect balance!', 'Great habit!', 'Champion! 🌟'],
    ages: ['Ages 6-9', 'Ages 10-13', 'Ages 14-16'],
    ageEmojis: ['🌱', '🚀', '⚡'],
    ageDesc: ['AI Explorer', 'AI Builder', 'AI Master'],
    langs: ['मराठी', 'हिंदी', 'English'],
    langEmojis: ['🟠', '🟢', '🔵'],
  },
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { lang, setLang } = useLang()
  const t = ui[lang]

  const [step, setStep] = useState(0) // 0=welcome, 1=name, 2=age, 3=lang, 4=goal, 5=ready
  const [name, setName] = useState('')
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const TOTAL_STEPS = 5

  const saveOnboarding = (destination) => {
    // onboarded flag not needed - auth state handles routing
    localStorage.setItem('genai-username', name)
    localStorage.setItem('genai-age', selectedAge)
    localStorage.setItem('genai-goal', selectedGoal)
    navigate(destination)
  }

  const progressPct = Math.round((step / TOTAL_STEPS) * 100)

  const ageValues = ['6-9', '10-13', '14-16']
  const langValues = ['mr', 'hi', 'en']

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg glow */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* Progress Bar — step 1+ */}
      {step > 0 && (
        <div style={{ width: '100%', maxWidth: '480px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Step {step} of {TOTAL_STEPS}</span>
            <span style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 700 }}>{progressPct}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #a78bfa, #38bdf8)', borderRadius: '10px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      )}

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        padding: '40px 32px',
        backdropFilter: 'blur(12px)',
        animation: 'fadeSlideIn 0.4s ease',
      }}>

        {/* STEP 0 — Welcome */}
        {step === 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px', animation: 'bounce 1s ease infinite alternate' }}>🧠</div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>
              {t.welcome}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '40px', lineHeight: 1.6 }}>{t.welcomeSub}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
              {['🇮🇳 Made for Bharat', '🆓 100% Free', '🤖 AI Powered'].map((tag, i) => (
                <span key={i} style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem' }}>{tag}</span>
              ))}
            </div>
            <button onClick={() => setStep(1)} style={btnStyle('#a78bfa', '#38bdf8')}>
              {t.start}
            </button>
          </div>
        )}

        {/* STEP 1 — Name */}
        {step === 1 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👋</div>
            <h2 style={headingStyle}>{t.nameQ}</h2>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim().length > 0 && setStep(2)}
              placeholder={t.namePlaceholder}
              style={inputStyle}
            />
            <button
              onClick={() => name.trim().length > 0 && setStep(2)}
              disabled={name.trim().length === 0}
              style={btnStyle('#a78bfa', '#38bdf8', name.trim().length === 0)}
            >
              {t.nameNext}
            </button>
          </div>
        )}

        {/* STEP 2 — Age */}
        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎂</div>
            <h2 style={headingStyle}>{t.ageQ}</h2>
            <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>{t.ageSub}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {t.ages.map((age, i) => (
                <div key={i}
                  onClick={() => { setSelectedAge(ageValues[i]); setStep(3) }}
                  style={cardSelectStyle(selectedAge === ageValues[i])}
                >
                  <span style={{ fontSize: '2rem' }}>{t.ageEmojis[i]}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{age}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{t.ageDesc[i]}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: '#a78bfa', fontSize: '1.2rem' }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Language */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌐</div>
            <h2 style={headingStyle}>{t.langQ}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0 28px' }}>
              {t.langs.map((l, i) => (
                <div key={i}
                  onClick={() => { setLang(langValues[i]); setStep(4) }}
                  style={cardSelectStyle(lang === langValues[i])}
                >
                  <span style={{ fontSize: '1.8rem' }}>{t.langEmojis[i]}</span>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem' }}>{l}</div>
                  <span style={{ marginLeft: 'auto', color: '#a78bfa', fontSize: '1.2rem' }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — Daily Goal */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
            <h2 style={headingStyle}>{t.goalQ}</h2>
            <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '0.9rem' }}>{t.goalSub}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
              {t.goals.map((goal, i) => (
                <div key={i}
                  onClick={() => { setSelectedGoal(goal); setStep(5) }}
                  style={{
                    ...cardSelectStyle(selectedGoal === goal),
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 12px',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{t.goalEmojis[i]}</span>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{goal}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{t.goalDesc[i]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 — Ready */}
        {step === 5 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px', animation: 'bounce 0.6s ease infinite alternate' }}>🎉</div>
            <h2 style={{ ...headingStyle, fontSize: '1.6rem' }}>
              {t.hi} {name}! {t.ready}
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '0.95rem' }}>{t.readySub}</p>

            {/* Summary */}
            <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '16px', padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
              {[
                ['👤', 'नाव / Name', name],
                ['🎂', 'वय / Age', selectedAge + ' वर्षे'],
                ['🌐', 'भाषा / Lang', lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'],
                ['🎯', 'Daily Goal', selectedGoal],
              ].map(([emoji, label, value], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{emoji} {label}</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem' }}>{value}</span>
                </div>
              ))}
            </div>

            <button onClick={() => saveOnboarding('/login')} style={{ ...btnStyle('#a78bfa', '#38bdf8'), marginBottom: '12px', fontSize: '0.95rem' }}>
              {t.accountBtn}
            </button>
            <button onClick={() => saveOnboarding('/home')} style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '30px', color: '#94a3b8', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseOver={e => e.target.style.borderColor = '#a78bfa'}
              onMouseOut={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
            >
              {t.guestBtn}
            </button>
          </div>
        )}

        {/* Back button — steps 1-4 */}
        {step > 0 && step < 5 && (
          <button onClick={() => setStep(step - 1)} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.9rem', display: 'block', margin: '20px auto 0' }}>
            ← मागे जा
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          from { transform: translateY(0); }
          to { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

// Style helpers
const btnStyle = (c1, c2, disabled = false) => ({
  width: '100%',
  padding: '16px',
  background: disabled ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${c1}, ${c2})`,
  border: 'none',
  borderRadius: '30px',
  color: disabled ? '#475569' : 'white',
  fontSize: '1.05rem',
  fontWeight: 700,
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'transform 0.2s',
})

const headingStyle = {
  fontSize: '1.5rem',
  fontWeight: 800,
  color: 'white',
  marginBottom: '8px',
}

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '16px',
  color: 'white',
  fontSize: '1.1rem',
  marginBottom: '20px',
  outline: 'none',
  boxSizing: 'border-box',
}

const cardSelectStyle = (selected) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px 20px',
  background: selected ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
  border: `1px solid ${selected ? '#a78bfa' : 'rgba(255,255,255,0.1)'}`,
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  textAlign: 'left',
})