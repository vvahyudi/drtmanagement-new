import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// Prisma butuh Node.js runtime (bukan Edge)
export const runtime = "nodejs"

export async function PATCH(
	req: NextRequest,
	context: { params: Promise<{ invoiceId: string }> },
) {
	try {
		const { invoiceId } = await context.params

		if (!invoiceId) {
			return NextResponse.json(
				{ error: "invoiceId is required in route params" },
				{ status: 400 },
			)
		}

		const { processingStatus } = await req.json()

		if (!processingStatus) {
			return NextResponse.json(
				{ error: "processingStatus is required in body" },
				{ status: 400 },
			)
		}

		const updated = await prisma.transaction.update({
			where: { invoiceId },
			data: { processingStatus },
		})

		return NextResponse.json(updated)
	} catch (err: unknown) {
		// Not found
		if (
			typeof err === "object" &&
			err !== null &&
			"code" in err &&
			(err as { code?: string }).code === "P2025"
		) {
			return NextResponse.json(
				{
					error: `Transaction with invoiceId ${await (
						await context.params
					).invoiceId} not found`,
				},
				{ status: 404 },
			)
		}
		// Lain-lain
		return NextResponse.json(
			{ error: "Failed to update processingStatus" },
			{ status: 500 },
		)
	}
}
