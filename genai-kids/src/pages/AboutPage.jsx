import { useNavigate } from 'react-router-dom'
import { useLang } from '../LangContext'

const ui = {
  mr: {
    title: 'GenAI Kids बद्दल',
    missionTitle: '🎯 आपलं Mission',
    mission: 'भारतातील प्रत्येक मुलाला — मग तो कोणत्याही गावात असो, कोणत्याही भाषेत बोलत असो — AI शिकण्याची संधी मिळावी. पूर्णपणे मोफत, भारतीय भाषांमध्ये.',
    problemTitle: '⚠️ Problem काय आहे?',
    problems: [
      '50 कोटी+ भारतीय मुलांना AI education access नाही',
      'सगळे platforms English मध्ये आहेत',
      'JetLearn सारखे platforms ₹8,000/month घेतात',
      'Rural India मध्ये qualified AI teachers नाहीत',
      'Government ने 2026 मध्ये AI curriculum आणला पण tools नाहीत',
    ],
    solutionTitle: '✅ आपलं Solution',
    solutions: [
      'Hindi, Marathi, English — 3 भाषांमध्ये उपलब्ध',
      'पूर्णपणे मोफत — कोणतेही charges नाहीत',
      'AI Tutor 24/7 उपलब्ध — teacher ची गरज नाही',
      'Smartphone वर चालतं — computer लागत नाही',
      'Gamified — मुलं खेळत-खेळत शिकतात',
    ],
    impactTitle: '📊 Impact Numbers',
    sdgTitle: '🌍 UN SDGs Alignment',
    sdgs: [
      { num: 'SDG 4', title: 'Quality Education', desc: 'सर्वांसाठी समान दर्जाचे शिक्षण' },
      { num: 'SDG 10', title: 'Reduced Inequalities', desc: 'Digital divide कमी करणे' },
      { num: 'SDG 9', title: 'Innovation', desc: 'AI innovation मध्ये भारताचा सहभाग' },
    ],
    teamTitle: '👨‍💻 Builder',
    teamDesc: 'GenAI Kids हे Aradhya Sarvasva Guru Ecosystem चा एक भाग आहे — एक 18 वर्षीय entrepreneur ने बनवलेलं platform जो भारतातील मुलांचं AI भविष्य बदलण्याच्या mission वर आहे.',
    visionTitle: '🚀 Vision 2030',
    vision: '1 कोटी भारतीय मुलांना 2030 पर्यंत AI-literate करणे — मोफत, भारतीय भाषांमध्ये.',
    back: '← मागे जा',
    startBtn: 'आत्ता शिका! →',
  },
  hi: {
    title: 'GenAI Kids के बारे में',
    missionTitle: '🎯 हमारा Mission',
    mission: 'भारत के हर बच्चे को — चाहे वो किसी भी गाँव में हो, किसी भी भाषा में बोलता हो — AI सीखने का मौका मिले। बिल्कुल मुफ्त, भारतीय भाषाओं में।',
    problemTitle: '⚠️ Problem क्या है?',
    problems: [
      '50 करोड़+ भारतीय बच्चों को AI education access नहीं',
      'सभी platforms English में हैं',
      'JetLearn जैसे platforms ₹8,000/month लेते हैं',
      'Rural India में qualified AI teachers नहीं हैं',
      'Government ने 2026 में AI curriculum लाया पर tools नहीं',
    ],
    solutionTitle: '✅ हमारा Solution',
    solutions: [
      'Hindi, Marathi, English — 3 भाषाओं में उपलब्ध',
      'बिल्कुल मुफ्त — कोई charges नहीं',
      'AI Tutor 24/7 उपलब्ध — teacher की ज़रूरत नहीं',
      'Smartphone पर चलता है — computer नहीं चाहिए',
      'Gamified — बच्चे खेलते-खेलते सीखते हैं',
    ],
    impactTitle: '📊 Impact Numbers',
    sdgTitle: '🌍 UN SDGs Alignment',
    sdgs: [
      { num: 'SDG 4', title: 'Quality Education', desc: 'सभी के लिए समान शिक्षा' },
      { num: 'SDG 10', title: 'Reduced Inequalities', desc: 'Digital divide कम करना' },
      { num: 'SDG 9', title: 'Innovation', desc: 'AI innovation में भारत का योगदान' },
    ],
    teamTitle: '👨‍💻 Builder',
    teamDesc: 'GenAI Kids Aradhya Sarvasva Guru Ecosystem का एक हिस्सा है — एक 18 साल के entrepreneur ने बनाया जो भारत के बच्चों का AI भविष्य बदलने के mission पर है।',
    visionTitle: '🚀 Vision 2030',
    vision: '1 करोड़ भारतीय बच्चों को 2030 तक AI-literate करना — मुफ्त, भारतीय भाषाओं में।',
    back: '← वापस',
    startBtn: 'अभी सीखो! →',
  },
  en: {
    title: 'About GenAI Kids',
    missionTitle: '🎯 Our Mission',
    mission: 'Every child in India — regardless of their village, language, or background — deserves access to AI education. Completely free, in Indian languages.',
    problemTitle: '⚠️ The Problem',
    problems: [
      '500 million+ Indian children have no access to AI education',
      'All platforms are English-only',
      'Platforms like JetLearn charge ₹8,000/month',
      'Rural India has no qualified AI teachers',
      'Government introduced AI curriculum in 2026 but no tools exist',
    ],
    solutionTitle: '✅ Our Solution',
    solutions: [
      'Hindi, Marathi, English — available in 3 languages',
      'Completely free — no charges ever',
      'AI Tutor available 24/7 — no teacher needed',
      'Works on smartphones — no computer required',
      'Gamified — children learn while playing',
    ],
    impactTitle: '📊 Impact Numbers',
    sdgTitle: '🌍 UN SDGs Alignment',
    sdgs: [
      { num: 'SDG 4', title: 'Quality Education', desc: 'Equal quality education for all' },
      { num: 'SDG 10', title: 'Reduced Inequalities', desc: 'Bridging the digital divide' },
      { num: 'SDG 9', title: 'Innovation', desc: "India's participation in AI innovation" },
    ],
    teamTitle: '👨‍💻 Builder',
    teamDesc: 'GenAI Kids is part of the Aradhya Sarvasva Guru Ecosystem — built by an 18-year-old entrepreneur on a mission to transform the AI future of Indian children.',
    visionTitle: '🚀 Vision 2030',
    vision: 'Making 10 million Indian children AI-literate by 2030 — free, in Indian languages.',
    back: '← Go Back',
    startBtn: 'Start Learning! →',
  },
}

const impactData = [
  { num: '50Cr+', label: { mr: 'Target मुलं', hi: 'Target बच्चे', en: 'Target Children' }, color: '#a78bfa' },
  { num: '9', label: { mr: 'Lessons', hi: 'Lessons', en: 'Lessons' }, color: '#38bdf8' },
  { num: '3', label: { mr: 'भाषा', hi: 'भाषाएं', en: 'Languages' }, color: '#34d399' },
  { num: '100%', label: { mr: 'मोफत', hi: 'मुफ्त', en: 'Free' }, color: '#fbbf24' },
  { num: '3', label: { mr: 'Age Groups', hi: 'Age Groups', en: 'Age Groups' }, color: '#f472b6' },
  { num: '24/7', label: { mr: 'AI Tutor', hi: 'AI Tutor', en: 'AI Tutor' }, color: '#ef4444' },
]

export default function AboutPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = ui[lang]

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="about-container">

        {/* Hero */}
        <div className="about-hero">
          <div style={{fontSize:'4rem', marginBottom:'16px'}}>🧠</div>
          <h1 className="about-main-title">{t.title}</h1>
          <p className="about-tagline">
            {lang === 'mr' ? 'AI शिका, खेळत खेळत! 🚀' : lang === 'hi' ? 'AI सीखो, खेलते खेलते! 🚀' : 'Learn AI, The Fun Way! 🚀'}
          </p>
        </div>

        {/* Mission */}
        <div className="about-card mission-card">
          <h2>{t.missionTitle}</h2>
          <p className="about-text">{t.mission}</p>
        </div>

        {/* Impact Numbers */}
        <div className="about-section">
          <h2 className="about-section-title">{t.impactTitle}</h2>
          <div className="impact-grid">
            {impactData.map((item, i) => (
              <div key={i} className="impact-card" style={{borderColor: item.color}}>
                <div className="impact-num" style={{color: item.color}}>{item.num}</div>
                <div className="impact-label">{item.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="problem-solution-grid">
          <div className="about-card problem-card">
            <h2>{t.problemTitle}</h2>
            <ul className="about-list">
              {t.problems.map((p, i) => (
                <li key={i} className="problem-item">
                  <span className="problem-dot">❌</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-card solution-card">
            <h2>{t.solutionTitle}</h2>
            <ul className="about-list">
              {t.solutions.map((s, i) => (
                <li key={i} className="solution-item">
                  <span>✅</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SDGs */}
        <div className="about-section">
          <h2 className="about-section-title">{t.sdgTitle}</h2>
          <div className="sdg-grid">
            {t.sdgs.map((sdg, i) => (
              <div key={i} className="sdg-card">
                <div className="sdg-num">{sdg.num}</div>
                <h3>{sdg.title}</h3>
                <p>{sdg.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="about-card team-card">
          <h2>{t.teamTitle}</h2>
          <div className="team-profile">
            <div className="team-avatar">👨‍💻</div>
            <div>
              <h3 style={{color:'#a78bfa', marginBottom:'8px'}}>Aradhya Sarvasva Guru</h3>
              <p className="about-text">{t.teamDesc}</p>
              <div style={{display:'flex', gap:'10px', marginTop:'12px', flexWrap:'wrap'}}>
                {['AI/ML', 'Cybersecurity', 'EdTech', 'Robotics'].map(skill => (
                  <span key={skill} style={{
                    padding:'4px 12px', borderRadius:'20px', fontSize:'0.8rem',
                    background:'rgba(167,139,250,0.15)', border:'1px solid #a78bfa', color:'#a78bfa'
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="about-card vision-card">
          <h2>{t.visionTitle}</h2>
          <p className="about-text vision-text">{t.vision}</p>
          <div className="vision-timeline">
            {[
              { year: '2026', label: lang === 'mr' ? 'Launch & Beta' : 'Launch & Beta', done: true },
              { year: '2027', label: lang === 'mr' ? '1 लाख Users' : lang === 'hi' ? '1 लाख Users' : '100K Users', done: false },
              { year: '2028', label: lang === 'mr' ? '10 भाषा' : lang === 'hi' ? '10 भाषाएं' : '10 Languages', done: false },
              { year: '2030', label: lang === 'mr' ? '1 कोटी मुलं' : lang === 'hi' ? '1 करोड़ बच्चे' : '10M Children', done: false },
            ].map((item, i) => (
              <div key={i} className="timeline-item">
                <div className={`timeline-dot ${item.done ? 'done' : ''}`}></div>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign:'center', marginTop:'40px'}}>
          <button className="cta-btn" onClick={() => navigate('/age')} style={{fontSize:'1.2rem', padding:'16px 48px'}}>
            {t.startBtn}
          </button>
        </div>

      </div>
    </div>
  )
}