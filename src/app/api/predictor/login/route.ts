import { NextRequest, NextResponse } from "next/server"
import { PREDICTOR_COOKIE, sessionToken, predictorPassword } from "@/lib/predictor/auth"

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}))
  const expected = predictorPassword()

  if (!expected) {
    return NextResponse.json({ error: "Predictor is not configured (set PREDICTOR_PASSWORD or ADMIN_PASSWORD)" }, { status: 503 })
  }
  if (typeof password !== "string" || password !== expected) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 })
  }

  const token = await sessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(PREDICTOR_COOKIE, token!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
