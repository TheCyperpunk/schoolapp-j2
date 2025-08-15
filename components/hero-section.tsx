"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import EnquiryForm from "@/components/enquiry-form"

const heroImages = [
  {
    url: "/placeholder.svg?height=600&width=1200",
    title: "Creative Learning Environment",
    subtitle: "Where imagination meets education",
  },
  {
    url: "/placeholder.svg?height=600&width=1200",
    title: "Play-Based Learning",
    subtitle: "Learning through fun and exploration",
  },
  {
    url: "/placeholder.svg?height=600&width=1200",
    title: "Nurturing Growth",
    subtitle: "Building confident young minds",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section id="home" className="relative min-h-screen lg:h-screen overflow-hidden mt-16">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentSlide].url || "/placeholder.svg"}
              alt={heroImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center min-h-[calc(100vh-8rem)]">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white"
            >
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {heroImages[currentSlide].title}
              </motion.h1>
              <motion.p
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl mb-8"
              >
                {heroImages[currentSlide].subtitle}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Discover Our Programs
                </Button>
              </motion.div>
            </motion.div>

            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:justify-self-end w-full lg:max-w-none"
            >
              <div className="lg:sticky lg:top-24">
                <EnquiryForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-yellow-500" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
