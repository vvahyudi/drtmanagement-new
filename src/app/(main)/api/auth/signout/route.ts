import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest) {
	try {
		await auth.signOut()

		return NextResponse.json(
			{ success: true, message: "Logged out successfully" },
			{ status: 200 },
		)
	} catch (error) {
		console.error("Signout error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
