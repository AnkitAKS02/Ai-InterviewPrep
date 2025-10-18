import { useState ,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuthStore } from './stores/useAuthStore.js';
import { Loader, Loader2 } from 'lucide-react';
import OnboardingForm from './pages/Forms/Onboarding/OnboardingForm.jsx';
import Community from './pages/Community.jsx';
function App() {
  const [count, setCount] = useState(0)
  const { authUser, checkAuth, isCheckingAuth,isOnboarding } = useAuthStore();

  useEffect(() => { checkAuth() }, [checkAuth]);

  const isOnboarded = isOnboarding || false;
  {console.log(authUser)}
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path= "/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
        <Route path= "/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/resume-dashboard" element={<ResumeDashBoard />} />
          <Route path="/question-dashboard" element={<QuestionDashboard />} />
          <Route path="/resume/:id" element={<EditResume />} />
            <Route path="/inteview-question/:sessionId" element={<InterviewQuestion />} />
            <Route path="/resume-analyser" element={<ResumeAnalyserForm />} />
            <Route path="/resume-analyser-feedback" element={<ResumeScore />} />
            <Route path='/community' element={isOnboarded?<Community/>:<OnboardingForm/>}/>
        </Routes>
      </div>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
