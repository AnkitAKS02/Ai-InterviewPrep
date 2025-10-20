import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import CommunityHome from './pages/community/CommunityHome.jsx';
import Sidebar from './components/communityComponents/Sidebar.jsx';
import Friends from './pages/community/Friends.jsx';
import Notifications from './pages/community/Notifications.jsx';
import CommunityLayout from './pages/community/CommunityLayout .jsx';
import FindNewFriends from './pages/community/FindNewFriends.jsx';
import QuizDashboard from './pages/Dashboard/QuizDashboard.jsx';
function App() {
  const { authUser, checkAuth, isCheckingAuth, isOnboarding } = useAuthStore();

  useEffect(() => { checkAuth() }, [checkAuth]);

  const isOnboarded = isOnboarding || false;
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      {/* <Sidebar/> */}
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
            <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/resume-dashboard" element={<ResumeDashBoard />} />
            <Route path="/question-dashboard" element={<QuestionDashboard />} />
            <Route path="/resume/:id" element={<EditResume />} />
            <Route path="/inteview-question/:sessionId" element={<InterviewQuestion />} />
            <Route path="/resume-analyser" element={<ResumeAnalyserForm />} />
            <Route path="/resume-analyser-feedback" element={<ResumeScore />} />
            {/* <Route path='/community' element={isOnboarded ? <Community /> : <OnboardingForm />} /> */}
            <Route path="/community" element={<CommunityLayout />}>
              <Route index element={<CommunityHome />} /> {/*default /community*/}
              <Route path="friends" element={<Friends />} />
              <Route path="find" element={<FindNewFriends />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="quiz-dashboard" element={<QuizDashboard/>}/>

          </Routes>
        </div>
      </Router>
      <Toaster />
    </>
  )
}

export default App
