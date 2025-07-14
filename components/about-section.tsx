"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Kids learning at Little Scholars"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">🎨</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-xl">📚</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Little Scholars</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Little Scholars Preschool in Navi Mumbai is a nurturing environment where learning meets creativity. We
              offer a vibrant, activity-based curriculum to help children explore and grow with joy and confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-yellow-600">500+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600">Expert Teachers</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-green-600">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-purple-600">100%</div>
                <div className="text-gray-600">Parent Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
