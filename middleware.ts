import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  try {
    // Simple middleware that just passes through
    // We'll handle auth checks in the components instead
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Return a simple response on error
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
