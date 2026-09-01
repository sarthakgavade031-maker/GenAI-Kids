import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const allTopics = {
  '6-9': ['ai-intro', 'block-coding', 'robotics-intro'],
  '10-13': ['python-basics', 'ml-intro', 'mini-project'],
  '14-16': ['neural-nets', 'ml-project', 'ai-tools'],
}

const lessonNames = {
  hi: {
    'ai-intro': 'AI क्या है?', 'block-coding': 'Block Coding', 'robotics-intro': 'Robotics',
    'python-basics': 'Python', 'ml-intro': 'Machine Learning', 'mini-project': 'Mini Project',
    'neural-nets': 'Neural Networks', 'ml-project': 'ML Project', 'ai-tools': 'AI Tools',
  },
  mr: {
    'ai-intro': 'AI म्हणजे काय?', 'block-coding': 'Block Coding', 'robotics-intro': 'Robotics',
    'python-basics': 'Python', 'ml-intro': 'Machine Learning', 'mini-project': 'Mini Project',
    'neural-nets': 'Neural Networks', 'ml-project': 'ML Project', 'ai-tools': 'AI Tools',
  },
  en: {
    'ai-intro': 'What is AI?', 'block-coding': 'Block Coding', 'robotics-intro': 'Robotics',
    'python-basics': 'Python', 'ml-intro': 'Machine Learning', 'mini-project': 'Mini Project',
    'neural-nets': 'Neural Networks', 'ml-project': 'ML Project', 'ai-tools': 'AI Tools',
  },
}

const ui = {
  hi: {
    title: 'Dashboard 📊', back: '← वापस',
    totalLessons: 'Lessons Complete', totalBadges: 'Badges Earned', overallProgress: 'Overall Progress',
    recentActivity: '🕐 हाल की Activity', noActivity: 'कोई activity नहीं — शुरू करो!',
    quickActions: '⚡ Quick Actions', startLearning: 'सीखना शुरू करो', viewBadges: 'Badges देखो',
    ageProgress: '📈 Age Group Progress',
    age69: '6-9 साल', age1013: '10-13 साल', age1416: '14-16 साल',
    complete: 'complete', goLearn: 'सीखो →', allDone: '✅ सब हो गया!',
    motivate: ['शुरुआत करो! 🚀', 'बढ़िया जा रहे हो! 💪', 'कमाल कर रहे हो! 🔥', 'AI Master बनने वाले हो! 🏆']
  },
  mr: {
    title: 'Dashboard 📊', back: '← मागे जा',
    totalLessons: 'Lessons Complete', totalBadges: 'Badges Earned', overallProgress: 'Overall Progress',
    recentActivity: '🕐 Recent Activity', noActivity: 'कोणतीही activity नाही — सुरू करा!',
    quickActions: '⚡ Quick Actions', startLearning: 'शिकणे सुरू करा', viewBadges: 'Badges बघा',
    ageProgress: '📈 Age Group Progress',
    age69: '6-9 वर्षे', age1013: '10-13 वर्षे', age1416: '14-16 वर्षे',
    complete: 'complete', goLearn: 'शिका →', allDone: '✅ सगळं झालं!',
    motivate: ['सुरुवात करा! 🚀', 'छान चालू आहे! 💪', 'एकदम भारी! 🔥', 'AI Master होणार! 🏆']
  },
  en: {
    title: 'Dashboard 📊', back: '← Go Back',
    totalLessons: 'Lessons Complete', totalBadges: 'Badges Earned', overallProgress: 'Overall Progress',
    recentActivity: '🕐 Recent Activity', noActivity: 'No activity yet — start learning!',
    quickActions: '⚡ Quick Actions', startLearning: 'Start Learning', viewBadges: 'View Badges',
    ageProgress: '📈 Age Group Progress',
    age69: '6-9 Years', age1013: '10-13 Years', age1416: '14-16 Years',
    complete: 'complete', goLearn: 'Learn →', allDone: '✅ All Done!',
    motivate: ['Get started! 🚀', 'Great progress! 💪', 'Amazing work! 🔥', 'Almost AI Master! 🏆']
  },
}

const ageLabels = { '6-9': 'age69', '10-13': 'age1013', '14-16': 'age1416' }

export default function DashboardPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { progress, isComplete, getAgeProgress } = useProgress()
  const t = ui[lang]
  const names = lessonNames[lang]

  const totalCompleted = Object.keys(progress).filter(k => progress[k]?.completed).length
  const totalLessons = 9
  const overallPct = Math.round((totalCompleted / totalLessons) * 100)

  const earnedBadges = (() => {
    let count = 0
    if (totalCompleted >= 1) count += 2
    if (allTopics['6-9'].every(t => isComplete('6-9', t))) count++
    if (allTopics['10-13'].every(t => isComplete('10-13', t))) count++
    if (allTopics['14-16'].every(t => isComplete('14-16', t))) count++
    if (totalCompleted >= 9) count++
    if (totalCompleted >= 5) count++
    return Math.min(count, 9)
  })()

  const motivateIdx = Math.min(Math.floor(totalCompleted / 3), t.motivate.length - 1)

  const recentActivity = Object.entries(progress)
    .filter(([_, v]) => v?.completed && v?.completedAt)
    .sort((a, b) => new Date(b[1].completedAt) - new Date(a[1].completedAt))
    .slice(0, 5)
    .map(([key, val]) => {
      const [age, ...topicParts] = key.split('-')
      const topic = topicParts.join('-')
      const lessonName = names[topic] || topic
      const date = new Date(val.completedAt)
      const dateStr = `${date.getDate()}/${date.getMonth() + 1}`
      return { key, age: age + (topicParts[0] === '9' ? '-9' : topicParts[0] === '13' ? '-13' : '-16'), lessonName, dateStr, topic }
    })

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="dashboard-container">
        <h1 className="section-title">{t.title}</h1>

        {/* Motivational Banner */}
        <div className="motivation-banner">
          <span style={{fontSize:'2rem'}}>
            {totalCompleted === 0 ? '🌱' : totalCompleted < 3 ? '⚡' : totalCompleted < 7 ? '🔥' : '🏆'}
          </span>
          <p>{t.motivate[motivateIdx]}</p>
        </div>

        {/* Stats Row */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <div className="dash-stat-num" style={{color:'#34d399'}}>{totalCompleted}</div>
            <div className="dash-stat-label">{t.totalLessons}</div>
            <div className="dash-stat-sub">/ {totalLessons}</div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-num" style={{color:'#fbbf24'}}>{earnedBadges}</div>
            <div className="dash-stat-label">{t.totalBadges}</div>
            <div className="dash-stat-sub">/ 9</div>
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
              const colors = {'6-9':'#34d399', '10-13':'#38bdf8', '14-16':'#a78bfa'}
              const emojis = {'6-9':'🌱', '10-13':'⚡', '14-16':'🚀'}
              return (
                <div key={age} className="age-progress-card" onClick={() => navigate(`/lessons/${age}`)} style={{borderColor: colors[age]}}>
                  <div className="age-progress-header">
                    <span style={{fontSize:'1.5rem'}}>{emojis[age]}</span>
                    <h3 style={{color: colors[age]}}>{t[ageLabels[age]]}</h3>
                    <span style={{marginLeft:'auto', color: pct === 100 ? '#34d399' : '#94a3b8', fontSize:'0.85rem', fontWeight:'700'}}>
                      {pct === 100 ? t.allDone : `${done}/${total}`}
                    </span>
                  </div>
                  <div className="progress-track" style={{marginTop:'12px'}}>
                    <div className="progress-fill" style={{width:`${pct}%`, background: colors[age]}}></div>
                  </div>
                  <div style={{marginTop:'12px', display:'flex', flexWrap:'wrap', gap:'8px'}}>
                    {topics.map(topic => (
                      <span key={topic} style={{
                        padding:'4px 10px', borderRadius:'20px', fontSize:'0.75rem',
                        background: isComplete(age, topic) ? `rgba(52,211,153,0.15)` : 'rgba(255,255,255,0.05)',
                        color: isComplete(age, topic) ? '#34d399' : '#475569',
                        border: `1px solid ${isComplete(age, topic) ? '#34d399' : 'rgba(255,255,255,0.08)'}`,
                      }}>
                        {isComplete(age, topic) ? '✅' : '○'} {names[topic]}
                      </span>
                    ))}
                  </div>
                  <button className="card-btn" style={{marginTop:'16px', background: `linear-gradient(135deg, ${colors[age]}, #0a0a1a)`, fontSize:'0.85rem', padding:'8px 20px'}}>
                    {pct === 100 ? '🔄 Review' : t.goLearn}
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
              {recentActivity.map((item, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot"></div>
                  <div style={{flex:1}}>
                    <span style={{fontWeight:'600', color:'#e2e8f0'}}>{item.lessonName}</span>
                    <span style={{color:'#475569', fontSize:'0.85rem', marginLeft:'8px'}}>✅ Complete</span>
                  </div>
                  <span style={{color:'#475569', fontSize:'0.8rem'}}>{item.dateStr}</span>
                </div>
              ))}
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