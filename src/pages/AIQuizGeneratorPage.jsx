import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

// Same as StoryGeneratorPage.jsx / TutorPage.jsx — keep model id consistent across the app.
const MODEL = 'claude-sonnet-4-20250514'

const subjectPresets = {
  mr: ['AI म्हणजे काय?', 'Robotics', 'Python Basics', 'Machine Learning', 'Space', 'Animals'],
  hi: ['AI क्या है?', 'Robotics', 'Python Basics', 'Machine Learning', 'Space', 'Animals'],
  en: ['What is AI?', 'Robotics', 'Python Basics', 'Machine Learning', 'Space', 'Animals'],
}

const ui = {
  mr: {
    title: '🎓 AI Quiz Generator', sub: 'कोणत्याही विषयावर instant quiz बनवा!',
    back: '← मागे', subjectLabel: 'विषय टाक किंवा निवड', subjectPlaceholder: 'उदा. Solar System...',
    generateBtn: '✨ Quiz बनव!', generating: 'Quiz तयार होतोय...', errorMsg: '⚠️ Quiz तयार करता आलं नाही. परत try कर!',
    q: 'प्रश्न', next: 'पुढचा प्रश्न →', finish: 'निकाल बघा 🎉', correct: '✅ बरोबर!', wrong: '❌ चुकीचं!',
    resultTitle: 'तुझा निकाल', retry: '🔄 परत खेळ', newQuiz: '🆕 नवीन Quiz', home: '🏠 Home',
  },
  hi: {
    title: '🎓 AI Quiz Generator', sub: 'किसी भी topic पर instant quiz बनाओ!',
    back: '← वापस', subjectLabel: 'Subject लिखो या चुनो', subjectPlaceholder: 'जैसे: Solar System...',
    generateBtn: '✨ Quiz बनाओ!', generating: 'Quiz बन रहा है...', errorMsg: '⚠️ Quiz नहीं बन पाया। फिर try करो!',
    q: 'प्रश्न', next: 'अगला प्रश्न →', finish: 'रिजल्ट देखो 🎉', correct: '✅ सही!', wrong: '❌ गलत!',
    resultTitle: 'तुम्हारा रिजल्ट', retry: '🔄 फिर खेलो', newQuiz: '🆕 नया Quiz', home: '🏠 Home',
  },
  en: {
    title: '🎓 AI Quiz Generator', sub: 'Generate an instant quiz on any topic!',
    back: '← Back', subjectLabel: 'Type or pick a subject', subjectPlaceholder: 'e.g. Solar System...',
    generateBtn: '✨ Generate Quiz!', generating: 'Building your quiz...', errorMsg: "⚠️ Couldn't build the quiz. Try again!",
    q: 'Question', next: 'Next Question →', finish: 'See Results 🎉', correct: '✅ Correct!', wrong: '❌ Wrong!',
    resultTitle: 'Your Result', retry: '🔄 Retry', newQuiz: '🆕 New Quiz', home: '🏠 Home',
  },
}

function saveQuizHistory(record) {
  try {
    const existing = JSON.parse(localStorage.getItem('genai-ai-quiz-history') || '[]')
    existing.unshift(record)
    localStorage.setItem('genai-ai-quiz-history', JSON.stringify(existing.slice(0, 50)))
  } catch (e) {
    console.error('Could not save quiz history', e)
  }
}

export default function AIQuizGeneratorPage() {
  const navigate = useNavigate()
  const { age = '10-13' } = useParams()
  const { lang } = useLang()
  const { addXp, loseHeart, hearts } = useProgress()
  const t = ui[lang]

  const [subject, setSubject] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [questions, setQuestions] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const langName = lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'

  const handleGenerate = async () => {
    if (!subject.trim()) return
    setLoading(true)
    setError(false)
    setQuestions(null)

    const systemPrompt = `You are a quiz generator for school children. Respond ONLY with valid JSON, no markdown fences, no preamble.
JSON shape: {"questions":[{"question":"string","options":["a","b","c","d"],"correctIndex":0}]}
Write the question and options in ${langName}. Keep language simple for age group ${age}.`

    const userMessage = `Create 5 multiple-choice questions about "${subject.trim()}" suitable for a student aged ${age}.`

    try {
      const response = await fetch('/api/claude/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1200,
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        }),
      })
      const data = await response.json()
      const raw = data?.content?.[0]?.text || ''
      const clean = raw.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)

      if (!parsed.questions || !parsed.questions.length) throw new Error('No questions returned')

      setQuestions(parsed.questions)
      setCurrent(0)
      setScore(0)
      setSelected(null)
      setAnswered(false)
      setShowResult(false)
    } catch (err) {
      console.error('Quiz generation failed:', err)
      setError(true)
    }
    setLoading(false)
  }

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const q = questions[current]
    if (idx === q.correctIndex) {
      setScore((s) => s + 1)
      if (addXp) addXp(5)
    } else if (loseHeart) {
      loseHeart()
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setShowResult(true)
      saveQuizHistory({
        id: Date.now(),
        subject: subject.trim(),
        age,
        score,
        total: questions.length,
        createdAt: new Date().toISOString(),
      })
      if (score === questions.length && addXp) addXp(15) // bonus for perfect score
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleReset = () => {
    setQuestions(null)
    setSubject('')
    setError(false)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="content-container" style={{ maxWidth: '620px' }}>
        <h1 className="section-title">{t.title}</h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '32px' }}>{t.sub}</p>

        {/* Setup form */}
        {!questions && !showResult && (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>{t.subjectLabel}</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t.subjectPlaceholder}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '1rem',
              }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {subjectPresets[lang].map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer',
                    background: subject === s ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.05)',
                    border: subject === s ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)',
                    color: subject === s ? '#38bdf8' : '#94a3b8',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {error && <p style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{t.errorMsg}</p>}

            <button className="cta-btn" style={{ width: '100%' }} disabled={loading || !subject.trim()} onClick={handleGenerate}>
              {loading ? t.generating : t.generateBtn}
            </button>
          </div>
        )}

        {/* Quiz in progress */}
        {questions && !showResult && (
          <div className="question-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>
              <span>{t.q} {current + 1} / {questions.length}</span>
              <span>⭐ {score}</span>
            </div>
            <h2 className="question-text">{questions[current].question}</h2>
            <div className="options-grid">
              {questions[current].options.map((opt, i) => {
                let cls = 'option-btn'
                if (answered) {
                  if (i === questions[current].correctIndex) cls += ' correct'
                  else if (i === selected) cls += ' wrong'
                  else cls += ' dimmed'
                }
                return (
                  <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered}>
                    <span className="opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>
            {answered && (
              <div className={`feedback ${selected === questions[current].correctIndex ? 'fb-correct' : 'fb-wrong'}`}>
                {selected === questions[current].correctIndex ? t.correct : t.wrong}
              </div>
            )}
            {answered && (
              <button className="cta-btn" style={{ marginTop: '24px', width: '100%' }} onClick={handleNext}>
                {current + 1 >= questions.length ? t.finish : t.next}
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {showResult && (
          <div className="result-card" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '8px' }}>{t.resultTitle}</h2>
            <div className="score-circle">
              <span className="score-num">{score}</span>
              <span className="score-of">/{questions.length}</span>
            </div>
            <p className="score-pct">{Math.round((score / questions.length) * 100)}%</p>
            <div className="result-btns" style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="card-btn" onClick={handleGenerate}>{t.retry}</button>
              <button className="cta-btn" onClick={handleReset}>{t.newQuiz}</button>
              <button className="back-btn" onClick={() => navigate('/home')}>{t.home}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}