import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

function isAuthorized(req: NextRequest) {
	const secret = process.env.CRON_SECRET
	if (!secret) return true
	const header = req.headers.get("x-cron-secret")
	const url = new URL(req.url)
	const token = url.searchParams.get("token")
	return header === secret || token === secret
}

export async function GET(req: NextRequest) {
	if (!isAuthorized(req)) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	try {
		const now = new Date()

		const result = await prisma.transaction.updateMany({
			where: {
				status: "PENDING",
				processingStatus: "UNPAID",
				expiredAt: { lte: now },
			},
			data: {
				status: "FAILED",
				processingStatus: "CANCELLED",
			},
		})

		return NextResponse.json({
			updated: result.count,
			now: now.toISOString(),
		})
	} catch (error) {
		console.error("Cron expire error", error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		)
	}
}
