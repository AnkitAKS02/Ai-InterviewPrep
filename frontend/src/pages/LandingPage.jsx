import React from 'react'

import HeroSection from '../components/LandingPage/HeroSection.jsx'
import SocialProofSection from '../components/LandingPage/SocialProofSection.jsx'
import FeaturesSection from '../components/LandingPage/featureSection.jsx'
import TestimonialsSection from '../components/LandingPage/TestimonialsSection.jsx'


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 ">
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  )
}

export default LandingPage



