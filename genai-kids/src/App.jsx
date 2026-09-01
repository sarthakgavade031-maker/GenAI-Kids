import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AgePage from './pages/AgePage'
import LessonPage from './pages/LessonPage'
import LessonContentPage from './pages/LessonContentPage'
import TutorPage from './pages/TutorPage'
import QuizPage from './pages/QuizPage'
import BadgesPage from './pages/BadgesPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash → Login → Home flow */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Main Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/lessons/:age" element={<LessonPage />} />
        <Route path="/learn/:age/:topic" element={<LessonContentPage />} />
        <Route path="/tutor/:age/:topic" element={<TutorPage />} />
        <Route path="/quiz/:age/:topic" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App