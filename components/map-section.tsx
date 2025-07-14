"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MapSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Visit Our Campus</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Come and explore our beautiful campus in the heart of Navi Mumbai
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2!2d73.0297!3d19.0330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzAwLjAiTiA3M8KwMDEnNDcuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Little Scholars Preschool Location"
              />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                    <p className="text-gray-600">
                      123 Education Street,
                      <br />
                      Vashi, Navi Mumbai - 400703
                      <br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+919876543210" className="hover:text-green-600 transition-colors">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@littlescholars.com" className="hover:text-yellow-600 transition-colors">
                        info@littlescholars.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">School Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 1:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
