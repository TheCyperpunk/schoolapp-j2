import { createClient } from "@/utils/supabase/client"

// Database types
export interface Enquiry {
  id: string
  student_name: string
  parent_name: string
  location: string
  phone_number: string
  class: string
  excitement?: string
  date_submitted: string
}

// Get Supabase client
export const getSupabaseClient = () => createClient()

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error)
    throw error
  }

  return data
}

export const signOut = async () => {
  const supabase = getSupabaseClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Logout error:", error)
    throw error
  }
}

export const getCurrentSession = async () => {
  const supabase = getSupabaseClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Session error:", error)
    throw error
  }

  return session
}

export const getCurrentUser = async () => {
  const supabase = getSupabaseClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error("User error:", error)
    throw error
  }

  return user
}

// Database functions
export const submitEnquiry = async (formData: {
  studentName: string
  parentName: string
  location: string
  phone: string
  class: string
  excited: string
}) => {
  try {
    const supabase = getSupabaseClient()

    // Validate required fields
    if (!formData.studentName || !formData.parentName || !formData.location || !formData.phone || !formData.class) {
      throw new Error("Please fill in all required fields")
    }

    const enquiryData = {
      student_name: formData.studentName.trim(),
      parent_name: formData.parentName.trim(),
      location: formData.location.trim(),
      phone_number: formData.phone.trim(),
      class: formData.class,
      excitement: formData.excited || "yes",
    }

    console.log("Submitting enquiry data:", enquiryData)

    const { data, error } = await supabase.from("enquiries").insert([enquiryData]).select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to submit enquiry: ${error.message}`)
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned from submission")
    }

    console.log("Enquiry submitted successfully:", data)
    return data
  } catch (error) {
    console.error("submitEnquiry error:", error)
    throw error
  }
}

export const getEnquiries = async () => {
  try {
    const supabase = getSupabaseClient()

    // First check if user is authenticated
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Session error:", sessionError)
      throw new Error("Authentication error")
    }

    if (!session) {
      throw new Error("User not authenticated")
    }

    console.log("Fetching enquiries for authenticated user:", session.user.email)

    const { data, error } = await supabase.from("enquiries").select("*").order("date_submitted", { ascending: false })

    if (error) {
      console.error("Fetch enquiries error:", error)
      throw new Error(`Failed to fetch enquiries: ${error.message}`)
    }

    console.log("Fetched enquiries:", data)
    return data || []
  } catch (error) {
    console.error("getEnquiries error:", error)
    throw error
  }
}

// Auth state change listener
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  const supabase = getSupabaseClient()

  return supabase.auth.onAuthStateChange(callback)
}
