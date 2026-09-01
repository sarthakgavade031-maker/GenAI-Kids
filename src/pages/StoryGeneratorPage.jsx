import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'
import { useAuth } from '../AuthContext'

// Same model your TutorPage.jsx uses via the /api/claude proxy.
// NOTE: "claude-sonnet-4-20250514" may not be a valid current model id.
// If TutorPage.jsx is throwing errors, try "claude-sonnet-5" instead in both files.
const MODEL = 'claude-sonnet-4-20250514'

const themes = {
  mr: [
    { id: 'adventure', emoji: '🗺️', label: 'Adventure' },
    { id: 'animals', emoji: '🐾', label: 'प्राणी' },
    { id: 'space', emoji: '🚀', label: 'Space' },
    { id: 'magic', emoji: '✨', label: 'जादू' },
    { id: 'friendship', emoji: '🤝', label: 'मैत्री' },
    { id: 'superhero', emoji: '🦸', label: 'Superhero' },
  ],
  hi: [
    { id: 'adventure', emoji: '🗺️', label: 'Adventure' },
    { id: 'animals', emoji: '🐾', label: 'जानवर' },
    { id: 'space', emoji: '🚀', label: 'Space' },
    { id: 'magic', emoji: '✨', label: 'जादू' },
    { id: 'friendship', emoji: '🤝', label: 'दोस्ती' },
    { id: 'superhero', emoji: '🦸', label: 'Superhero' },
  ],
  en: [
    { id: 'adventure', emoji: '🗺️', label: 'Adventure' },
    { id: 'animals', emoji: '🐾', label: 'Animals' },
    { id: 'space', emoji: '🚀', label: 'Space' },
    { id: 'magic', emoji: '✨', label: 'Magic' },
    { id: 'friendship', emoji: '🤝', label: 'Friendship' },
    { id: 'superhero', emoji: '🦸', label: 'Superhero' },
  ],
}

const ui = {
  mr: {
    title: '📚 AI Story Generator', sub: 'तुमच्या आवडीची story AI कडून बनवा!',
    back: '← मागे जा', nameLabel: 'तुझं नाव', namePlaceholder: 'तुझं नाव टाक...',
    themeLabel: 'थीम निवडा', customLabel: 'किंवा स्वतःची कल्पना लिही (optional)',
    customPlaceholder: 'उदा. एक ड्रॅगन जो उडायला घाबरतो...',
    generateBtn: '✨ Story बनव!', generating: 'Story तयार होतेय...',
    newStoryBtn: '🔄 नवीन Story', savedMsg: '✅ Story साठवली!', myStoriesBtn: '📖 माझ्या Stories',
    errorMsg: '⚠️ काहीतरी चुकलं. परत try कर!',
  },
  hi: {
    title: '📚 AI Story Generator', sub: 'अपनी पसंद की story AI से बनवाओ!',
    back: '← वापस', nameLabel: 'तुम्हारा नाम', namePlaceholder: 'नाम लिखो...',
    themeLabel: 'थीम चुनो', customLabel: 'या अपना idea लिखो (optional)',
    customPlaceholder: 'जैसे: एक ड्रैगन जो उड़ने से डरता है...',
    generateBtn: '✨ Story बनाओ!', generating: 'Story बन रही है...',
    newStoryBtn: '🔄 नई Story', savedMsg: '✅ Story सेव हुई!', myStoriesBtn: '📖 मेरी Stories',
    errorMsg: '⚠️ कुछ गलत हुआ। फिर try करो!',
  },
  en: {
    title: '📚 AI Story Generator', sub: 'Create your own story with AI!',
    back: '← Back', nameLabel: 'Your name', namePlaceholder: 'Type your name...',
    themeLabel: 'Pick a theme', customLabel: 'Or write your own idea (optional)',
    customPlaceholder: 'e.g. A dragon who is scared of flying...',
    generateBtn: '✨ Generate Story!', generating: 'Writing your story...',
    newStoryBtn: '🔄 New Story', savedMsg: '✅ Story saved!', myStoriesBtn: '📖 My Stories',
    errorMsg: '⚠️ Something went wrong. Try again!',
  },
}

const systemPrompts = {
  '6-9': (lang) => `You are a friendly children's story writer for a ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}-speaking child aged 6-9. Write in ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}. Use very simple words, short sentences, lots of warmth, no scary or violent content. Story should be 150-250 words with a clear happy ending and a one-line moral at the end.`,
  '10-13': (lang) => `You are a children's story writer for a ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}-speaking child aged 10-13. Write in ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}. Use engaging, slightly more descriptive language. Story should be 250-400 words with a clear beginning, middle, end, and a short reflective moral.`,
  '14-16': (lang) => `You are a story writer for a ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}-speaking teenager aged 14-16. Write in ${lang === 'mr' ? 'Marathi' : lang === 'hi' ? 'Hindi' : 'English'}. Story should be 350-500 words, can have a bit more nuance and emotional depth, age-appropriate, no violence or romance beyond very mild.`,
}

function saveStoryToLocal(story) {
  try {
    const existing = JSON.parse(localStorage.getItem('genai-stories') || '[]')
    existing.unshift(story)
    localStorage.setItem('genai-stories', JSON.stringify(existing.slice(0, 50)))
  } catch (e) {
    console.error('Could not save story locally', e)
  }
}

export default function StoryGeneratorPage() {
  const navigate = useNavigate()
  const { age = '6-9' } = useParams()
  const { lang } = useLang()
  const { addXp } = useProgress()
  const { user } = useAuth()
  const t = ui[lang]

  const [childName, setChildName] = useState(user?.name?.split(' ')[0] || '')
  const [theme, setTheme] = useState(null)
  const [customIdea, setCustomIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [story, setStory] = useState(null) // { title, text }
  const [saved, setSaved] = useState(false)

  const handleGenerate = async () => {
    if (!theme && !customIdea.trim()) return
    setLoading(true)
    setError(false)
    setStory(null)
    setSaved(false)

    const themeLabel = themes[lang].find((th) => th.id === theme)?.label || ''
    const userMessage = `Write a ${themeLabel || ''} story${customIdea.trim() ? ` based on this idea: ${customIdea.trim()}` : ''} for a child named ${childName || 'the reader'}. Put a short fun title as the very first line, then a blank line, then the story.`

    try {
      const response = await fetch('/api/claude/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 700,
          system: systemPrompts[age](lang),
          messages: [{ role: 'user', content: userMessage }],
        }),
      })
      const data = await response.json()
      const raw = data?.content?.[0]?.text || ''
      const [firstLine, ...rest] = raw.split('\n').filter((l) => l.trim() !== '')
      const title = firstLine?.replace(/^#+\s*/, '') || 'My AI Story'
      const text = rest.join('\n\n')

      setStory({ title, text: text || raw })

      const record = {
        id: Date.now(),
        childName: childName || 'Student',
        age,
        theme: themeLabel || 'Custom',
        title,
        text: text || raw,
        createdAt: new Date().toISOString(),
      }
      saveStoryToLocal(record)
      setSaved(true)
      if (addXp) addXp(15)
    } catch (err) {
      console.error('Story generation failed:', err)
      setError(true)
    }
    setLoading(false)
  }

  const handleReset = () => {
    setStory(null)
    setTheme(null)
    setCustomIdea('')
    setSaved(false)
    setError(false)
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="content-container" style={{ maxWidth: '640px' }}>
        <h1 className="section-title">{t.title}</h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '32px' }}>{t.sub}</p>

        {!story && (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px' }}>
            {/* Name */}
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>{t.nameLabel}</label>
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder={t.namePlaceholder}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '1rem',
              }}
            />

            {/* Theme picker */}
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>{t.themeLabel}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {themes[lang].map((th) => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th.id)}
                  style={{
                    padding: '14px 8px', borderRadius: '14px', textAlign: 'center', cursor: 'pointer',
                    background: theme === th.id ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.04)',
                    border: theme === th.id ? '2px solid #a78bfa' : '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{th.emoji}</div>
                  <div style={{ fontSize: '0.78rem', marginTop: '4px' }}>{th.label}</div>
                </button>
              ))}
            </div>

            {/* Custom idea */}
            <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>{t.customLabel}</label>
            <textarea
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              placeholder={t.customPlaceholder}
              rows={3}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', resize: 'vertical',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.95rem',
              }}
            />

            {error && <p style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{t.errorMsg}</p>}

            <button
              className="cta-btn"
              style={{ width: '100%' }}
              disabled={loading || (!theme && !customIdea.trim())}
              onClick={handleGenerate}
            >
              {loading ? t.generating : t.generateBtn}
            </button>
          </div>
        )}

        {story && (
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '20px', padding: '28px' }}>
            <h2 style={{ color: '#a78bfa', marginBottom: '16px', fontSize: '1.4rem' }}>{story.title}</h2>
            <p style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', lineHeight: 1.7 }}>{story.text}</p>
            {saved && <p style={{ color: '#34d399', marginTop: '20px', fontSize: '0.85rem' }}>{t.savedMsg} (+15 XP)</p>}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <button className="cta-btn" onClick={handleReset}>{t.newStoryBtn}</button>
              <button className="back-btn" onClick={() => navigate('/my-stories')}>{t.myStoriesBtn}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}