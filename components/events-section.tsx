"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const videos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Annual Day Celebration 2024",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Sports Day Highlights",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Art & Craft Workshop",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Science Exhibition",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
]

export default function EventsSection() {
  const [currentVideo, setCurrentVideo] = useState(0)

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Events & Activities</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the exciting moments and memorable events at Little Scholars
          </p>
        </motion.div>

        <div className="relative">
          {/* Video Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentVideo * 100}%)` }}
            >
              {videos.map((video, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="mx-4">
                    <CardContent className="p-0">
                      <div className="relative group cursor-pointer">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </motion.div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-xl font-semibold">{video.title}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
            onClick={prevVideo}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
            onClick={nextVideo}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Video Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentVideo ? "bg-yellow-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentVideo(index)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            View All Latest Videos
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
