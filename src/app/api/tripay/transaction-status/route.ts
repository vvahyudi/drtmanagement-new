import { NextRequest, NextResponse } from "next/server"
import { getTransactionStatus } from "@/lib/tripay-sandbox"

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const reference = searchParams.get("reference")

		if (!reference) {
			return NextResponse.json(
				{
					success: false,
					message: "Transaction reference is required",
				},
				{ status: 400 },
			)
		}

		const transactionData = await getTransactionStatus(reference)

		return NextResponse.json({
			success: true,
			message: "Transaction status retrieved successfully",
			data: transactionData,
		})
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error
						? error.message
						: "Failed to fetch transaction status",
			},
			{ status: 500 },
		)
	}
}
