import { NextResponse } from "next/server"
import { getPaymentChannels } from "@/lib/tripay-sandbox"

export async function GET() {
	try {
		const channels = await getPaymentChannels()
		return NextResponse.json({ success: true, data: channels })
	} catch (error) {
		console.error("Error in payment channels API:", error)
		return NextResponse.json(
			{ success: false, message: "Failed to fetch payment channels" },
			{ status: 500 },
		)
	}
}
