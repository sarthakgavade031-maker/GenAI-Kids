import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const allTopics = {
  '6-9': ['ai-intro', 'block-coding', 'robotics-intro'],
  '10-13': ['python-basics', 'ml-intro', 'mini-project'],
  '14-16': ['neural-nets', 'ml-project', 'ai-tools'],
}

const badgesList = {
  hi: [
    { id: 'first-step', emoji: '👣', title: 'First Step', desc: 'पहला lesson complete किया!', color: '#34d399' },
    { id: 'quiz-pass', emoji: '🧠', title: 'Quiz Hero', desc: 'पहली quiz pass की!', color: '#38bdf8' },
    { id: 'perfect-score', emoji: '💯', title: 'Perfect Score', desc: 'Quiz में 5/5 score किया!', color: '#fbbf24' },
    { id: 'age-champion-6', emoji: '🌱', title: '6-9 Champion', desc: '6-9 के सभी lessons complete!', color: '#34d399' },
    { id: 'age-champion-10', emoji: '⚡', title: '10-13 Champion', desc: '10-13 के सभी lessons complete!', color: '#38bdf8' },
    { id: 'age-champion-14', emoji: '🚀', title: '14-16 Champion', desc: '14-16 के सभी lessons complete!', color: '#a78bfa' },
    { id: 'ai-master', emoji: '🏆', title: 'AI Master', desc: 'सभी 9 lessons complete किए!', color: '#fbbf24' },
    { id: 'explorer', emoji: '🔭', title: 'Explorer', desc: 'तीनों age groups explore किए!', color: '#f472b6' },
    { id: 'consistent', emoji: '🔥', title: 'Consistent', desc: '5+ lessons complete किए!', color: '#ef4444' },
  ],
  mr: [
    { id: 'first-step', emoji: '👣', title: 'First Step', desc: 'पहिला lesson complete केला!', color: '#34d399' },
    { id: 'quiz-pass', emoji: '🧠', title: 'Quiz Hero', desc: 'पहिली quiz pass केली!', color: '#38bdf8' },
    { id: 'perfect-score', emoji: '💯', title: 'Perfect Score', desc: 'Quiz मध्ये 5/5 score केला!', color: '#fbbf24' },
    { id: 'age-champion-6', emoji: '🌱', title: '6-9 Champion', desc: '6-9 चे सगळे lessons complete!', color: '#34d399' },
    { id: 'age-champion-10', emoji: '⚡', title: '10-13 Champion', desc: '10-13 चे सगळे lessons complete!', color: '#38bdf8' },
    { id: 'age-champion-14', emoji: '🚀', title: '14-16 Champion', desc: '14-16 चे सगळे lessons complete!', color: '#a78bfa' },
    { id: 'ai-master', emoji: '🏆', title: 'AI Master', desc: 'सगळे 9 lessons complete केले!', color: '#fbbf24' },
    { id: 'explorer', emoji: '🔭', title: 'Explorer', desc: 'तिन्ही age groups explore केले!', color: '#f472b6' },
    { id: 'consistent', emoji: '🔥', title: 'Consistent', desc: '5+ lessons complete केले!', color: '#ef4444' },
  ],
  en: [
    { id: 'first-step', emoji: '👣', title: 'First Step', desc: 'Completed your first lesson!', color: '#34d399' },
    { id: 'quiz-pass', emoji: '🧠', title: 'Quiz Hero', desc: 'Passed your first quiz!', color: '#38bdf8' },
    { id: 'perfect-score', emoji: '💯', title: 'Perfect Score', desc: 'Scored 5/5 in a quiz!', color: '#fbbf24' },
    { id: 'age-champion-6', emoji: '🌱', title: '6-9 Champion', desc: 'Completed all 6-9 lessons!', color: '#34d399' },
    { id: 'age-champion-10', emoji: '⚡', title: '10-13 Champion', desc: 'Completed all 10-13 lessons!', color: '#38bdf8' },
    { id: 'age-champion-14', emoji: '🚀', title: '14-16 Champion', desc: 'Completed all 14-16 lessons!', color: '#a78bfa' },
    { id: 'ai-master', emoji: '🏆', title: 'AI Master', desc: 'Completed all 9 lessons!', color: '#fbbf24' },
    { id: 'explorer', emoji: '🔭', title: 'Explorer', desc: 'Explored all 3 age groups!', color: '#f472b6' },
    { id: 'consistent', emoji: '🔥', title: 'Consistent', desc: 'Completed 5+ lessons!', color: '#ef4444' },
  ],
}

const uiText = {
  hi: { title: 'तुम्हारे Badges 🏅', sub: 'Lessons complete करो और badges unlock करो!', earned: 'Earned', locked: 'Locked', back: '← वापस', total: 'कुल badges' },
  mr: { title: 'तुमचे Badges 🏅', sub: 'Lessons complete करा आणि badges unlock करा!', earned: 'Earned', locked: 'Locked', back: '← मागे जा', total: 'एकूण badges' },
  en: { title: 'Your Badges 🏅', sub: 'Complete lessons and unlock badges!', earned: 'Earned', locked: 'Locked', back: '← Go Back', total: 'Total badges' },
}

export default function BadgesPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { isComplete, progress } = useProgress()

  const badges = badgesList[lang]
  const ui = uiText[lang]

  const totalCompleted = Object.keys(progress).filter(k => progress[k]?.completed).length

  const isBadgeEarned = (badgeId) => {
    switch (badgeId) {
      case 'first-step':
        return totalCompleted >= 1
      case 'quiz-pass':
        return totalCompleted >= 1
      case 'perfect-score':
        return !!progress['perfect-score']
      case 'age-champion-6':
        return allTopics['6-9'].every(t => isComplete('6-9', t))
      case 'age-champion-10':
        return allTopics['10-13'].every(t => isComplete('10-13', t))
      case 'age-champion-14':
        return allTopics['14-16'].every(t => isComplete('14-16', t))
      case 'ai-master':
        return totalCompleted >= 9
      case 'explorer': {
        const has69 = allTopics['6-9'].some(t => isComplete('6-9', t))
        const has1013 = allTopics['10-13'].some(t => isComplete('10-13', t))
        const has1416 = allTopics['14-16'].some(t => isComplete('14-16', t))
        return has69 && has1013 && has1416
      }
      case 'consistent':
        return totalCompleted >= 5
      default:
        return false
    }
  }

  const earnedBadges = badges.filter(b => isBadgeEarned(b.id))
  const lockedBadges = badges.filter(b => !isBadgeEarned(b.id))
  const earnedPct = Math.round((earnedBadges.length / badges.length) * 100)

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{ui.back}</button>
      </nav>

      <div className="badges-container">
        <h1 className="section-title">{ui.title}</h1>
        <p style={{textAlign:'center', color:'#94a3b8', marginBottom:'32px'}}>{ui.sub}</p>

        {/* Overall Progress */}
        <div className="badges-overview">
          <div className="badges-stat">
            <span className="badges-stat-num">{earnedBadges.length}</span>
            <span className="badges-stat-label">{ui.earned}</span>
          </div>
          <div className="badges-circle-wrap">
            <div className="badges-circle">
              <span className="badges-circle-num">{earnedPct}%</span>
            </div>
          </div>
          <div className="badges-stat">
            <span className="badges-stat-num">{badges.length}</span>
            <span className="badges-stat-label">{ui.total}</span>
          </div>
        </div>

        {/* Overall progress bar */}
        <div style={{margin:'0 0 40px', padding:'0 8px'}}>
          <div className="progress-track">
            <div className="progress-fill" style={{width:`${earnedPct}%`}}></div>
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div style={{marginBottom:'40px'}}>
            <h2 style={{color:'#34d399', marginBottom:'20px', fontSize:'1.2rem'}}>✅ {ui.earned} ({earnedBadges.length})</h2>
            <div className="badges-grid">
              {earnedBadges.map(badge => (
                <div key={badge.id} className="badge-card earned" style={{borderColor: badge.color}}>
                  <div className="badge-glow" style={{background: badge.color}}></div>
                  <div className="badge-emoji">{badge.emoji}</div>
                  <h3 className="badge-title" style={{color: badge.color}}>{badge.title}</h3>
                  <p className="badge-desc">{badge.desc}</p>
                  <div className="badge-tag earned-tag">✅ Earned!</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div>
            <h2 style={{color:'#475569', marginBottom:'20px', fontSize:'1.2rem'}}>🔒 {ui.locked} ({lockedBadges.length})</h2>
            <div className="badges-grid">
              {lockedBadges.map(badge => (
                <div key={badge.id} className="badge-card locked">
                  <div className="badge-emoji locked-emoji">{badge.emoji}</div>
                  <h3 className="badge-title" style={{color:'#475569'}}>{badge.title}</h3>
                  <p className="badge-desc" style={{color:'#334155'}}>{badge.desc}</p>
                  <div className="badge-tag locked-tag">🔒 Locked</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {earnedBadges.length === badges.length && (
          <div className="all-badges-done">
            <div style={{fontSize:'3rem', marginBottom:'16px'}}>🎉🏆🎉</div>
            <h2 style={{color:'#fbbf24', marginBottom:'8px'}}>
              {lang === 'mr' ? 'अभिनंदन! सगळे badges unlock!' : lang === 'hi' ? 'बधाई! सभी badges unlock!' : 'Congratulations! All badges unlocked!'}
            </h2>
            <p style={{color:'#94a3b8'}}>
              {lang === 'mr' ? 'तुम्ही खरे AI Master आहात!' : lang === 'hi' ? 'तुम सच्चे AI Master हो!' : 'You are a true AI Master!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}