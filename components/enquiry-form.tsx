"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitEnquiry } from "@/lib/supabase"

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    location: "",
    phone: "",
    class: "",
    excited: "yes", // Set default value
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess(false)

    try {
      console.log("Form data being submitted:", formData)
      await submitEnquiry(formData)
      setSuccess(true)

      // Reset form
      setFormData({
        studentName: "",
        parentName: "",
        location: "",
        phone: "",
        class: "",
        excited: "yes",
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: any) {
      console.error("Form submission error:", error)
      setError(error.message || "Error submitting enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    console.log(`Setting ${field} to:`, value)
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border-0">
      <CardHeader className="text-center pb-6 pt-8 px-8">
        <CardTitle className="text-3xl md:text-4xl font-bold text-purple-700 mb-3">Admission Enquiry</CardTitle>
        <p className="text-gray-600 text-lg">Start your child's learning journey with us!</p>
      </CardHeader>
      <CardContent className="px-4 sm:px-8 pb-8">
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

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Student Name and Parent Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)} required>
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
            <Select value={formData.excited} onValueChange={(value) => handleSelectChange("excited", value)}>
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

          {/* Debug info (remove in production) */}
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
              Debug: {JSON.stringify(formData, null, 2)}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 sm:h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-6 sm:mt-8"
            disabled={
              isSubmitting ||
              !formData.studentName ||
              !formData.parentName ||
              !formData.location ||
              !formData.phone ||
              !formData.class
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
