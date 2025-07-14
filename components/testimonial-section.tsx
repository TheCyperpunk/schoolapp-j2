"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    parentName: "Priya Sharma",
    childName: "Aarav",
    class: "UKG",
    rating: 5,
    quote:
      "Little Scholars has been amazing for Aarav's development. The teachers are so caring and the activities are perfectly designed for young minds.",
  },
  {
    id: 2,
    parentName: "Rajesh Kumar",
    childName: "Ananya",
    class: "LKG",
    rating: 5,
    quote:
      "The creative approach to learning at Little Scholars has made Ananya excited about going to school every day. Highly recommended!",
  },
  {
    id: 3,
    parentName: "Sneha Patel",
    childName: "Arjun",
    class: "Nursery",
    rating: 5,
    quote:
      "Excellent infrastructure and wonderful teachers. Arjun has grown so much in confidence since joining Little Scholars.",
  },
  {
    id: 4,
    parentName: "Amit Joshi",
    childName: "Kavya",
    class: "UKG",
    rating: 5,
    quote:
      "The holistic development approach and individual attention given to each child makes Little Scholars stand out from other preschools.",
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What Parents Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our happy parents about their children's journey at Little Scholars
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  {/* Rating Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-gray-700 mb-6 italic leading-relaxed"
                  >
                    "{testimonial.quote}"
                  </motion.p>

                  {/* Parent Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.parentName}</h4>
                    <p className="text-sm text-gray-600">
                      Parent of {testimonial.childName} ({testimonial.class})
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-10 left-10 w-20 h-20 text-yellow-200 opacity-20"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-10 right-10 w-16 h-16 text-pink-200 opacity-20"
          >
            💝
          </motion.div>
        </div>
      </div>
    </section>
  )
}
