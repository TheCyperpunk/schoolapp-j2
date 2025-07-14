"use client"

import { motion } from "framer-motion"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingButtonsProps {
  onEnquiryClick: () => void
}

export default function FloatingButtons({ onEnquiryClick }: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          asChild
        >
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <MessageCircle className="w-6 h-6" />
          </a>
        </Button>
      </motion.div>

      {/* Enquire Now Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          onClick={onEnquiryClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full w-14 h-14 shadow-lg"
          aria-label="Enquire Now"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
