"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitEnquiry } from "@/lib/supabase"

interface EnquiryModalProps {
  onClose: () => void
}

export default function EnquiryModal({ onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    location: "",
    phone: "",
    class: "",
    excited: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await submitEnquiry(formData)
      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error: any) {
      setError(error.message || "Error submitting enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl my-8"
      >
        <Card className="w-full bg-white shadow-2xl rounded-3xl border-0">
          <CardHeader className="text-center pb-6 pt-8 px-8 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 hover:bg-gray-100 rounded-full"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
            <CardTitle className="text-3xl md:text-4xl font-bold text-purple-700 mb-3">Admission Enquiry</CardTitle>
            <p className="text-gray-600 text-lg">Start your child's learning journey with us!</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  Enquiry submitted successfully! We'll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Name and Parent Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter student's name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                    className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Parent Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter parent's name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    required
                    className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              {/* Location - Full Width */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Phone Number and Class Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter phone number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={(value) => setFormData({ ...formData, class: value })}>
                    <SelectTrigger className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nursery">Nursery</SelectItem>
                      <SelectItem value="lkg">LKG</SelectItem>
                      <SelectItem value="ukg">UKG</SelectItem>
                      <SelectItem value="playgroup">Playgroup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Excited Question - Full Width */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Are you excited to join Little Scholars?</label>
                <Select onValueChange={(value) => setFormData({ ...formData, excited: value })}>
                  <SelectTrigger className="h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Yes, absolutely!" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, absolutely!</SelectItem>
                    <SelectItem value="very-excited">Very excited!</SelectItem>
                    <SelectItem value="need-info">Need more information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-8"
                disabled={isSubmitting || success}
              >
                {success ? "Submitted Successfully!" : isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
