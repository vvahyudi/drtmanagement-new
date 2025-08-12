// src/app/(main)/api/rivo/invoice/[invoiceId]/route.ts
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(
	_req: NextRequest,
	context: { params: Promise<{ invoiceId: string }> },
) {
	try {
		const { invoiceId } = await context.params

		const transaction = await prisma.transaction.findUnique({
			where: { invoiceId },
			include: { customer: true, product: true },
		})

		if (!transaction) {
			return NextResponse.json({ message: "Not found" }, { status: 404 })
		}

		// Lazy expiration: if already passed expiredAt and still pending/unpaid, mark as failed/cancelled
		if (
			transaction.expiredAt &&
			new Date(transaction.expiredAt).getTime() <= Date.now() &&
			transaction.status === "PENDING" &&
			transaction.processingStatus === "UNPAID"
		) {
			const updated = await prisma.transaction.update({
				where: { id: transaction.id },
				data: { status: "FAILED", processingStatus: "CANCELLED" },
				include: { customer: true, product: true },
			})
			return NextResponse.json(updated)
		}

		return NextResponse.json(transaction)
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		)
	}
}
