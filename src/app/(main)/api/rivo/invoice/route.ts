import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"

function generateInvoiceId(index: number) {
	const date = format(new Date(), "yyyyMMdd")
	const padded = String(index).padStart(4, "0")
	return `INV-${date}-${padded}`
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const {
			amount,
			clientId,
			phoneNumber,
			productCode,
			totalAmount,
			bonusAmount,
			price,
		} = body

		// Validasi basic
		if (!amount || !clientId || !phoneNumber || !productCode) {
			return NextResponse.json(
				{ message: "Data tidak lengkap" },
				{ status: 400 },
			)
		}

		// Ambil product
		const product = await prisma.product.findUnique({
			where: { code: productCode },
		})

		if (!product) {
			return NextResponse.json(
				{ message: "Produk tidak ditemukan" },
				{ status: 404 },
			)
		}

		// Ambil atau buat customer
		const customer = await prisma.customer.upsert({
			where: { phoneNumber },
			update: {},
			create: { phoneNumber },
		})

		// Hitung nomor urut hari ini
		const today = new Date()
		today.setHours(0, 0, 0, 0)

		const countToday = await prisma.transaction.count({
			where: { createdAt: { gte: today } },
		})

		// Determine price to use: for custom product, rely on input price from client
		let inputPrice = 0
		if (price !== undefined && price !== null) {
			inputPrice =
				typeof price === "number" ? price : parseInt(String(price), 10)
			if (Number.isNaN(inputPrice)) inputPrice = 0
		}

		const priceToUse =
			productCode === "RIVO_CUSTOM" ? inputPrice : product.price
		if (productCode === "RIVO_CUSTOM" && (!priceToUse || priceToUse <= 0)) {
			return NextResponse.json(
				{ message: "Harga custom tidak valid" },
				{ status: 400 },
			)
		}

		const transaction = await prisma.transaction.create({
			data: {
				transactionId: uuidv4(),
				invoiceId: generateInvoiceId(countToday + 1),
				customerId: customer.id,
				productId: product.id,
				amount:
					productCode === "RIVO_CUSTOM"
						? (() => {
								const base = Math.floor(priceToUse * 0.5882)
								return base
						  })()
						: amount,
				price: priceToUse,
				purchasePrice: product.purchasePrice,
				bonus:
					productCode === "RIVO_CUSTOM"
						? (() => {
								const base = Math.floor(priceToUse * 0.5882)
								return Math.floor(base * 0.05)
						  })()
						: bonusAmount,
				totalAmount:
					productCode === "RIVO_CUSTOM"
						? (() => {
								const base = Math.floor(priceToUse * 0.5882)
								const bonus = Math.floor(base * 0.05)
								return base + bonus
						  })()
						: totalAmount,
				status: "PENDING",
				processingStatus: "UNPAID",
				paymentMethodName: "QRIS",
				expiredAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
				requestBody: body,
			},
		})

		return NextResponse.json({
			transactionId: transaction.transactionId,
			invoiceId: transaction.invoiceId,
		})
	} catch (error: unknown) {
		console.error("❌ TRANSACTION ERROR:", error)
		return NextResponse.json(
			{ message: "Terjadi kesalahan server." },
			{ status: 500 },
		)
	}
}
