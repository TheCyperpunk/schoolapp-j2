"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { submitEnquiry } from "@/lib/firebase"

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    location: "",
    phone: "",
    class: "",
    excited: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitEnquiry(formData)
      alert("Enquiry submitted successfully!")
      setFormData({
        studentName: "",
        parentName: "",
        location: "",
        phone: "",
        class: "",
        excited: "",
      })
    } catch (error) {
      alert("Error submitting enquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Admission Enquiry</CardTitle>
        <p className="text-gray-600">Join our learning family today!</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Student Name"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />
          <Input
            placeholder="Parent Name"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            required
          />
          <Input
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Select onValueChange={(value) => setFormData({ ...formData, class: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nursery">Nursery</SelectItem>
              <SelectItem value="lkg">LKG</SelectItem>
              <SelectItem value="ukg">UKG</SelectItem>
              <SelectItem value="playgroup">Playgroup</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setFormData({ ...formData, excited: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Are you excited?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, Very Excited!</SelectItem>
              <SelectItem value="no">Need More Information</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
