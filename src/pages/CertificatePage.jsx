import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'
import { useAuth } from '../AuthContext'

const allTopics = {
  '6-9': ['ai-intro','block-coding','robotics-intro','ai-games','smart-devices','ai-art','what-is-data','future-jobs','ai-safety','ai-story'],
  '10-13': ['python-basics','ml-intro','mini-project','data-science','computer-vision','nlp-basics','ai-ethics','build-chatbot','web-scraping','ai-music'],
  '14-16': ['neural-nets','ml-project','ai-tools','deep-learning','computer-vision-adv','nlp-transformers','reinforcement-learning','generative-ai','ai-security','ai-startup'],
}

const ageTitles = {
  mr: { '6-9': 'AI Explorer (वय 6-9)', '10-13': 'AI Builder (वय 10-13)', '14-16': 'AI Master (वय 14-16)' },
  hi: { '6-9': 'AI Explorer (उम्र 6-9)', '10-13': 'AI Builder (उम्र 10-13)', '14-16': 'AI Master (उम्र 14-16)' },
  en: { '6-9': 'AI Explorer (Ages 6-9)', '10-13': 'AI Builder (Ages 10-13)', '14-16': 'AI Master (Ages 14-16)' },
}

const ui = {
  mr: {
    back: '← मागे', title: 'Certificate 🏆',
    notReady: 'अजून पूर्ण नाही!', notReadySub: (done, total) => `तुम्ही ${done}/${total} lessons पूर्ण केले आहेत. सगळे complete करा आणि certificate मिळवा!`,
    goLearn: 'शिकणे सुरू करा →',
    certTitle: 'प्रशस्तीपत्र', certSubtitle: 'Certificate of Completion',
    presentedTo: 'हे प्रशस्तीपत्र दिले जाते',
    completedText: 'यांनी यशस्वीरित्या पूर्ण केले आहे',
    course: 'GenAI Kids — AI शिक्षण कार्यक्रम',
    forLevel: 'Level:',
    dateLabel: 'तारीख', signLabel: 'GenAI Kids Team',
    downloadBtn: '📥 Download / Print Certificate',
    shareBtn: '📤 Share',
    congrats: 'अभिनंदन! 🎉',
    xpEarned: 'एकूण XP', lessonsCompleted: 'Lessons Completed',
    selectLevel: 'Certificate साठी Level निवडा',
  },
  hi: {
    back: '← वापस', title: 'Certificate 🏆',
    notReady: 'अभी पूरा नहीं हुआ!', notReadySub: (done, total) => `तुमने ${done}/${total} lessons पूरे किए हैं। सब complete करो और certificate पाओ!`,
    goLearn: 'सीखना शुरू करो →',
    certTitle: 'प्रमाण पत्र', certSubtitle: 'Certificate of Completion',
    presentedTo: 'यह प्रमाण पत्र प्रदान किया जाता है',
    completedText: 'ने सफलतापूर्वक पूरा किया है',
    course: 'GenAI Kids — AI शिक्षा कार्यक्रम',
    forLevel: 'Level:',
    dateLabel: 'तारीख', signLabel: 'GenAI Kids Team',
    downloadBtn: '📥 Download / Print Certificate',
    shareBtn: '📤 Share',
    congrats: 'बधाई हो! 🎉',
    xpEarned: 'कुल XP', lessonsCompleted: 'Lessons Completed',
    selectLevel: 'Certificate के लिए Level चुनें',
  },
  en: {
    back: '← Back', title: 'Certificate 🏆',
    notReady: 'Not Complete Yet!', notReadySub: (done, total) => `You've completed ${done}/${total} lessons. Finish them all to earn your certificate!`,
    goLearn: 'Start Learning →',
    certTitle: 'Certificate', certSubtitle: 'Certificate of Completion',
    presentedTo: 'This certificate is proudly presented to',
    completedText: 'for successfully completing',
    course: 'GenAI Kids — AI Education Program',
    forLevel: 'Level:',
    dateLabel: 'Date', signLabel: 'GenAI Kids Team',
    downloadBtn: '📥 Download / Print Certificate',
    shareBtn: '📤 Share',
    congrats: 'Congratulations! 🎉',
    xpEarned: 'Total XP', lessonsCompleted: 'Lessons Completed',
    selectLevel: 'Select Level for Certificate',
  },
}

export default function CertificatePage() {
  const navigate = useNavigate()
  const { age } = useParams()
  const { lang } = useLang()
  const { progress, getAgeProgress, xp, isComplete } = useProgress()
  const { user } = useAuth()
  const t = ui[lang]

  const username = user?.name || localStorage.getItem('genai-username') || 'Student'
  const today = new Date()
  const dateStr = today.toLocaleDateString(lang === 'en' ? 'en-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  // If no age param, show level selector
  if (!age || !allTopics[age]) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
          <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
        </nav>
        <div className="content-container" style={{textAlign:'center'}}>
          <h1 className="section-title">{t.title}</h1>
          <p style={{color:'#94a3b8', marginBottom:'32px'}}>{t.selectLevel}</p>
          <div style={{display:'flex', flexDirection:'column', gap:'16px', maxWidth:'420px', margin:'0 auto'}}>
            {Object.entries(allTopics).map(([ageKey, topics]) => {
              const { done, total, pct } = getAgeProgress(ageKey, topics)
              const colors = {'6-9':'#34d399','10-13':'#38bdf8','14-16':'#a78bfa'}
              const emojis = {'6-9':'🌱','10-13':'⚡','14-16':'🚀'}
              return (
                <div key={ageKey}
                  onClick={() => navigate(`/certificate/${ageKey}`)}
                  style={{
                    display:'flex', alignItems:'center', gap:'16px',
                    background:'rgba(255,255,255,0.04)', border:`1px solid ${pct===100 ? colors[ageKey] : 'rgba(255,255,255,0.1)'}`,
                    borderRadius:'16px', padding:'18px 22px', cursor:'pointer', textAlign:'left',
                  }}
                >
                  <span style={{fontSize:'2rem'}}>{emojis[ageKey]}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800, color:'white'}}>{ageTitles[lang][ageKey]}</div>
                    <div style={{color:'#94a3b8', fontSize:'0.85rem'}}>{done}/{total} lessons</div>
                  </div>
                  {pct === 100 ? (
                    <span style={{color: colors[ageKey], fontWeight:800}}>🏆</span>
                  ) : (
                    <span style={{color:'#475569', fontSize:'0.85rem'}}>{pct}%</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const topics = allTopics[age]
  const { done, total, pct } = getAgeProgress(age, topics)
  const isReady = pct === 100

  if (!isReady) {
    return (
      <div className="app">
        <nav className="navbar">
          <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
          <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
        </nav>
        <div className="content-container" style={{textAlign:'center', paddingTop:'40px'}}>
          <div style={{fontSize:'4rem', marginBottom:'16px'}}>🔒</div>
          <h2 style={{color:'white', fontSize:'1.6rem', marginBottom:'8px'}}>{t.notReady}</h2>
          <p style={{color:'#94a3b8', marginBottom:'24px'}}>{t.notReadySub(done, total)}</p>
          <div className="progress-track" style={{maxWidth:'320px', margin:'0 auto 24px'}}>
            <div className="progress-fill" style={{width:`${pct}%`}}></div>
          </div>
          <button className="cta-btn" onClick={() => navigate(`/lessons/${age}`)}>{t.goLearn}</button>
        </div>
      </div>
    )
  }

  const handlePrint = () => window.print()

  const handleShare = async () => {
    const shareData = {
      title: 'GenAI Kids Certificate',
      text: `${username} completed ${ageTitles[lang][age]} on GenAI Kids! 🏆`,
      url: window.location.href,
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch (e) {}
    } else {
      navigator.clipboard.writeText(shareData.text + ' ' + shareData.url)
      alert('Copied to clipboard!')
    }
  }

  return (
    <div className="app">
      <style>{`
        @media print {
          .navbar, .cert-actions, .footer { display: none !important; }
          .cert-container { padding: 0 !important; }
          .cert-card { box-shadow: none !important; border: 4px solid #a78bfa !important; }
          body { background: white !important; }
        }
        @keyframes confetti-fall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          to { transform: translateY(400px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="cert-container" style={{maxWidth:'820px', margin:'30px auto', padding:'0 16px 60px'}}>
        <h1 className="section-title" style={{textAlign:'center'}}>{t.congrats}</h1>

        {/* Certificate Card */}
        <div className="cert-card" style={{
          position:'relative', overflow:'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 100%)',
          borderRadius: '24px',
          padding: '50px 40px',
          boxShadow: '0 20px 60px rgba(167,139,250,0.3)',
          border: '6px solid transparent',
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f7ff 100%), linear-gradient(135deg, #a78bfa, #38bdf8, #fbbf24)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          textAlign: 'center',
        }}>
          {/* corner decorations */}
          <div style={{position:'absolute', top:'16px', left:'16px', fontSize:'2rem'}}>🏆</div>
          <div style={{position:'absolute', top:'16px', right:'16px', fontSize:'2rem'}}>🏆</div>

          <div style={{fontSize:'3rem', marginBottom:'8px'}}>🧠</div>
          <h2 style={{
            fontSize:'2.2rem', fontWeight:900,
            background:'linear-gradient(135deg, #a78bfa, #38bdf8)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            marginBottom:'4px', letterSpacing:'2px',
          }}>
            {t.certTitle}
          </h2>
          <p style={{color:'#64748b', fontSize:'0.95rem', marginBottom:'28px', letterSpacing:'3px', textTransform:'uppercase'}}>
            {t.certSubtitle}
          </p>

          <p style={{color:'#64748b', fontSize:'1rem', marginBottom:'8px'}}>{t.presentedTo}</p>
          <h3 style={{
            fontSize:'2rem', fontWeight:900, color:'#1e1b4b',
            marginBottom:'24px', fontFamily:'Georgia, serif',
            borderBottom:'2px solid #a78bfa', display:'inline-block', paddingBottom:'4px',
          }}>
            {username}
          </h3>

          <p style={{color:'#64748b', fontSize:'1rem', marginBottom:'4px'}}>{t.completedText}</p>
          <p style={{color:'#1e1b4b', fontSize:'1.2rem', fontWeight:800, marginBottom:'4px'}}>{t.course}</p>
          <p style={{
            color:'#a78bfa', fontSize:'1.1rem', fontWeight:800, marginBottom:'28px',
            background:'rgba(167,139,250,0.1)', display:'inline-block', padding:'6px 20px', borderRadius:'20px',
          }}>
            {t.forLevel} {ageTitles[lang][age]}
          </p>

          {/* Stats row */}
          <div style={{display:'flex', justifyContent:'center', gap:'40px', marginBottom:'32px', flexWrap:'wrap'}}>
            <div>
              <div style={{fontSize:'1.8rem', fontWeight:900, color:'#34d399'}}>{done}/{total}</div>
              <div style={{color:'#64748b', fontSize:'0.8rem'}}>{t.lessonsCompleted}</div>
            </div>
            <div>
              <div style={{fontSize:'1.8rem', fontWeight:900, color:'#a78bfa'}}>{xp}</div>
              <div style={{color:'#64748b', fontSize:'0.8rem'}}>{t.xpEarned}</div>
            </div>
          </div>

          {/* Footer line */}
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'40px', paddingTop:'20px', borderTop:'1px solid #e2e8f0'}}>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:'0.85rem', color:'#94a3b8'}}>{t.dateLabel}</div>
              <div style={{fontWeight:700, color:'#1e1b4b'}}>{dateStr}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'1.3rem', fontWeight:900, fontFamily:'Georgia, serif', color:'#1e1b4b', borderBottom:'2px solid #1e1b4b', paddingBottom:'2px'}}>
                GenAI Kids
              </div>
              <div style={{fontSize:'0.8rem', color:'#94a3b8', marginTop:'2px'}}>{t.signLabel}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="cert-actions" style={{display:'flex', gap:'12px', justifyContent:'center', marginTop:'28px', flexWrap:'wrap'}}>
          <button className="cta-btn" onClick={handlePrint}>{t.downloadBtn}</button>
          <button className="back-btn" onClick={handleShare}>{t.shareBtn}</button>
        </div>
      </div>
    </div>
  )
}