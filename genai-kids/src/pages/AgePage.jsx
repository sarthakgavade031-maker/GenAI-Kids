import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'

const content = {
  hi: {
    title: 'तुम्हारी उम्र कितनी है? 🎯',
    sub: 'उम्र के अनुसार AI lessons personalize होते हैं',
    back: '← वापस जाएं',
    groups: [
      { age: '6-9', label: '6-9 साल', emoji: '🌱', color: 'card-green', desc: 'AI Stories, Block Coding, Fun Games', topics: ['AI क्या है?', 'Block Coding', 'Robot कैसे बनता है?'] },
      { age: '10-13', label: '10-13 साल', emoji: '⚡', color: 'card-blue', desc: 'Python Basics, AI Concepts, Mini Projects', topics: ['Python सीखो', 'Machine Learning', 'AI Project बनाओ'] },
      { age: '14-16', label: '14-16 साल', emoji: '🚀', color: 'card-purple', desc: 'Real ML Projects, Robotics, AI Tools', topics: ['Neural Networks', 'Real ML Project', 'AI Tools Master'] },
    ],
    btn: 'यही सीखना है! →'
  },
  mr: {
    title: 'तुम्ही किती वर्षांचे आहात? 🎯',
    sub: 'तुमच्या वयानुसार AI lessons personalize होतात',
    back: '← मागे जा',
    groups: [
      { age: '6-9', label: '6-9 वर्षे', emoji: '🌱', color: 'card-green', desc: 'AI Stories, Block Coding, Fun Games', topics: ['AI म्हणजे काय?', 'Block Coding', 'Robot कसा बनतो?'] },
      { age: '10-13', label: '10-13 वर्षे', emoji: '⚡', color: 'card-blue', desc: 'Python Basics, AI Concepts, Mini Projects', topics: ['Python शिका', 'Machine Learning', 'AI Project बनवा'] },
      { age: '14-16', label: '14-16 वर्षे', emoji: '🚀', color: 'card-purple', desc: 'Real ML Projects, Robotics, AI Tools', topics: ['Neural Networks', 'Real ML Project', 'AI Tools Master'] },
    ],
    btn: 'हे शिकायचं आहे! →'
  },
  en: {
    title: 'How old are you? 🎯',
    sub: 'AI lessons get personalized based on your age',
    back: '← Go Back',
    groups: [
      { age: '6-9', label: '6-9 Years', emoji: '🌱', color: 'card-green', desc: 'AI Stories, Block Coding, Fun Games', topics: ['What is AI?', 'Block Coding', 'How Robots Work?'] },
      { age: '10-13', label: '10-13 Years', emoji: '⚡', color: 'card-blue', desc: 'Python Basics, AI Concepts, Mini Projects', topics: ['Learn Python', 'Machine Learning', 'Build AI Project'] },
      { age: '14-16', label: '14-16 Years', emoji: '🚀', color: 'card-purple', desc: 'Real ML Projects, Robotics, AI Tools', topics: ['Neural Networks', 'Real ML Project', 'AI Tools Master'] },
    ],
    btn: 'I want to learn this! →'
  }
}

export default function AgePage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = content[lang]

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" style={{cursor:'pointer'}} onClick={() => navigate('/')}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate('/')}>{t.back}</button>
      </nav>

      <section className="section" style={{paddingTop:'60px'}}>
        <h1 className="section-title" style={{fontSize:'2.2rem', marginBottom:'12px'}}>{t.title}</h1>
        <p style={{textAlign:'center', color:'#94a3b8', marginBottom:'50px'}}>{t.sub}</p>
        <div className="cards">
          {t.groups.map(g => (
            <div key={g.age} className={`card ${g.color}`} onClick={() => navigate(`/lessons/${g.age}`)}>
              <div className="card-emoji">{g.emoji}</div>
              <h3>{g.label}</h3>
              <p>{g.desc}</p>
              <ul style={{textAlign:'left', marginTop:'16px', paddingLeft:'20px', color:'#94a3b8', fontSize:'0.85rem', listStyle:'none'}}>
                {g.topics.map(tp => <li key={tp} style={{marginBottom:'6px'}}>✅ {tp}</li>)}
              </ul>
              <button className="card-btn" style={{marginTop:'20px'}}>{t.btn}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}