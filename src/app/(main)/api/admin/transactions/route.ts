// app/api/admin/transactions/route.ts
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
	const transactions = await prisma.transaction.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			customer: true,
			product: true,
		},
	})

	return NextResponse.json(transactions)
}
