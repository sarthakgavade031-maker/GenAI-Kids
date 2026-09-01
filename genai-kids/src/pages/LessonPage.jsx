import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../LangContext'
import { useProgress } from '../ProgressContext'

const allLessonsData = {
  hi: {
    '6-9': [
      { id: 1, emoji: '🤖', title: 'AI क्या है?', desc: 'AI कैसे सोचता है ये सीखो', duration: '10 min', level: 'Beginner', topic: 'ai-intro' },
      { id: 2, emoji: '🎮', title: 'Block Coding Game', desc: 'खेलते खेलते code बनाओ', duration: '15 min', level: 'Beginner', topic: 'block-coding' },
      { id: 3, emoji: '🦾', title: 'Robot कैसे बनता है?', desc: 'Robots की दुनिया explore करो', duration: '12 min', level: 'Beginner', topic: 'robotics-intro' },
      { id: 4, emoji: '🎯', title: 'AI in Games', desc: 'Games में AI कैसे काम करता है', duration: '10 min', level: 'Beginner', topic: 'ai-games' },
      { id: 5, emoji: '📱', title: 'Smart Devices', desc: 'Smart devices में AI का जादू', duration: '10 min', level: 'Beginner', topic: 'smart-devices' },
      { id: 6, emoji: '🎨', title: 'AI and Art', desc: 'AI से paintings और drawings बनाओ', duration: '15 min', level: 'Beginner', topic: 'ai-art' },
      { id: 7, emoji: '📊', title: 'What is Data?', desc: 'Data क्या है और AI इसे कैसे use करता है', duration: '10 min', level: 'Beginner', topic: 'what-is-data' },
      { id: 8, emoji: '🚀', title: 'Future Jobs', desc: 'AI से कौन से नए jobs आएंगे', duration: '10 min', level: 'Beginner', topic: 'future-jobs' },
      { id: 9, emoji: '🛡️', title: 'AI Safety', desc: 'AI को safe कैसे रखें', duration: '10 min', level: 'Beginner', topic: 'ai-safety' },
      { id: 10, emoji: '✍️', title: 'My First AI Story', desc: 'AI की मदद से story लिखो', duration: '15 min', level: 'Beginner', topic: 'ai-story' },
    ],
    '10-13': [
      { id: 1, emoji: '🐍', title: 'Python सीखो', desc: 'Python programming basics', duration: '20 min', level: 'Intermediate', topic: 'python-basics' },
      { id: 2, emoji: '🧠', title: 'Machine Learning', desc: 'AI कैसे सीखता है समझो', duration: '25 min', level: 'Intermediate', topic: 'ml-intro' },
      { id: 3, emoji: '🛠️', title: 'Mini AI Project', desc: 'अपना AI project बनाओ', duration: '30 min', level: 'Intermediate', topic: 'mini-project' },
      { id: 4, emoji: '📈', title: 'Data Science', desc: 'Data से insights निकालो', duration: '25 min', level: 'Intermediate', topic: 'data-science' },
      { id: 5, emoji: '👁️', title: 'Computer Vision', desc: 'AI को देखना सिखाओ', duration: '25 min', level: 'Intermediate', topic: 'computer-vision' },
      { id: 6, emoji: '🗣️', title: 'Natural Language Processing', desc: 'AI को भाषा सिखाओ', duration: '25 min', level: 'Intermediate', topic: 'nlp-basics' },
      { id: 7, emoji: '⚖️', title: 'AI Ethics', desc: 'AI को सही और गलत सिखाओ', duration: '20 min', level: 'Intermediate', topic: 'ai-ethics' },
      { id: 8, emoji: '🤖', title: 'Build a Chatbot', desc: 'अपना chatbot बनाओ', duration: '30 min', level: 'Intermediate', topic: 'build-chatbot' },
      { id: 9, emoji: '🕷️', title: 'Web Scraping', desc: 'Internet से data collect करो', duration: '25 min', level: 'Intermediate', topic: 'web-scraping' },
      { id: 10, emoji: '🎵', title: 'AI and Music', desc: 'AI से music बनाओ', duration: '20 min', level: 'Intermediate', topic: 'ai-music' },
    ],
    '14-16': [
      { id: 1, emoji: '🔬', title: 'Neural Networks', desc: 'Deep Learning समझो', duration: '30 min', level: 'Advanced', topic: 'neural-nets' },
      { id: 2, emoji: '📊', title: 'Real ML Project', desc: 'Live data पर ML model बनाओ', duration: '45 min', level: 'Advanced', topic: 'ml-project' },
      { id: 3, emoji: '⚙️', title: 'AI Tools Master', desc: 'Professional AI tools use करो', duration: '35 min', level: 'Advanced', topic: 'ai-tools' },
      { id: 4, emoji: '🧠', title: 'Deep Learning', desc: 'Advanced neural networks सीखो', duration: '40 min', level: 'Advanced', topic: 'deep-learning' },
      { id: 5, emoji: '👁️', title: 'Computer Vision Advanced', desc: 'Images और videos analyze करो', duration: '40 min', level: 'Advanced', topic: 'computer-vision-adv' },
      { id: 6, emoji: '📝', title: 'NLP & Transformers', desc: 'GPT जैसे models समझो', duration: '45 min', level: 'Advanced', topic: 'nlp-transformers' },
      { id: 7, emoji: '🎮', title: 'Reinforcement Learning', desc: 'AI को खेलना सिखाओ', duration: '40 min', level: 'Advanced', topic: 'reinforcement-learning' },
      { id: 8, emoji: '🎨', title: 'Generative AI', desc: 'DALL-E और Stable Diffusion सीखो', duration: '35 min', level: 'Advanced', topic: 'generative-ai' },
      { id: 9, emoji: '🔒', title: 'AI Security', desc: 'AI attacks और defense सीखो', duration: '35 min', level: 'Advanced', topic: 'ai-security' },
      { id: 10, emoji: '💼', title: 'Build AI Startup', desc: 'AI से अपना business शुरू करो', duration: '45 min', level: 'Advanced', topic: 'ai-startup' },
    ],
  },
  mr: {
    '6-9': [
      { id: 1, emoji: '🤖', title: 'AI म्हणजे काय?', desc: 'AI कसा विचार करतो ते शिका', duration: '10 min', level: 'Beginner', topic: 'ai-intro' },
      { id: 2, emoji: '🎮', title: 'Block Coding Game', desc: 'खेळत खेळत code बनवा', duration: '15 min', level: 'Beginner', topic: 'block-coding' },
      { id: 3, emoji: '🦾', title: 'Robot कसा बनतो?', desc: 'Robots ची दुनिया explore करा', duration: '12 min', level: 'Beginner', topic: 'robotics-intro' },
      { id: 4, emoji: '🎯', title: 'AI in Games', desc: 'Games मध्ये AI कसं काम करतं', duration: '10 min', level: 'Beginner', topic: 'ai-games' },
      { id: 5, emoji: '📱', title: 'Smart Devices', desc: 'Smart devices मध्ये AI चा जादू', duration: '10 min', level: 'Beginner', topic: 'smart-devices' },
      { id: 6, emoji: '🎨', title: 'AI and Art', desc: 'AI ने paintings आणि drawings बनवा', duration: '15 min', level: 'Beginner', topic: 'ai-art' },
      { id: 7, emoji: '📊', title: 'Data म्हणजे काय?', desc: 'Data काय आहे आणि AI कसं वापरतो', duration: '10 min', level: 'Beginner', topic: 'what-is-data' },
      { id: 8, emoji: '🚀', title: 'Future Jobs', desc: 'AI मुळे कोणते नवीन jobs येतील', duration: '10 min', level: 'Beginner', topic: 'future-jobs' },
      { id: 9, emoji: '🛡️', title: 'AI Safety', desc: 'AI ला safe कसं ठेवायचं', duration: '10 min', level: 'Beginner', topic: 'ai-safety' },
      { id: 10, emoji: '✍️', title: 'माझी पहिली AI Story', desc: 'AI च्या मदतीने story लिहा', duration: '15 min', level: 'Beginner', topic: 'ai-story' },
    ],
    '10-13': [
      { id: 1, emoji: '🐍', title: 'Python शिका', desc: 'Python programming basics', duration: '20 min', level: 'Intermediate', topic: 'python-basics' },
      { id: 2, emoji: '🧠', title: 'Machine Learning', desc: 'AI कसा शिकतो ते समजा', duration: '25 min', level: 'Intermediate', topic: 'ml-intro' },
      { id: 3, emoji: '🛠️', title: 'Mini AI Project', desc: 'स्वतःचा AI project बनवा', duration: '30 min', level: 'Intermediate', topic: 'mini-project' },
      { id: 4, emoji: '📈', title: 'Data Science', desc: 'Data मधून insights काढा', duration: '25 min', level: 'Intermediate', topic: 'data-science' },
      { id: 5, emoji: '👁️', title: 'Computer Vision', desc: 'AI ला बघायला शिकवा', duration: '25 min', level: 'Intermediate', topic: 'computer-vision' },
      { id: 6, emoji: '🗣️', title: 'Natural Language Processing', desc: 'AI ला भाषा शिकवा', duration: '25 min', level: 'Intermediate', topic: 'nlp-basics' },
      { id: 7, emoji: '⚖️', title: 'AI Ethics', desc: 'AI ला बरोबर-चूक शिकवा', duration: '20 min', level: 'Intermediate', topic: 'ai-ethics' },
      { id: 8, emoji: '🤖', title: 'Chatbot बनवा', desc: 'स्वतःचा chatbot बनवा', duration: '30 min', level: 'Intermediate', topic: 'build-chatbot' },
      { id: 9, emoji: '🕷️', title: 'Web Scraping', desc: 'Internet मधून data collect करा', duration: '25 min', level: 'Intermediate', topic: 'web-scraping' },
      { id: 10, emoji: '🎵', title: 'AI and Music', desc: 'AI ने music बनवा', duration: '20 min', level: 'Intermediate', topic: 'ai-music' },
    ],
    '14-16': [
      { id: 1, emoji: '🔬', title: 'Neural Networks', desc: 'Deep Learning समजा', duration: '30 min', level: 'Advanced', topic: 'neural-nets' },
      { id: 2, emoji: '📊', title: 'Real ML Project', desc: 'Live data वर ML model बनवा', duration: '45 min', level: 'Advanced', topic: 'ml-project' },
      { id: 3, emoji: '⚙️', title: 'AI Tools Master', desc: 'Professional AI tools वापरा', duration: '35 min', level: 'Advanced', topic: 'ai-tools' },
      { id: 4, emoji: '🧠', title: 'Deep Learning', desc: 'Advanced neural networks शिका', duration: '40 min', level: 'Advanced', topic: 'deep-learning' },
      { id: 5, emoji: '👁️', title: 'Computer Vision Advanced', desc: 'Images आणि videos analyze करा', duration: '40 min', level: 'Advanced', topic: 'computer-vision-adv' },
      { id: 6, emoji: '📝', title: 'NLP & Transformers', desc: 'GPT सारखे models समजा', duration: '45 min', level: 'Advanced', topic: 'nlp-transformers' },
      { id: 7, emoji: '🎮', title: 'Reinforcement Learning', desc: 'AI ला खेळायला शिकवा', duration: '40 min', level: 'Advanced', topic: 'reinforcement-learning' },
      { id: 8, emoji: '🎨', title: 'Generative AI', desc: 'DALL-E आणि Stable Diffusion शिका', duration: '35 min', level: 'Advanced', topic: 'generative-ai' },
      { id: 9, emoji: '🔒', title: 'AI Security', desc: 'AI attacks आणि defense शिका', duration: '35 min', level: 'Advanced', topic: 'ai-security' },
      { id: 10, emoji: '💼', title: 'AI Startup बनवा', desc: 'AI ने स्वतःचा business सुरू करा', duration: '45 min', level: 'Advanced', topic: 'ai-startup' },
    ],
  },
  en: {
    '6-9': [
      { id: 1, emoji: '🤖', title: 'What is AI?', desc: 'Learn how AI thinks', duration: '10 min', level: 'Beginner', topic: 'ai-intro' },
      { id: 2, emoji: '🎮', title: 'Block Coding Game', desc: 'Build code while playing', duration: '15 min', level: 'Beginner', topic: 'block-coding' },
      { id: 3, emoji: '🦾', title: 'How Robots Work?', desc: 'Explore the world of robots', duration: '12 min', level: 'Beginner', topic: 'robotics-intro' },
      { id: 4, emoji: '🎯', title: 'AI in Games', desc: 'How AI works in video games', duration: '10 min', level: 'Beginner', topic: 'ai-games' },
      { id: 5, emoji: '📱', title: 'Smart Devices', desc: 'The magic of AI in smart devices', duration: '10 min', level: 'Beginner', topic: 'smart-devices' },
      { id: 6, emoji: '🎨', title: 'AI and Art', desc: 'Create paintings with AI', duration: '15 min', level: 'Beginner', topic: 'ai-art' },
      { id: 7, emoji: '📊', title: 'What is Data?', desc: 'What data is and how AI uses it', duration: '10 min', level: 'Beginner', topic: 'what-is-data' },
      { id: 8, emoji: '🚀', title: 'Future Jobs', desc: 'What new jobs AI will create', duration: '10 min', level: 'Beginner', topic: 'future-jobs' },
      { id: 9, emoji: '🛡️', title: 'AI Safety', desc: 'How to keep AI safe', duration: '10 min', level: 'Beginner', topic: 'ai-safety' },
      { id: 10, emoji: '✍️', title: 'My First AI Story', desc: 'Write a story with AI help', duration: '15 min', level: 'Beginner', topic: 'ai-story' },
    ],
    '10-13': [
      { id: 1, emoji: '🐍', title: 'Learn Python', desc: 'Python programming basics', duration: '20 min', level: 'Intermediate', topic: 'python-basics' },
      { id: 2, emoji: '🧠', title: 'Machine Learning', desc: 'Understand how AI learns', duration: '25 min', level: 'Intermediate', topic: 'ml-intro' },
      { id: 3, emoji: '🛠️', title: 'Mini AI Project', desc: 'Build your own AI project', duration: '30 min', level: 'Intermediate', topic: 'mini-project' },
      { id: 4, emoji: '📈', title: 'Data Science', desc: 'Extract insights from data', duration: '25 min', level: 'Intermediate', topic: 'data-science' },
      { id: 5, emoji: '👁️', title: 'Computer Vision', desc: 'Teach AI to see', duration: '25 min', level: 'Intermediate', topic: 'computer-vision' },
      { id: 6, emoji: '🗣️', title: 'Natural Language Processing', desc: 'Teach AI to understand language', duration: '25 min', level: 'Intermediate', topic: 'nlp-basics' },
      { id: 7, emoji: '⚖️', title: 'AI Ethics', desc: 'Teach AI right from wrong', duration: '20 min', level: 'Intermediate', topic: 'ai-ethics' },
      { id: 8, emoji: '🤖', title: 'Build a Chatbot', desc: 'Build your own chatbot', duration: '30 min', level: 'Intermediate', topic: 'build-chatbot' },
      { id: 9, emoji: '🕷️', title: 'Web Scraping', desc: 'Collect data from internet', duration: '25 min', level: 'Intermediate', topic: 'web-scraping' },
      { id: 10, emoji: '🎵', title: 'AI and Music', desc: 'Create music with AI', duration: '20 min', level: 'Intermediate', topic: 'ai-music' },
    ],
    '14-16': [
      { id: 1, emoji: '🔬', title: 'Neural Networks', desc: 'Understand Deep Learning', duration: '30 min', level: 'Advanced', topic: 'neural-nets' },
      { id: 2, emoji: '📊', title: 'Real ML Project', desc: 'Build ML model on live data', duration: '45 min', level: 'Advanced', topic: 'ml-project' },
      { id: 3, emoji: '⚙️', title: 'AI Tools Master', desc: 'Use professional AI tools', duration: '35 min', level: 'Advanced', topic: 'ai-tools' },
      { id: 4, emoji: '🧠', title: 'Deep Learning', desc: 'Advanced neural networks', duration: '40 min', level: 'Advanced', topic: 'deep-learning' },
      { id: 5, emoji: '👁️', title: 'Computer Vision Advanced', desc: 'Analyze images and videos', duration: '40 min', level: 'Advanced', topic: 'computer-vision-adv' },
      { id: 6, emoji: '📝', title: 'NLP & Transformers', desc: 'Understand GPT-like models', duration: '45 min', level: 'Advanced', topic: 'nlp-transformers' },
      { id: 7, emoji: '🎮', title: 'Reinforcement Learning', desc: 'Teach AI to play games', duration: '40 min', level: 'Advanced', topic: 'reinforcement-learning' },
      { id: 8, emoji: '🎨', title: 'Generative AI', desc: 'Learn DALL-E & Stable Diffusion', duration: '35 min', level: 'Advanced', topic: 'generative-ai' },
      { id: 9, emoji: '🔒', title: 'AI Security', desc: 'Learn AI attacks and defense', duration: '35 min', level: 'Advanced', topic: 'ai-security' },
      { id: 10, emoji: '💼', title: 'Build AI Startup', desc: 'Start your own AI business', duration: '45 min', level: 'Advanced', topic: 'ai-startup' },
    ],
  }
}

const labels = {
  hi: { title: 'आपके Lessons 📚', sub: 'एक-एक lesson complete करो! 🏆', back: '← वापस', learnBtn: 'सीखो →', progress: 'lessons complete', allDone: '🎉 सभी lessons complete!' },
  mr: { title: 'तुमचे Lessons 📚', sub: 'एक-एक lesson complete करा! 🏆', back: '← मागे जा', learnBtn: 'शिका →', progress: 'lessons complete', allDone: '🎉 सगळे lessons complete!' },
  en: { title: 'Your Lessons 📚', sub: 'Complete lessons one by one! 🏆', back: '← Go Back', learnBtn: 'Learn →', progress: 'lessons complete', allDone: '🎉 All lessons complete!' },
}

const ageLabelMap = {
  hi: { '6-9': '🌱 6-9 साल', '10-13': '⚡ 10-13 साल', '14-16': '🚀 14-16 साल' },
  mr: { '6-9': '🌱 6-9 वर्षे', '10-13': '⚡ 10-13 वर्षे', '14-16': '🚀 14-16 वर्षे' },
  en: { '6-9': '🌱 6-9 Years', '10-13': '⚡ 10-13 Years', '14-16': '🚀 14-16 Years' },
}

export default function LessonPage() {
  const { age } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const { isComplete, getAgeProgress } = useProgress()

  const lessons = allLessonsData[lang]?.[age] || []
  const lb = labels[lang]
  const ageLabel = ageLabelMap[lang]?.[age] || age
  const topics = lessons.map(l => l.topic)
  const { done, total, pct } = getAgeProgress(age, topics)

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" style={{cursor:'pointer'}} onClick={() => navigate('/home')}>🧠 GenAI Kids</div>
        <div style={{color:'#a78bfa', fontWeight:'700'}}>{ageLabel}</div>
        <button className="back-btn" onClick={() => navigate('/age')}>{lb.back}</button>
      </nav>

      <section className="section" style={{paddingTop:'60px', maxWidth:'800px'}}>
        <h1 className="section-title" style={{fontSize:'2rem', marginBottom:'8px'}}>{lb.title}</h1>
        <p style={{textAlign:'center', color:'#94a3b8', marginBottom:'40px'}}>{lb.sub}</p>

        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          {lessons.map((lesson, index) => {
            const completed = isComplete(age, lesson.topic)
            return (
              <div
                key={lesson.id}
                className={`lesson-card ${completed ? 'done' : ''}`}
                onClick={() => navigate(`/learn/${age}/${lesson.topic}`)}
              >
                <div className="lesson-num">{completed ? '✅' : index + 1}</div>
                <div className="lesson-emoji">{lesson.emoji}</div>
                <div className="lesson-info">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.desc}</p>
                  <div className="lesson-meta">
                    <span>⏱️ {lesson.duration}</span>
                    <span className={`badge-level ${lesson.level.toLowerCase()}`}>{lesson.level}</span>
                    {completed && <span style={{color:'#34d399', fontSize:'0.8rem', fontWeight:'700'}}>✅ Complete</span>}
                  </div>
                </div>
                <button className="lesson-btn">{completed ? '🔄' : lb.learnBtn}</button>
              </div>
            )
          })}
        </div>

        <div className="progress-bar-section">
          <p style={{color:'#94a3b8', marginBottom:'10px'}}>Progress</p>
          <div className="progress-track">
            <div className="progress-fill" style={{width:`${pct}%`}}></div>
          </div>
          <p style={{color: pct === 100 ? '#34d399' : '#a78bfa', fontSize:'0.9rem', marginTop:'8px', fontWeight: pct === 100 ? '700' : '400'}}>
            {pct === 100 ? lb.allDone : `${done} / ${total} ${lb.progress} — ${pct}%`}
          </p>
        </div>
      </section>
    </div>
  )
}