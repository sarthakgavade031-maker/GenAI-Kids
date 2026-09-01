import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const allTopics = {
  '6-9': ['ai-intro','block-coding','robotics-intro','ai-games','smart-devices','ai-art','what-is-data','future-jobs','ai-safety','ai-story'],
  '10-13': ['python-basics','ml-intro','mini-project','data-science','computer-vision','nlp-basics','ai-ethics','build-chatbot','web-scraping','ai-music'],
  '14-16': ['neural-nets','ml-project','ai-tools','deep-learning','computer-vision-adv','nlp-transformers','reinforcement-learning','generative-ai','ai-security','ai-startup'],
}

const lessonNames = {
  mr: {
    'ai-intro':'AI म्हणजे काय?','block-coding':'Block Coding','robotics-intro':'Robotics',
    'python-basics':'Python','ml-intro':'Machine Learning','mini-project':'Mini Project',
    'neural-nets':'Neural Networks','ml-project':'ML Project','ai-tools':'AI Tools',
    'ai-games':'AI in Games','smart-devices':'Smart Devices','ai-art':'AI Art',
    'what-is-data':'Data म्हणजे काय?','future-jobs':'Future Jobs','ai-safety':'AI Safety',
    'ai-story':'AI Story','data-science':'Data Science','computer-vision':'Computer Vision',
    'nlp-basics':'NLP','ai-ethics':'AI Ethics','build-chatbot':'Chatbot',
    'web-scraping':'Web Scraping','ai-music':'AI Music','deep-learning':'Deep Learning',
    'computer-vision-adv':'CV Advanced','nlp-transformers':'NLP Transformers',
    'reinforcement-learning':'RL','generative-ai':'Generative AI',
    'ai-security':'AI Security','ai-startup':'AI Startup',
  },
  hi: {
    'ai-intro':'AI क्या है?','block-coding':'Block Coding','robotics-intro':'Robotics',
    'python-basics':'Python','ml-intro':'Machine Learning','mini-project':'Mini Project',
    'neural-nets':'Neural Networks','ml-project':'ML Project','ai-tools':'AI Tools',
    'ai-games':'AI in Games','smart-devices':'Smart Devices','ai-art':'AI Art',
    'what-is-data':'Data क्या है?','future-jobs':'Future Jobs','ai-safety':'AI Safety',
    'ai-story':'AI Story','data-science':'Data Science','computer-vision':'Computer Vision',
    'nlp-basics':'NLP','ai-ethics':'AI Ethics','build-chatbot':'Chatbot',
    'web-scraping':'Web Scraping','ai-music':'AI Music','deep-learning':'Deep Learning',
    'computer-vision-adv':'CV Advanced','nlp-transformers':'NLP Transformers',
    'reinforcement-learning':'RL','generative-ai':'Generative AI',
    'ai-security':'AI Security','ai-startup':'AI Startup',
  },
  en: {
    'ai-intro':'What is AI?','block-coding':'Block Coding','robotics-intro':'Robotics',
    'python-basics':'Python','ml-intro':'Machine Learning','mini-project':'Mini Project',
    'neural-nets':'Neural Networks','ml-project':'ML Project','ai-tools':'AI Tools',
    'ai-games':'AI in Games','smart-devices':'Smart Devices','ai-art':'AI Art',
    'what-is-data':'What is Data?','future-jobs':'Future Jobs','ai-safety':'AI Safety',
    'ai-story':'AI Story','data-science':'Data Science','computer-vision':'Computer Vision',
    'nlp-basics':'NLP','ai-ethics':'AI Ethics','build-chatbot':'Chatbot',
    'web-scraping':'Web Scraping','ai-music':'AI Music','deep-learning':'Deep Learning',
    'computer-vision-adv':'CV Advanced','nlp-transformers':'NLP Transformers',
    'reinforcement-learning':'RL','generative-ai':'Generative AI',
    'ai-security':'AI Security','ai-startup':'AI Startup',
  },
}

const ui = {
  mr: {
    title:'Dashboard 📊', back:'← मागे',
    xpLabel:'XP Points', streakLabel:'Day Streak', heartsLabel:'Hearts',
    levelLabel:'Level', nextLevel:'पुढचा level',
    totalLessons:'Lessons Complete', totalBadges:'Badges', overallProgress:'Overall Progress',
    recentActivity:'🕐 Recent Activity', noActivity:'अजून कोणतीही activity नाही — सुरू करा!',
    quickActions:'⚡ Quick Actions', startLearning:'शिकणे सुरू करा', viewBadges:'Badges बघा', viewCert:'Certificate बघा',
    ageProgress:'📈 Age Group Progress',
    age69:'6-9 वर्षे', age1013:'10-13 वर्षे', age1416:'14-16 वर्षे',
    goLearn:'शिका →', allDone:'✅ सगळं झालं!',
    streakMsg: ['आज शिका! 🌱','१ दिवस! ⚡','भारी! 🔥','Champion! 🏆'],
  },
  hi: {
    title:'Dashboard 📊', back:'← वापस',
    xpLabel:'XP Points', streakLabel:'Day Streak', heartsLabel:'Hearts',
    levelLabel:'Level', nextLevel:'अगला level',
    totalLessons:'Lessons Complete', totalBadges:'Badges', overallProgress:'Overall Progress',
    recentActivity:'🕐 हाल की Activity', noActivity:'कोई activity नहीं — शुरू करो!',
    quickActions:'⚡ Quick Actions', startLearning:'सीखना शुरू करो', viewBadges:'Badges देखो', viewCert:'Certificate देखो',
    ageProgress:'📈 Age Group Progress',
    age69:'6-9 साल', age1013:'10-13 साल', age1416:'14-16 साल',
    goLearn:'सीखो →', allDone:'✅ सब हो गया!',
    streakMsg:['आज सीखो! 🌱','1 दिन! ⚡','कमाल! 🔥','Champion! 🏆'],
  },
  en: {
    title:'Dashboard 📊', back:'← Back',
    xpLabel:'XP Points', streakLabel:'Day Streak', heartsLabel:'Hearts',
    levelLabel:'Level', nextLevel:'Next level',
    totalLessons:'Lessons Done', totalBadges:'Badges', overallProgress:'Overall Progress',
    recentActivity:'🕐 Recent Activity', noActivity:'No activity yet — start learning!',
    quickActions:'⚡ Quick Actions', startLearning:'Start Learning', viewBadges:'View Badges', viewCert:'View Certificate',
    ageProgress:'📈 Age Group Progress',
    age69:'Ages 6-9', age1013:'Ages 10-13', age1416:'Ages 14-16',
    goLearn:'Learn →', allDone:'✅ All Done!',
    streakMsg:['Learn today! 🌱','1 day! ⚡','Amazing! 🔥','Champion! 🏆'],
  },
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { progress, isComplete, getAgeProgress, xp, streak, hearts, MAX_HEARTS, getLevel } = useProgress()
  const t = ui[lang]
  const names = lessonNames[lang]

  const totalCompleted = Object.keys(progress).filter(k => progress[k]?.completed).length
  const totalLessons = 30
  const overallPct = Math.round((totalCompleted / totalLessons) * 100)
  const { level, title: levelTitle, next: nextXp } = getLevel(xp)
  const levelPct = nextXp ? Math.round((xp / nextXp) * 100) : 100

  const streakMsgIdx = streak === 0 ? 0 : streak === 1 ? 1 : streak < 7 ? 2 : 3

  const earnedBadges = (() => {
    let count = 0
    if (totalCompleted >= 1) count++
    if (allTopics['6-9'].every(t => isComplete('6-9', t))) count++
    if (allTopics['10-13'].every(t => isComplete('10-13', t))) count++
    if (allTopics['14-16'].every(t => isComplete('14-16', t))) count++
    if (totalCompleted >= 30) count++
    if (totalCompleted >= 10) count++
    return count
  })()

  const recentActivity = Object.entries(progress)
    .filter(([_, v]) => v?.completed && v?.completedAt)
    .sort((a, b) => new Date(b[1].completedAt) - new Date(a[1].completedAt))
    .slice(0, 5)

  const s = (val) => ({
    card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'24px' },
  })

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="dashboard-container">
        <h1 className="section-title">{t.title}</h1>

        {/* 🔥 Streak + XP + Hearts Row */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'24px'}}>

          {/* Streak */}
          <div style={{background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.25)', borderRadius:'20px', padding:'20px', textAlign:'center'}}>
            <div style={{fontSize:'2.5rem', marginBottom:'4px'}}>🔥</div>
            <div style={{fontSize:'2rem', fontWeight:900, color:'#fbbf24'}}>{streak}</div>
            <div style={{color:'#94a3b8', fontSize:'0.8rem', marginTop:'4px'}}>{t.streakLabel}</div>
            <div style={{color:'#fbbf24', fontSize:'0.75rem', marginTop:'6px'}}>{t.streakMsg[streakMsgIdx]}</div>
          </div>

          {/* XP + Level */}
          <div style={{background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.25)', borderRadius:'20px', padding:'20px', textAlign:'center'}}>
            <div style={{fontSize:'2rem', fontWeight:900, color:'#a78bfa'}}>{xp}</div>
            <div style={{color:'#94a3b8', fontSize:'0.8rem'}}>{t.xpLabel}</div>
            <div style={{color:'#a78bfa', fontSize:'0.75rem', fontWeight:700, margin:'6px 0 8px'}}>{levelTitle}</div>
            {nextXp && (
              <div style={{height:'5px', background:'rgba(255,255,255,0.08)', borderRadius:'10px', overflow:'hidden'}}>
                <div style={{height:'100%', width:`${levelPct}%`, background:'linear-gradient(90deg,#a78bfa,#38bdf8)', borderRadius:'10px'}}/>
              </div>
            )}
            <div style={{color:'#475569', fontSize:'0.7rem', marginTop:'4px'}}>{nextXp ? `${xp}/${nextXp} XP` : 'MAX!'}</div>
          </div>

          {/* Hearts */}
          <div style={{background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:'20px', padding:'20px', textAlign:'center'}}>
            <div style={{fontSize:'1.4rem', marginBottom:'4px', letterSpacing:'2px'}}>
              {Array.from({length: MAX_HEARTS}).map((_, i) => (
                <span key={i} style={{opacity: i < hearts ? 1 : 0.2}}>❤️</span>
              ))}
            </div>
            <div style={{fontSize:'2rem', fontWeight:900, color:'#ef4444'}}>{hearts}/{MAX_HEARTS}</div>
            <div style={{color:'#94a3b8', fontSize:'0.8rem', marginTop:'4px'}}>{t.heartsLabel}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="dash-stats" style={{marginBottom:'24px'}}>
          <div className="dash-stat-card">
            <div className="dash-stat-num" style={{color:'#34d399'}}>{totalCompleted}</div>
            <div className="dash-stat-label">{t.totalLessons}</div>
            <div className="dash-stat-sub">/ {totalLessons}</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-num" style={{color:'#fbbf24'}}>{earnedBadges}</div>
            <div className="dash-stat-label">{t.totalBadges}</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-num" style={{color:'#a78bfa'}}>{overallPct}%</div>
            <div className="dash-stat-label">{t.overallProgress}</div>
            <div className="dash-stat-sub" style={{marginTop:'8px'}}>
              <div className="progress-track" style={{height:'6px'}}>
                <div className="progress-fill" style={{width:`${overallPct}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Age Group Progress */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.ageProgress}</h2>
          <div className="age-progress-grid">
            {Object.entries(allTopics).map(([age, topics]) => {
              const { done, total, pct } = getAgeProgress(age, topics)
              const colors = {'6-9':'#34d399','10-13':'#38bdf8','14-16':'#a78bfa'}
              const emojis = {'6-9':'🌱','10-13':'⚡','14-16':'🚀'}
              const ageLabel = {'6-9':t.age69,'10-13':t.age1013,'14-16':t.age1416}
              return (
                <div key={age} className="age-progress-card" onClick={() => navigate(`/lessons/${age}`)} style={{borderColor: colors[age], cursor:'pointer'}}>
                  <div className="age-progress-header">
                    <span style={{fontSize:'1.5rem'}}>{emojis[age]}</span>
                    <h3 style={{color: colors[age]}}>{ageLabel[age]}</h3>
                    <span style={{marginLeft:'auto', color: pct===100?'#34d399':'#94a3b8', fontSize:'0.85rem', fontWeight:'700'}}>
                      {pct===100 ? t.allDone : `${done}/${total}`}
                    </span>
                  </div>
                  <div className="progress-track" style={{marginTop:'12px'}}>
                    <div className="progress-fill" style={{width:`${pct}%`, background: colors[age]}}></div>
                  </div>
                  <div style={{marginTop:'12px', display:'flex', flexWrap:'wrap', gap:'6px'}}>
                    {topics.slice(0,6).map(topic => (
                      <span key={topic} style={{
                        padding:'3px 10px', borderRadius:'20px', fontSize:'0.72rem',
                        background: isComplete(age,topic) ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                        color: isComplete(age,topic) ? '#34d399' : '#475569',
                        border: `1px solid ${isComplete(age,topic) ? '#34d399' : 'rgba(255,255,255,0.08)'}`,
                      }}>
                        {isComplete(age,topic)?'✅':'○'} {names[topic]}
                      </span>
                    ))}
                    {topics.length > 6 && <span style={{color:'#475569',fontSize:'0.72rem',padding:'3px 8px'}}>+{topics.length-6} more</span>}
                  </div>
                  <button className="card-btn" style={{marginTop:'14px', background:`linear-gradient(135deg, ${colors[age]}, #0a0a1a)`, fontSize:'0.85rem', padding:'8px 20px'}}>
                    {pct===100 ? '🔄 Review' : t.goLearn}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.recentActivity}</h2>
          {recentActivity.length === 0 ? (
            <div className="no-activity">{t.noActivity}</div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
              {recentActivity.map(([key, val], i) => {
                const parts = key.split('-')
                const topic = parts.slice(parts[0]==='6'?2:2).join('-') || parts[2]
                const date = new Date(val.completedAt)
                return (
                  <div key={i} className="activity-item">
                    <div className="activity-dot"></div>
                    <div style={{flex:1}}>
                      <span style={{fontWeight:'600', color:'#e2e8f0'}}>{names[topic] || topic}</span>
                      <span style={{color:'#475569', fontSize:'0.85rem', marginLeft:'8px'}}>✅ +{20} XP</span>
                    </div>
                    <span style={{color:'#475569', fontSize:'0.8rem'}}>{date.getDate()}/{date.getMonth()+1}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dash-section">
          <h2 className="dash-section-title">{t.quickActions}</h2>
          <div className="quick-actions-grid">
            <div className="quick-action-card" onClick={() => navigate('/age')}>
              <span style={{fontSize:'2rem'}}>📚</span>
              <h3>{t.startLearning}</h3>
            </div>
            <div className="quick-action-card" onClick={() => navigate('/badges')}>
              <span style={{fontSize:'2rem'}}>🏅</span>
              <h3>{t.viewBadges}</h3>
            </div>
            <div className="quick-action-card" onClick={() => navigate('/certificate')}>
              <span style={{fontSize:'2rem'}}>🏆</span>
              <h3>{t.viewCert}</h3>
            </div>
            <div className="quick-action-card" onClick={() => navigate('/lessons/6-9')}>
              <span style={{fontSize:'2rem'}}>🌱</span>
              <h3>{t.age69}</h3>
            </div>
            <div className="quick-action-card" onClick={() => navigate('/lessons/10-13')}>
              <span style={{fontSize:'2rem'}}>⚡</span>
              <h3>{t.age1013}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}