export interface TripayChannel {
	code: string
	name: string
	type: "direct" | "virtual_account" | "convenience_store" | "ewallet"
	fee_merchant: {
		flat: number
		percent: number
	}
	total_fee: {
		flat: number
		percent: number
	}
	minimum_fee: number
	maximum_fee: number
	icon_url: string
	active: boolean
}

export interface TripayTransactionDetail {
	reference: string
	merchant_ref: string
	payment_method: string
	payment_name: string
	customer_name: string
	customer_email: string
	customer_phone: string
	callback_url: string
	return_url: string
	amount: number
	fee_merchant: number
	fee_customer: number
	total_fee: number
	amount_received: number
	pay_code: string
	pay_url: string
	checkout_url: string
	qr_url?: string
	status: "UNPAID" | "PAID" | "EXPIRED" | "FAILED"
	expired_time: number
	order_items: Array<{
		name: string
		price: number
		quantity: number
		subtotal: number
	}>
}

import * as crypto from "crypto"
const TRIPAY_API_KEY = process.env.NEXT_PUBLIC_TRIPAY_API_KEY || ""
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || ""
const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE || ""
const IS_PRODUCTION = process.env.NODE_ENV === "production"

const API_BASE_URL = IS_PRODUCTION
	? "https://tripay.co.id/api"
	: "https://tripay.co.id/api-sandbox"

// Generate signature for requests
const generateSignature = (merchantRef: string, amount: number) => {
	const hmac = crypto.createHmac("sha256", TRIPAY_PRIVATE_KEY)
	return hmac.update(TRIPAY_MERCHANT_CODE + merchantRef + amount).digest("hex")
}

// Get list of available payment channels
export const getPaymentChannels = async (): Promise<TripayChannel[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/merchant/payment-channel`, {
			headers: {
				Authorization: `Bearer ${TRIPAY_API_KEY}`,
			},
		})

		const data = await response.json()
		if (!response.ok) {
			throw new Error(data.message || "Failed to get payment channels")
		}

		return data.data
	} catch (error) {
		console.error("Error fetching payment channels")
		throw error
	}
}

// Create a new transaction
export const createTransaction = async ({
	merchantRef,
	amount,
	method,
	customerName,
	customerEmail,
	customerPhone,
	orderItems,
	callbackUrl,
	returnUrl,
}: {
	merchantRef: string
	amount: number
	method: string
	customerName: string
	customerEmail: string
	customerPhone: string
	orderItems: Array<{
		name: string
		price: number
		quantity: number
	}>
	callbackUrl: string
	returnUrl: string
}): Promise<TripayTransactionDetail> => {
	try {
		const signature = generateSignature(merchantRef, amount)

		// Use our API route instead of calling Tripay directly
		const response = await fetch("/api/tripay/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				method,
				merchant_ref: merchantRef,
				amount,
				customer_name: customerName,
				customer_email: customerEmail,
				customer_phone: customerPhone,
				order_items: orderItems,
				callback_url: callbackUrl,
				return_url: returnUrl,
				signature,
			}),
		})

		const data = await response.json()
		if (!response.ok) {
			throw new Error(data.message || "Failed to create transaction")
		}

		return data.data
	} catch (error) {
		console.error("Error creating transaction")
		throw error
	}
}

// Get transaction details
export const getTransactionDetail = async (
	reference: string,
): Promise<TripayTransactionDetail> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/transaction/detail?reference=${reference}`,
			{
				headers: {
					Authorization: `Bearer ${TRIPAY_API_KEY}`,
				},
			},
		)

		const data = await response.json()
		if (!response.ok) {
			throw new Error(data.message || "Failed to get transaction details")
		}

		return data.data
	} catch (error) {
		console.error("Error fetching transaction details")
		throw error
	}
}

// Verify callback signature
export const verifyCallbackSignature = (
	signature: string,
	privateKey: string,
	merchantRef: string,
	amount: string,
): boolean => {
	try {
		// For Tripay callbacks, the signature is calculated as:
		// SHA256(private_key + merchant_ref + amount)
		const signatureComponents = privateKey + merchantRef + amount
		const hmac = crypto.createHmac("sha256", privateKey)
		const expectedSignature = hmac.update(signatureComponents).digest("hex")

		return signature === expectedSignature
	} catch {
		return false
	}
}
