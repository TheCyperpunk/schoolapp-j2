import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Little Scholars Preschool - Navi Mumbai",
  description:
    "Nurturing young minds with creativity, care, and confidence. Building the foundation for lifelong learning at Little Scholars Preschool in Navi Mumbai.",
  keywords: "preschool, kindergarten, early childhood education, Navi Mumbai, Little Scholars",
  authors: [{ name: "Little Scholars Preschool" }],
  openGraph: {
    title: "Little Scholars Preschool - Navi Mumbai",
    description: "Quality early childhood education in Navi Mumbai",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
