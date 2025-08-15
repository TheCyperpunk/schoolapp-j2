// Firebase configuration and functions
// Note: In a real application, you would set up Firebase properly with environment variables

interface EnquiryData {
  studentName: string
  parentName: string
  location: string
  phone: string
  class: string
  excited: string
}

// Updated Firebase functions for demonstration
export const submitEnquiry = async (data: EnquiryData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Create enquiry object with ID and timestamp
  const enquiry = {
    id: Date.now().toString(),
    ...data,
    dateSubmitted: new Date().toISOString(),
  }

  // Get existing enquiries from localStorage
  const existingEnquiries = localStorage.getItem("enquiries")
  const enquiries = existingEnquiries ? JSON.parse(existingEnquiries) : []

  // Add new enquiry
  enquiries.push(enquiry)

  // Store back to localStorage
  localStorage.setItem("enquiries", JSON.stringify(enquiries))

  console.log("Enquiry submitted:", enquiry)
  return { success: true }
}

// Mock authentication functions
export const signInWithEmail = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Sign in attempt:", email)
  return { success: true, user: { email, uid: "mock-uid" } }
}

export const signUpWithEmail = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("Sign up attempt:", email)
  return { success: true, user: { email, uid: "mock-uid" } }
}

export const signOut = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log("User signed out")
  return { success: true }
}
