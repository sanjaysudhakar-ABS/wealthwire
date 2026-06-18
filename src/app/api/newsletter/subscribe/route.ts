import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({ email: z.string().email(), name: z.string().optional() })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)
    console.log("Newsletter subscription:", email)
    return NextResponse.json({ success: true, message: "Successfully subscribed!" })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid email address" }, { status: 400 })
  }
}
