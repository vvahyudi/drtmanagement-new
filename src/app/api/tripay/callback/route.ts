import { NextResponse } from "next/server"
import { verifyCallbackSignature } from "@/lib/tripay"

export async function POST(request: Request) {
	try {
		const body = await request.json()

		// Verify the callback signature
		// Get the signature from headers (case-insensitive)
		const signature =
			request.headers.get("x-callback-signature") ||
			request.headers.get("X-Callback-Signature")
		const privateKey = process.env.TRIPAY_PRIVATE_KEY

		if (!signature) {
			return NextResponse.json(
				{ error: "No signature provided" },
				{ status: 403 },
			)
		}

		if (!privateKey) {
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 },
			)
		}

		const isValid = verifyCallbackSignature(
			signature,
			privateKey,
			body.merchant_ref,
			body.amount.toString(),
		)

		if (!isValid) {
			return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
		}

		// Handle different payment statuses
		switch (body.status) {
			case "PAID":
				// TODO: Update your database to mark the order as paid
				// TODO: Deliver the digital goods or update inventory
				break

			case "EXPIRED":
				// TODO: Update your database to mark the order as expired
				break

			case "FAILED":
				// TODO: Update your database to mark the order as failed
				break

			default:
				// Unknown status
				console.warn("Unknown payment status:", body.status)
		}

		// Return success response to Tripay
		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Error processing Tripay callback:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		)
	}
}
