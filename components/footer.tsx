"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const quickLinks = [
    { name: "FAQ", href: "#faq" },
    { name: "Admissions", href: "#admissions" },
    { name: "Calendar", href: "#calendar" },
    { name: "Careers", href: "#careers" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Little Scholars</h3>
                <p className="text-sm text-gray-300">Preschool, Navi Mumbai</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Nurturing young minds with creativity, care, and confidence. Building the foundation for lifelong
              learning.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Education Street, Vashi, Navi Mumbai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-300 text-sm hover:text-yellow-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <a
                  href="mailto:info@littlescholars.com"
                  className="text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >
                  info@littlescholars.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="bg-gray-700 hover:bg-yellow-500 hover:text-black transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-gray-300 text-sm">
              Stay connected for updates, events, and precious moments from our school community.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 Little Scholars Preschool. All rights reserved. | Designed with ❤️ for young learners
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
