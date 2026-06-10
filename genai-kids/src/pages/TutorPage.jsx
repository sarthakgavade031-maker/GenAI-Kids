import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const topicNames = {
  'ai-intro': 'AI म्हणजे काय?',
  'block-coding': 'Block Coding',
  'robotics-intro': 'Robotics',
  'python-basics': 'Python Basics',
  'ml-intro': 'Machine Learning',
  'mini-project': 'Mini AI Project',
  'neural-nets': 'Neural Networks',
  'ml-project': 'Real ML Project',
  'ai-tools': 'AI Tools',
}

const systemPrompts = {
  '6-9': 'तू GenAI Kids चा मैत्रीपूर्ण AI Tutor आहेस. तू 6-9 वर्षांच्या मुलांशी बोलतोस. खूप simple, fun, emoji-rich Marathi वापर. उत्तर 3-4 ओळींपेक्षा जास्त नको. शेवटी एक सोपा प्रश्न विचार.',
  '10-13': 'तू GenAI Kids चा AI Tutor आहेस. तू 10-13 वर्षांच्या मुलांशी बोलतोस. Marathi मध्ये बोल, technical concepts simple examples देऊन समजाव. उत्तर 4-5 ओळी. शेवटी एक प्रश्न विचार.',
  '14-16': 'तू GenAI Kids चा AI Tutor आहेस. तू 14-16 वर्षांच्या teenagers शी बोलतोस. Marathi मध्ये बोल, technical depth दे, code examples दे. शेवटी challenge दे.',
}

export default function TutorPage() {
  const { age, topic } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `नमस्ते! 👋 मी तुमचा AI Tutor आहे!\n\nआज आपण "${topicNames[topic] || topic}" शिकणार आहोत. तुम्हाला काय जाणून घ्यायचं आहे? 😊`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (customInput) => {
    const userText = customInput || input
    if (!userText.trim() || loading) return

    const userMsg = { role: 'user', text: userText }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }))

      const response = await fetch('/api/claude/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          system: `${systemPrompts[age] || systemPrompts['10-13']} Topic: "${topicNames[topic] || topic}"`,
          messages: [...history, { role: 'user', content: userText }]
        })
      })

      const data = await response.json()
      const aiText = data?.content?.[0]?.text || 'माफ करा, पुन्हा try करा! 🙏'
      setMessages(prev => [...prev, { role: 'ai', text: aiText }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: '⚠️ API key check करा! vite.config.js मध्ये YOUR_API_KEY_HERE च्या जागी real key टाका.'
      }])
    }
    setLoading(false)
  }

  const quickQuestions = {
    '6-9': ['AI म्हणजे काय?', 'एक गोष्ट सांग', 'Fun example दे', 'Quiz दे!'],
    '10-13': ['Explain करा', 'Code example दे', 'Real world use?', 'Quiz दे!'],
    '14-16': ['Deep dive करा', 'Code लिहा', 'Best practices?', 'Challenge दे!'],
  }

  const questions = quickQuestions[age] || quickQuestions['10-13']

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" style={{cursor:'pointer'}} onClick={() => navigate('/')}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>← मागे जा</button>
      </nav>

      <div className="tutor-container">
        <div className="tutor-header">
          <div className="tutor-avatar">🤖</div>
          <div>
            <h2>AI Tutor</h2>
            <p style={{color:'#94a3b8', fontSize:'0.85rem'}}>
              {topicNames[topic] || topic} · {age} वर्षे
            </p>
          </div>
          <div className="online-dot">● Online</div>
        </div>

        <div className="quick-questions">
          {questions.map(q => (
            <button
              key={q}
              className="quick-btn"
              onClick={() => sendMessage(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              {msg.role === 'ai' && <span className="msg-avatar">🤖</span>}
              <div className="msg-bubble" style={{whiteSpace:'pre-wrap'}}>{msg.text}</div>
              {msg.role === 'user' && <span className="msg-avatar">👦</span>}
            </div>
          ))}
          {loading && (
            <div className="msg ai">
              <span className="msg-avatar">🤖</span>
              <div className="msg-bubble typing">विचार करतोय... 🤔</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="तुमचा प्रश्न विचारा... 💬"
            disabled={loading}
          />
          <button onClick={() => sendMessage()} disabled={loading}>
            {loading ? '...' : 'पाठवा 🚀'}
          </button>
        </div>
      </div>
    </div>
  )
}