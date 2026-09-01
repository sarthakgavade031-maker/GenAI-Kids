import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const practiceQuestions = {
  mr: [
    { q: 'AI चं पूर्ण नाव काय आहे?', opts: ['Artificial Intelligence', 'Automatic Internet', 'Advanced Idea', 'Active Input'], ans: 0 },
    { q: 'Python मध्ये output कसं print करतात?', opts: ['echo()', 'print()', 'show()', 'display()'], ans: 1 },
    { q: 'Machine Learning मध्ये model कशापासून शिकतो?', opts: ['Rules', 'Data आणि Examples', 'Books', 'Magic'], ans: 1 },
    { q: 'Robot ची "eyes" कोणता part आहे?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
    { q: 'ChatGPT कोणत्या technology वर आहे?', opts: ['Database', 'Machine Learning', 'Excel', 'Copy-paste'], ans: 1 },
    { q: 'Deepfake म्हणजे काय?', opts: ['Deep sea fish', 'AI ने बनवलेला fake video', 'Deep meditation', 'Fake money'], ans: 1 },
    { q: 'NLP चा full form?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Loop', 'Normal Logic'], ans: 0 },
    { q: 'Data म्हणजे काय?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
  ],
  hi: [
    { q: 'AI का पूरा नाम क्या है?', opts: ['Artificial Intelligence', 'Automatic Internet', 'Advanced Idea', 'Active Input'], ans: 0 },
    { q: 'Python में output कैसे print करते हैं?', opts: ['echo()', 'print()', 'show()', 'display()'], ans: 1 },
    { q: 'Machine Learning में model कैसे सीखता है?', opts: ['Rules से', 'Data और Examples से', 'Books से', 'Magic से'], ans: 1 },
    { q: 'Robot की "eyes" कौन सा part है?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
    { q: 'ChatGPT किस technology पर है?', opts: ['Database', 'Machine Learning', 'Excel', 'Copy-paste'], ans: 1 },
    { q: 'Deepfake क्या है?', opts: ['Deep sea fish', 'AI से बना fake video', 'Deep meditation', 'Fake money'], ans: 1 },
    { q: 'NLP का full form?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Loop', 'Normal Logic'], ans: 0 },
    { q: 'Data का मतलब क्या है?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
  ],
  en: [
    { q: 'What does AI stand for?', opts: ['Artificial Intelligence', 'Automatic Internet', 'Advanced Idea', 'Active Input'], ans: 0 },
    { q: 'How do you print output in Python?', opts: ['echo()', 'print()', 'show()', 'display()'], ans: 1 },
    { q: 'How does a Machine Learning model learn?', opts: ['From rules', 'From data and examples', 'From books', 'By magic'], ans: 1 },
    { q: 'Which part acts as the "eyes" of a robot?', opts: ['Motor', 'Sensor/Camera', 'Wheel', 'Battery'], ans: 1 },
    { q: 'What technology is ChatGPT based on?', opts: ['Database', 'Machine Learning', 'Excel', 'Copy-paste'], ans: 1 },
    { q: 'What is a Deepfake?', opts: ['Deep sea fish', 'AI-created fake video', 'Deep meditation', 'Fake money'], ans: 1 },
    { q: 'What does NLP stand for?', opts: ['Natural Language Processing', 'New Learning Program', 'Neural Loop', 'Normal Logic'], ans: 0 },
    { q: 'What does Data mean?', opts: ['Music', 'Information', 'Water', 'Air'], ans: 1 },
  ],
}

const ui = {
  mr: {
    back: '← मागे', title: '❤️ Hearts Refill',
    fullHearts: 'तुमचे सगळे Hearts भरलेले आहेत! 🎉', fullSub: 'शिकायला सुरू करा!',
    goLearn: 'शिकणे सुरू करा →',
    waitTitle: 'पुढचं Heart येण्यासाठी', orPractice: 'किंवा',
    practiceTitle: 'Quick Practice करून लगेच Heart मिळवा! 💪',
    practiceSub: 'खाली दिलेले प्रश्न सोडवा — प्रत्येक बरोबर उत्तरासाठी 1 Heart!',
    startPractice: 'Practice सुरू करा 🎯',
    correct: '✅ बरोबर! +1 Heart मिळालं! ❤️',
    wrong: '❌ चुकीचं! पुढचा प्रश्न...',
    next: 'पुढचा प्रश्न →',
    done: 'सगळे Hearts भरले! 🎉',
    doneSub: 'आता शिकायला परत जा!',
    heartsLabel: 'Hearts',
    timeUnit: { h: 'तास', m: 'मिनिटे', s: 'सेकंद' },
  },
  hi: {
    back: '← वापस', title: '❤️ Hearts Refill',
    fullHearts: 'आपके सारे Hearts भरे हुए हैं! 🎉', fullSub: 'सीखना शुरू करो!',
    goLearn: 'सीखना शुरू करो →',
    waitTitle: 'अगला Heart आने में', orPractice: 'या',
    practiceTitle: 'Quick Practice करके तुरंत Heart पाओ! 💪',
    practiceSub: 'नीचे दिए प्रश्न solve करो — हर सही जवाब के लिए 1 Heart!',
    startPractice: 'Practice शुरू करो 🎯',
    correct: '✅ सही! +1 Heart मिला! ❤️',
    wrong: '❌ गलत! अगला प्रश्न...',
    next: 'अगला प्रश्न →',
    done: 'सारे Hearts भर गए! 🎉',
    doneSub: 'अब सीखने के लिए वापस जाओ!',
    heartsLabel: 'Hearts',
    timeUnit: { h: 'घंटे', m: 'मिनट', s: 'सेकंड' },
  },
  en: {
    back: '← Back', title: '❤️ Hearts Refill',
    fullHearts: 'All your Hearts are full! 🎉', fullSub: 'Time to learn!',
    goLearn: 'Start Learning →',
    waitTitle: 'Next Heart in', orPractice: 'or',
    practiceTitle: 'Quick Practice to earn a Heart instantly! 💪',
    practiceSub: 'Answer the questions below — 1 Heart per correct answer!',
    startPractice: 'Start Practice 🎯',
    correct: '✅ Correct! +1 Heart earned! ❤️',
    wrong: '❌ Wrong! Next question...',
    next: 'Next Question →',
    done: 'All Hearts refilled! 🎉',
    doneSub: 'Now go back to learning!',
    heartsLabel: 'Hearts',
    timeUnit: { h: 'hours', m: 'minutes', s: 'seconds' },
  },
}

export default function HeartsRefillPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { hearts, MAX_HEARTS, gainHeart, getNextHeartTime, HEART_REFILL_MS } = useProgress()
  const t = ui[lang]

  const [remaining, setRemaining] = useState(getNextHeartTime())
  const [practicing, setPracticing] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [shuffled, setShuffled] = useState([])

  const questions = practiceQuestions[lang] || practiceQuestions.mr

  // Live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getNextHeartTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [hearts])

  const startPractice = () => {
    const shuffledQ = [...questions].sort(() => Math.random() - 0.5)
    setShuffled(shuffledQ)
    setPracticing(true)
    setQIndex(0)
    setSelected(null)
    setAnswered(false)
  }

  const handleAnswer = async (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const q = shuffled[qIndex]
    if (idx === q.ans && hearts < MAX_HEARTS) {
      await gainHeart()
    }
  }

  const handleNext = () => {
    if (hearts >= MAX_HEARTS) {
      setPracticing(false)
      return
    }
    if (qIndex + 1 >= shuffled.length) {
      // reshuffle and continue
      const shuffledQ = [...questions].sort(() => Math.random() - 0.5)
      setShuffled(shuffledQ)
      setQIndex(0)
    } else {
      setQIndex(i => i + 1)
    }
    setSelected(null)
    setAnswered(false)
  }

  const formatTime = (ms) => {
    const totalSec = Math.ceil(ms / 1000)
    const h = Math.floor(totalSec / 3600)
    const m = Math.floor((totalSec % 3600) / 60)
    const s = totalSec % 60
    if (h > 0) return `${h}${t.timeUnit.h[0]} ${m}${t.timeUnit.m[0]} ${s}${t.timeUnit.s[0]}`
    return `${m}${t.timeUnit.m[0]} ${s}${t.timeUnit.s[0]}`
  }

  const isFull = hearts >= MAX_HEARTS

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{cursor:'pointer'}}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="content-container" style={{textAlign:'center', maxWidth:'560px'}}>
        <h1 className="section-title">{t.title}</h1>

        {/* Hearts Display */}
        <div style={{display:'flex', justifyContent:'center', gap:'8px', marginBottom:'8px', fontSize:'2.2rem'}}>
          {Array.from({length: MAX_HEARTS}).map((_, i) => (
            <span key={i} style={{
              opacity: i < hearts ? 1 : 0.2,
              transform: i < hearts ? 'scale(1)' : 'scale(0.85)',
              transition: 'all 0.3s',
            }}>❤️</span>
          ))}
        </div>
        <p style={{color:'#94a3b8', marginBottom:'32px'}}>{hearts}/{MAX_HEARTS} {t.heartsLabel}</p>

        {isFull ? (
          <div style={{
            background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.25)',
            borderRadius:'20px', padding:'40px 24px', marginBottom:'24px',
          }}>
            <div style={{fontSize:'3rem', marginBottom:'12px'}}>🎉</div>
            <h2 style={{color:'#34d399', marginBottom:'8px'}}>{t.fullHearts}</h2>
            <p style={{color:'#94a3b8', marginBottom:'24px'}}>{t.fullSub}</p>
            <button className="cta-btn" onClick={() => navigate('/age')}>{t.goLearn}</button>
          </div>
        ) : !practicing ? (
          <>
            {/* Countdown */}
            {remaining > 0 && (
              <div style={{
                background:'rgba(167,139,250,0.08)', border:'1px solid rgba(167,139,250,0.25)',
                borderRadius:'20px', padding:'24px', marginBottom:'24px',
              }}>
                <p style={{color:'#94a3b8', marginBottom:'8px', fontSize:'0.9rem'}}>{t.waitTitle}</p>
                <div style={{fontSize:'2rem', fontWeight:900, color:'#a78bfa'}}>⏳ {formatTime(remaining)}</div>
              </div>
            )}

            {remaining > 0 && (
              <p style={{color:'#475569', margin:'16px 0', fontWeight:700}}>— {t.orPractice} —</p>
            )}

            {/* Practice option */}
            <div style={{
              background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.25)',
              borderRadius:'20px', padding:'28px 24px',
            }}>
              <div style={{fontSize:'2.5rem', marginBottom:'12px'}}>💪</div>
              <h3 style={{color:'#fbbf24', marginBottom:'8px'}}>{t.practiceTitle}</h3>
              <p style={{color:'#94a3b8', marginBottom:'20px', fontSize:'0.9rem'}}>{t.practiceSub}</p>
              <button className="cta-btn" onClick={startPractice} style={{background:'linear-gradient(135deg, #fbbf24, #f472b6)'}}>
                {t.startPractice}
              </button>
            </div>
          </>
        ) : (
          /* Practice quiz */
          <div className="question-card">
            <h2 className="question-text">{shuffled[qIndex]?.q}</h2>
            <div className="options-grid">
              {shuffled[qIndex]?.opts.map((opt, i) => {
                let cls = 'option-btn'
                if (answered) {
                  if (i === shuffled[qIndex].ans) cls += ' correct'
                  else if (i === selected && i !== shuffled[qIndex].ans) cls += ' wrong'
                  else cls += ' dimmed'
                }
                return (
                  <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered}>
                    <span className="opt-letter">{['A','B','C','D'][i]}</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>
            {answered && (
              <div className={`feedback ${selected === shuffled[qIndex]?.ans ? 'fb-correct' : 'fb-wrong'}`}>
                {selected === shuffled[qIndex]?.ans ? t.correct : t.wrong}
              </div>
            )}
            {answered && (
              <button className="cta-btn" style={{marginTop:'24px', width:'100%'}} onClick={handleNext}>
                {hearts >= MAX_HEARTS ? t.done : t.next}
              </button>
            )}

            {/* Hearts progress during practice */}
            <div style={{display:'flex', justifyContent:'center', gap:'6px', marginTop:'20px', fontSize:'1.4rem'}}>
              {Array.from({length: MAX_HEARTS}).map((_, i) => (
                <span key={i} style={{opacity: i < hearts ? 1 : 0.2}}>❤️</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}