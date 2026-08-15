import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import Navbar from '../components/landing/Navbar'
import WorkingSection from '../components/landing/WorkingSection'
import Showcase from '../components/landing/Showcase'
import Features from '../components/landing/Features'
import FAQ from '../components/landing/FAQ'
import Footer from '../components/landing/Footer'

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WorkingSection />
      <Features />
      <Showcase />
      <FAQ />
      <Footer />
    </div>
  )
}

export default LandingPage
