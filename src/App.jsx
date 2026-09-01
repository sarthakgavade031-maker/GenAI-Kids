import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen'
import OnboardingPage from './pages/OnboardingPage'
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
import CertificatePage from './pages/CertificatePage'
import HeartsRefillPage from './pages/HeartsRefillPage'
import StoryGeneratorPage from './pages/StoryGeneratorPage'
import MyStoriesPage from './pages/MyStoriesPage'
import AIQuizGeneratorPage from './pages/AIQuizGeneratorPage'
import ParentDashboardPage from './pages/ParentDashboardPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/age" element={<AgePage />} />
        <Route path="/lessons/:age" element={<LessonPage />} />
        <Route path="/learn/:age/:topic" element={<LessonContentPage />} />
        <Route path="/tutor/:age/:topic" element={<TutorPage />} />
        <Route path="/quiz/:age/:topic" element={<QuizPage />} />
        <Route path="/badges" element={<BadgesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
        <Route path="/certificate/:age" element={<CertificatePage />} />
        <Route path="/hearts" element={<HeartsRefillPage />} />
        {/* नवीन routes */}
        <Route path="/story/:age" element={<StoryGeneratorPage />} />
        <Route path="/my-stories" element={<MyStoriesPage />} />
        <Route path="/ai-quiz/:age" element={<AIQuizGeneratorPage />} />
        <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
