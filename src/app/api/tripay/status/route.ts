import { NextRequest, NextResponse } from "next/server"
import { getTransactionStatus } from "@/lib/tripay-sandbox"

export async function GET(req: NextRequest) {
	const reference = req.nextUrl.searchParams.get("reference")

	if (!reference) {
		return NextResponse.json(
			{ success: false, message: "Reference is required" },
			{ status: 400 },
		)
	}

	try {
		const data = await getTransactionStatus(reference)
		return NextResponse.json({ success: true, data })
	} catch (error) {
		console.error("Error in status API:", error)
		return NextResponse.json(
			{ success: false, message: "Failed to get transaction status" },
			{ status: 500 },
		)
	}
}
