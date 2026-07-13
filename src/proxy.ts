import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PREDICTOR_COOKIE, isValidSession } from "@/lib/predictor/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Login page and login endpoint stay reachable
  if (pathname === "/predictor/login" || pathname === "/api/predictor/login") {
    return NextResponse.next()
  }

  const ok = await isValidSession(request.cookies.get(PREDICTOR_COOKIE)?.value)
  if (ok) return NextResponse.next()

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const login = new URL("/predictor/login", request.url)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ["/predictor/:path*", "/api/predictor/:path*"],
}
