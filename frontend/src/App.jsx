import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/NavBar/Header.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignUp.jsx';
import { Toaster } from 'react-hot-toast';
import ResumeDashBoard from './pages/Dashboard/ResumeDashBoard.jsx';
import EditResume from './pages/ResumeUpdate/EditResume.jsx';
import QuestionDashboard from './pages/Dashboard/QuestionDashboard.jsx';
import InterviewQuestion from './pages/QuestionUpdate/InterviewQuestion.jsx';
import ResumeAnalyserForm from './pages/Forms/ResumeAnalyer/ResumeAnalyserForm.jsx';
import ResumeScore from './pages/ResumeScore.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resume-dashboard" element={<ResumeDashBoard />} />
          <Route path="/question-dashboard" element={<QuestionDashboard />} />
          <Route path="/resume/:id" element={<EditResume />} />
            <Route path="/inteview-question/:sessionId" element={<InterviewQuestion />} />
            <Route path="/resume-analyser" element={<ResumeAnalyserForm />} />
            <Route path="/resume-analyser-feedback" element={<ResumeScore/>} />
        </Routes>
      </div>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
