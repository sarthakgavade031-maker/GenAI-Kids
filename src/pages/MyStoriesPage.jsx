import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLang } from '../LangContext'

const ui = {
  mr: { title: '📖 माझ्या Stories', back: '← मागे', empty: 'अजून कोणतीही story बनवली नाहीये!', makeOne: '✨ नवीन Story बनव', deleteBtn: '🗑️' },
  hi: { title: '📖 मेरी Stories', back: '← वापस', empty: 'अभी कोई story नहीं बनाई!', makeOne: '✨ नई Story बनाओ', deleteBtn: '🗑️' },
  en: { title: '📖 My Stories', back: '← Back', empty: 'No stories yet!', makeOne: '✨ Create a Story', deleteBtn: '🗑️' },
}

export default function MyStoriesPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  // @ts-ignore
  const t = ui[lang]

  const [stories, setStories] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('genai-stories') || '[]')
    } catch {
      return []
    }
  })
  const [openId, setOpenId] = useState(null)

  /** @param {string} id */
  const handleDelete = (id) => {
    // @ts-ignore
    const updated = stories.filter((s) => s.id !== id)
    setStories(updated)
    localStorage.setItem('genai-stories', JSON.stringify(updated))
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>🧠 GenAI Kids</div>
        <button className="back-btn" onClick={() => navigate(-1)}>{t.back}</button>
      </nav>

      <div className="content-container" style={{ maxWidth: '640px' }}>
        <h1 className="section-title">{t.title}</h1>

        {stories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: '#94a3b8', marginBottom: '20px' }}>{t.empty}</p>
            <button className="cta-btn" onClick={() => navigate('/story/6-9')}>{t.makeOne}</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {// @ts-ignore
              stories.map((s) => (
                <div key={s.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setOpenId(openId === s.id ? null : s.id)}>
                    <div>
                      <h3 style={{ color: '#a78bfa', fontSize: '1.05rem' }}>{s.title}</h3>
                      <p style={{ color: '#475569', fontSize: '0.78rem', marginTop: '4px' }}>
                        {s.theme} · {new Date(s.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id) }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
                      {t.deleteBtn}
                    </button>
                  </div>
                  {openId === s.id && (
                    <p style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', marginTop: '14px', lineHeight: 1.6, fontSize: '0.92rem' }}>{s.text}</p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
