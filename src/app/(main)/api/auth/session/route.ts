import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
	try {
		const session = await auth.getSession()

		if (!session) {
			return NextResponse.json({ authenticated: false }, { status: 401 })
		}

		return NextResponse.json(
			{
				authenticated: true,
				user: session.user,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error("Session error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
