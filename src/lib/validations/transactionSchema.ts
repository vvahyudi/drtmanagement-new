import { z } from "zod"

export const transactionSchema = z.object({
	customerId: z.string().uuid(),
	productId: z.string().uuid(),

	amount: z.number().int().min(0),
	price: z.number().int().min(0),
	purchasePrice: z.number().int().min(0),
	bonus: z.number().int().min(0),
	totalAmount: z.number().int().min(0),

	status: z.enum(["PENDING", "PAID", "FAILED", "SUCCESS"]),
	processingStatus: z.enum(["UNPAID", "DELIVERING", "DELIVERED", "CANCELLED"]),
	paymentMethodName: z.string(),

	requestBody: z.any(),
	paidBody: z.any().optional(),
	invoiceId: z.string(),
	transactionId: z.string(),
	paidAt: z.string().datetime().optional(),
	expiredAt: z.string().datetime().optional(),
})
