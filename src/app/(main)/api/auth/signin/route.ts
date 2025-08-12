import { NextRequest, NextResponse } from "next/server"
import { authClient } from "@/lib/auth-client"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { email, password, provider } = body

		if (!email || !password || !provider) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			)
		}

		if (provider !== "credentials") {
			return NextResponse.json({ error: "Invalid provider" }, { status: 400 })
		}

		// Use Better-Auth to authenticate
		const { data, error } = await authClient.signIn.email(
			{
				email,
				password,
				callbackURL: "admin/dashboard",
				rememberMe: false,
			},
			{
				// callbacks (if needed)
			},
		)
		const result = { data, error }

		if (result?.error) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			)
		}

		if (result.data?.url) {
			return NextResponse.json(
				{ success: true, redirectUrl: result.data.url },
				{ status: 200 },
			)
		}

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (error) {
		console.error("Signin error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
