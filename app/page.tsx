"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import EventsSection from "@/components/events-section"
import TestimonialSection from "@/components/testimonial-section"
import PhotoGallery from "@/components/photo-gallery"
import MapSection from "@/components/map-section"
import Footer from "@/components/footer"
import FloatingButtons from "@/components/floating-buttons"
import EnquiryModal from "@/components/enquiry-modal"

export default function Home() {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <TestimonialSection />
        <PhotoGallery />
        <MapSection />
      </main>
      <Footer />
      <FloatingButtons onEnquiryClick={() => setShowEnquiryModal(true)} />

      <AnimatePresence>
        {showEnquiryModal && <EnquiryModal onClose={() => setShowEnquiryModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
