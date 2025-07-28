import axios from "axios"
import crypto from "crypto"

const SANDBOX_API_URL = "https://tripay.co.id/api-sandbox"
// const PRODUCTION_API_URL = "https://tripay.co.id/api"

// Create axios instance with default config
const tripayApi = axios.create({
	baseURL: SANDBOX_API_URL,
	headers: {
		Authorization: `Bearer ${process.env.TRIPAY_API_KEY}`,
		"Content-Type": "application/json",
	},
})

// Add response interceptor for error handling
tripayApi.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.message || "An error occurred"
		console.error("Tripay API Error:", {
			message,
			status: error.response?.status,
			data: error.response?.data,
		})
		throw new Error(message)
	},
)

interface PaymentChannel {
	code: string
	name: string
	group: string
	type: string
	fee_merchant: {
		flat: number
		percent: number
	}
	fee_customer: {
		flat: number
		percent: number
	}
	total_fee: {
		flat: number
		percent: string
	}
	minimum_fee: number
	maximum_fee: number
	minimum_amount: number
	maximum_amount: number
	icon_url: string
	active: boolean
}

interface PaymentRequestData {
	method: string
	merchant_ref: string
	amount: number
	customer_name: string
	customer_email: string
	customer_phone: string
	order_items: Array<{
		name: string
		price: number
		quantity: number
	}>
	return_url: string
	expired_time?: number // Duration in seconds (will be converted to Unix timestamp)
	callback_url?: string
}

interface PaymentResponse {
	success: boolean
	message: string
	data: {
		reference: string
		merchant_ref: string
		payment_method: string
		payment_name: string
		total_amount: number
		fee_merchant: number
		fee_customer: number
		total_fee: number
		amount_received: number
		pay_code: string
		pay_url: string
		checkout_url: string
		status: string
		expired_time: number
	}
}

// Helper untuk membuat signature
const createSignature = (
	merchantCode: string,
	merchantRef: string,
	amount: number,
) => {
	const privateKey = process.env.TRIPAY_PRIVATE_KEY || ""
	const stringToSign = `${merchantCode}${merchantRef}${amount}`

	const signature = crypto
		.createHmac("sha256", privateKey)
		.update(stringToSign)
		.digest("hex")

	return signature
}

// Get daftar channel pembayaran yang tersedia
export async function getPaymentChannels(): Promise<PaymentChannel[]> {
	try {
		const response = await tripayApi.get("/merchant/payment-channel")
		return response.data.data.filter((channel: PaymentChannel) =>
			["QRIS", "BCAVA", "GOPAY", "DANA", "SHOPEEPAY"].includes(channel.code),
		)
	} catch (error) {
		console.error("Error fetching payment channels:", error)
		throw error
	}
}

// Request transaksi pembayaran
export async function createPaymentRequest(
	data: PaymentRequestData,
): Promise<PaymentResponse> {
	try {
		const merchantCode = process.env.TRIPAY_MERCHANT_CODE || ""
		const signature = createSignature(
			merchantCode,
			data.merchant_ref,
			data.amount,
		)

		// Set expiry time as Unix timestamp (not duration)
		// Tripay expects absolute timestamp, not relative seconds
		const currentTime = Math.floor(Date.now() / 1000) // Current Unix timestamp
		const expiryDuration = data.expired_time || 3600 // Default 1 hour in seconds

		// Calculate absolute expiry timestamp
		const validExpiryTime =
			currentTime + Math.max(3600, Math.min(86400, Math.floor(expiryDuration)))

		const payload = {
			method: data.method,
			merchant_ref: data.merchant_ref,
			amount: data.amount,
			customer_name: data.customer_name,
			customer_email: data.customer_email,
			customer_phone: data.customer_phone,
			order_items: data.order_items,
			return_url:
				data.return_url ||
				`${
					process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
				}/payment/status`,
			callback_url:
				data.callback_url ||
				`${
					process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
				}/api/tripay/callback`,
			signature: signature,
			expired_time: validExpiryTime, // Unix timestamp when payment expires
		}

		const response = await tripayApi.post("/transaction/create", payload)

		return {
			success: true,
			message: "Payment created successfully",
			data: response.data.data, // Return the actual transaction data from Tripay
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message)
		}
		throw error
	}
}

// Check status pembayaran
export async function getTransactionStatus(reference: string) {
	try {
		const response = await tripayApi.get(`/transaction/detail`, {
			params: { reference },
		})
		return response.data.data
	} catch (error) {
		throw error
	}
}
