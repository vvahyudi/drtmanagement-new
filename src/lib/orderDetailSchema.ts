import { z } from "zod"
import { parseISO, format } from "date-fns"

// Zod schema untuk validasi OrderDetail
export const orderDetailSchema = z.object({
	staffId: z.number(),
	customerId: z.number(),
	orderRefId: z.number(),
	paymentType: z.string().min(2),
	appName: z.string().min(2),
	coinAmount: z.number().int().positive(),
	accountId: z.string().min(2),
	transactionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Tanggal transaksi tidak valid",
	}),
	totalAmount: z.number().positive(),
	paymentStatus: z.string(),
	note: z.string().optional(),
	coinSent: z.boolean().optional(),
})

// Contoh fungsi format tanggal dengan date-fns
export function formatTransactionDate(dateStr: string) {
	const date = parseISO(dateStr)
	return format(date, "dd MMMM yyyy HH:mm")
}
