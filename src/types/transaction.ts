export interface Customer {
	id: string
	phoneNumber: string
	createdAt: string
}

export interface Product {
	id: string
	name: string
	code: string
	amount: number
	price: number
	purchasePrice: number
	bonusAmount: number
	status: string
	badge?: string | null
	createdAt: string
	updatedAt: string
}

export type TransactionStatus = "PENDING" | "PAID" | "FAILED" | "SUCCESS"
export type ProcessingStatus =
	| "UNPAID"
	| "DELIVERING"
	| "DELIVERED"
	| "CANCELLED"

export interface TransactionWithDetails {
	id: string
	transactionId: string
	invoiceId: string
	customerId: string
	customer: Customer
	productId: string
	product: Product
	amount: number
	price: number
	purchasePrice: number
	bonus: number
	totalAmount: number
	status: TransactionStatus
	processingStatus: ProcessingStatus
	paymentMethodName: string
	requestBody: unknown
	paidBody?: unknown
	paidAt?: string
	expiredAt?: string
	createdAt: string
	updatedAt: string
}
