import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	try {
		const { invoiceId } = await req.json()

		if (!invoiceId) {
			return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 })
		}

		const updated = await prisma.transaction.updateMany({
			where: { invoiceId },
			data: {
				processingStatus: "DELIVERED",
			},
		})

		if (updated.count === 0) {
			return NextResponse.json(
				{ error: "No matching transaction found" },
				{ status: 404 },
			)
		}

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Error updating delivery status:", error)
		return NextResponse.json({ error: "Server error" }, { status: 500 })
	}
}
