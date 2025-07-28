import { NextRequest, NextResponse } from "next/server"
import { createPaymentRequest } from "@/lib/tripay-sandbox"

export async function POST(req: NextRequest) {
	try {
		const data = await req.json()
		const response = await createPaymentRequest(data)
		return NextResponse.json(response) // Return response directly, not nested
	} catch {
		return NextResponse.json(
			{ success: false, message: "Failed to create payment" },
			{ status: 500 },
		)
	}
}
