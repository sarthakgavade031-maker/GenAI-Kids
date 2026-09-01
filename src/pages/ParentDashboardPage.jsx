import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'
import { useAuth } from '../AuthContext'

const allTopics = {
  '6-9': ['ai-intro', 'block-coding', 'robotics-intro', 'ai-games', 'smart-devices', 'ai-art', 'what-is-data', 'future-jobs', 'ai-safety', 'ai-story'],
  '10-13': ['python-basics', 'ml-intro', 'mini-project', 'data-science', 'computer-vision', 'nlp-basics', 'ai-ethics', 'build-chatbot', 'web-scraping', 'ai-music'],
  '14-16': ['neural-nets', 'ml-project', 'ai-tools', 'deep-learning', 'computer-vision-adv', 'nlp-transformers', 'reinforcement-learning', 'generative-ai', 'ai-security', 'ai-startup'],
}

const ui = {
  mr: {
    title: '👨‍👩‍👧 Parent Dashboard', back: '← मागे',
    childLabel: 'मुलाचं नाव', overview: '📊 Overview',
    xpLabel: 'एकूण XP', streakLabel: 'Day Streak', lessonsLabel: 'Lessons पूर्ण',
    storiesLabel: '📚 AI Stories बनवल्या', quizzesLabel: '🎓 AI Quizzes दिल्या',
    avgScoreLabel: 'सरासरी Quiz Score', ageProgress: '📈 Age Group Progress',
    recentStories: '📖 अलीकडच्या Stories', recentQuizzes: '🧠 अलीकडचे AI Quizzes',
    noStories: 'अजून कोणतीही story नाही', noQuizzes: 'अजून कोणताही AI quiz नाही',
    insightsTitle: '💡 Insights',
    tip1: (n) => `मुलाने आत्तापर्यंत ${n} lessons पूर्ण केले आहेत — मस्त progress!`,
    tip2: 'नियमित सराव करण्यासाठी रोज थोडा वेळ द्या.',
    goStudent: 'विद्यार्थ्याचा Dashboard बघा →',
  },
  hi: {
    title: '👨‍👩‍👧 Parent Dashboard', back: '← वापस',
    childLabel: 'बच्चे का नाम', overview: '📊 Overview',
    xpLabel: 'कुल XP', streakLabel: 'Day Streak', lessonsLabel: 'Lessons पूरे',
    storiesLabel: '📚 AI Stories बनाई', quizzesLabel: '🎓 AI Quizzes दिए',
    avgScoreLabel: 'औसत Quiz Score', ageProgress: '📈 Age Group Progress',
    recentStories: '📖 हाल की Stories', recentQuizzes: '🧠 हाल के AI Quizzes',
    noStories: 'अभी कोई story नहीं', noQuizzes: 'अभी कोई AI quiz नहीं',
    insightsTitle: '💡 Insights',
    tip1: (n) => `बच्चे ने अब तक ${n} lessons पूरे किए हैं — बढ़िया progress!`,
    tip2: 'रोज थोड़ा समय practice के लिए दें।',
    goStudent: 'Student Dashboard देखें →',
  },
  en: {
    title: '👨‍👩‍👧 Parent Dashboard', back: '← Back',
    childLabel: "Child's name", overview: '📊 Overview',
    xpLabel: 'Total XP', streakLabel: 'Day Streak', lessonsLabel: 'Lessons Done',
    storiesLabel: '📚 AI Stories Created', quizzesLabel: '🎓 AI Quizzes Taken',
    avgScoreLabel: 'Avg Quiz Score', ageProgress: '📈 Age Group Progress',
    recentStories: '📖 Recent Stories', recentQuizzes: '🧠 Recent AI Quizzes',
    noStories: 'No stories yet', noQuizzes: 'No AI quizzes yet',
    insightsTitle: '💡 Insights',
    tip1: (n) => `Your child has completed ${n} lessons so far — great progress!`,
    tip2: 'Encourage a little practice every day for best results.',
    goStudent: "View Student's Dashboard →",
  },
}

function loadLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

export default function ParentDashboardPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { progress, xp = 0, streak = 0, getAgeProgress } = useProgress()
  const { user } = useAuth()
  const t = ui[lang]

  const childName = user?.name || localStorage.getItem('genai-username') || 'Student'
  const totalCompleted = Object.keys(progress || {}).filter((k) => progress[k]?.completed).length

  const stories = loadLocal('genai-stories')
  const quizHistory = loadLocal('genai-ai-quiz-history')
  const avgScore = quizHistory.length
    ? Math.round((quizHistory.reduce((sum, q) => sum + q.score / q.total, 0) / quizHistory.length) * 100)
    : null

  const statCard = (label, value, color) => (
    <div style={{ background: `${color}14`, border: `1px solid ${color}40`, borderRadius: '18px', padding: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '1.8rem', fontWeight: 900, color }}>{value}</div>
      <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>{label}</div>
    </div>
  )

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="dashboard-container">
        <h1 className="section-title">{t.title}</h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '28px' }}>
          {t.childLabel}: <span style={{ color: '#a78bfa', fontWeight: 700 }}>{childName}</span>
        </p>

        {/* Overview stats */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.overview}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px', marginBottom: '10px' }}>
            {statCard(t.xpLabel, xp, '#a78bfa')}
            {statCard(t.streakLabel, streak, '#fbbf24')}
            {statCard(t.lessonsLabel, `${totalCompleted}/30`, '#34d399')}
            {statCard(t.storiesLabel, stories.length, '#38bdf8')}
            {statCard(t.quizzesLabel, quizHistory.length, '#f472b6')}
            {statCard(t.avgScoreLabel, avgScore !== null ? `${avgScore}%` : '—', '#ef4444')}
          </div>
        </div>

        {/* Age progress */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.ageProgress}</h2>
          <div className="age-progress-grid">
            {Object.entries(allTopics).map(([age, topics]) => {
              const { done, total, pct } = getAgeProgress ? getAgeProgress(age, topics) : { done: 0, total: topics.length, pct: 0 }
              const colors = { '6-9': '#34d399', '10-13': '#38bdf8', '14-16': '#a78bfa' }
              const emojis = { '6-9': '🌱', '10-13': '⚡', '14-16': '🚀' }
              return (
                <div key={age} className="age-progress-card" style={{ borderColor: colors[age] }}>
                  <div className="age-progress-header">
                    <span style={{ fontSize: '1.4rem' }}>{emojis[age]}</span>
                    <h3 style={{ color: colors[age] }}>{age}</h3>
                    <span style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.85rem' }}>{done}/{total}</span>
                  </div>
                  <div className="progress-track" style={{ marginTop: '10px' }}>
                    <div className="progress-fill" style={{ width: `${pct}%`, background: colors[age] }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent stories */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.recentStories}</h2>
          {stories.length === 0 ? (
            <div className="no-activity">{t.noStories}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {stories.slice(0, 5).map((s) => (
                <div key={s.id} className="activity-item">
                  <div className="activity-dot"></div>
                  <span style={{ flex: 1, color: '#e2e8f0' }}>{s.title} <span style={{ color: '#475569', fontSize: '0.8rem' }}>({s.theme})</span></span>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{new Date(s.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent AI quizzes */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.recentQuizzes}</h2>
          {quizHistory.length === 0 ? (
            <div className="no-activity">{t.noQuizzes}</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quizHistory.slice(0, 5).map((q) => (
                <div key={q.id} className="activity-item">
                  <div className="activity-dot"></div>
                  <span style={{ flex: 1, color: '#e2e8f0' }}>{q.subject}</span>
                  <span style={{ color: q.score === q.total ? '#34d399' : '#94a3b8', fontSize: '0.85rem', marginRight: '8px' }}>{q.score}/{q.total}</span>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{new Date(q.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Insights */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.insightsTitle}</h2>
          <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '16px', padding: '18px' }}>
            <p style={{ color: '#e2e8f0', marginBottom: '8px' }}>💬 {t.tip1(totalCompleted)}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>💬 {t.tip2}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>{t.goStudent}</button>
        </div>
      </div>
    </div>
  )
}