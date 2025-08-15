"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LogOut, Search, Download, Eye, Calendar, Users, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getEnquiries, signOut, getCurrentSession, onAuthStateChange, type Enquiry } from "@/lib/supabase"

export default function EnquiryListPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState("")
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        console.log("Checking authentication...")
        const session = await getCurrentSession()
        console.log("Session:", session)

        if (!session) {
          console.log("No session found, redirecting to login")
          router.push("/login")
          return
        }

        console.log("User authenticated:", session.user.email)
        setAuthChecked(true)
        await loadEnquiries()
      } catch (error) {
        console.error("Auth check error:", error)
        setError("Authentication failed. Please login again.")
        router.push("/login")
      }
    }

    checkAuthAndLoadData()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session)
      if (event === "SIGNED_OUT" || !session) {
        router.push("/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  useEffect(() => {
    // Filter enquiries based on search term
    if (searchTerm) {
      const filtered = enquiries.filter(
        (enquiry) =>
          enquiry.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          enquiry.phone_number.includes(searchTerm) ||
          enquiry.class.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredEnquiries(filtered)
    } else {
      setFilteredEnquiries(enquiries)
    }
  }, [searchTerm, enquiries])

  const loadEnquiries = async () => {
    try {
      setError("")
      console.log("Loading enquiries...")
      const data = await getEnquiries()
      console.log("Loaded enquiries:", data)
      setEnquiries(data || [])
      setFilteredEnquiries(data || [])
    } catch (error: any) {
      console.error("Load enquiries error:", error)
      setError(`Failed to load enquiries: ${error.message}`)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadEnquiries()
  }

  const handleLogout = async () => {
    try {
      await signOut()
      // Navigation will be handled by the auth state change listener
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const exportToCSV = () => {
    const headers = ["Student Name", "Parent Name", "Location", "Phone", "Class", "Excitement", "Date Submitted"]
    const csvContent = [
      headers.join(","),
      ...filteredEnquiries.map((enquiry) =>
        [
          enquiry.student_name,
          enquiry.parent_name,
          enquiry.location,
          enquiry.phone_number,
          enquiry.class,
          enquiry.excitement || "",
          new Date(enquiry.date_submitted).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "enquiries.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getExcitementBadge = (excited?: string) => {
    if (!excited) return <Badge variant="secondary">Not specified</Badge>

    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      yes: "default",
      "very-excited": "default",
      "need-info": "secondary",
    }

    return (
      <Badge variant={variants[excited] || "secondary"} className="capitalize">
        {excited === "yes" ? "Yes" : excited === "very-excited" ? "Very Excited" : "Need Info"}
      </Badge>
    )
  }

  if (isLoading && !authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Little Scholars Admin</h1>
                <p className="text-sm text-gray-600">Enquiry Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{enquiries.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {enquiries.filter((e) => new Date(e.date_submitted).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Excited Students</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {enquiries.filter((e) => e.excitement === "yes" || e.excitement === "very-excited").length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                Enquiry List ({filteredEnquiries.length})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search enquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button onClick={exportToCSV} variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enquiries Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading enquiries...</p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "No enquiries have been submitted yet"}
                </p>
                <Button onClick={handleRefresh} variant="outline" className="mt-4 bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parent Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Excitement
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEnquiries.map((enquiry, index) => (
                      <motion.tr
                        key={enquiry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{enquiry.student_name}</div>
                            <div className="text-sm text-gray-500">{enquiry.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{enquiry.parent_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{enquiry.phone_number}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="capitalize">
                            {enquiry.class}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getExcitementBadge(enquiry.excitement)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(enquiry.date_submitted)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
