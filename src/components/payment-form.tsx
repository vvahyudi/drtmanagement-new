import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PaymentChannel {
	code: string
	name: string
	group: string
	fee_flat: number
	fee_percent: number
	total_fee: {
		flat: number
		percent: number
	}
	minimum: number
	maximum: number
}

interface PaymentFormProps {
	amount: number
	customerName: string
	customerEmail: string
	customerPhone: string
	rivoUserId: string
	coinAmount: number
	orderItems: Array<{
		name: string
		price: number
		quantity: number
	}>
	onSubmit?: (data: { method: string } & PaymentFormProps) => void
}

export function PaymentForm({
	amount,
	customerName,
	customerEmail,
	customerPhone,
	rivoUserId,
	coinAmount,
	orderItems,
	onSubmit,
}: PaymentFormProps) {
	const [loading, setLoading] = useState(false)
	const [selectedMethod, setSelectedMethod] = useState("")
	const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([])
	const [error, setError] = useState("")

	useEffect(() => {
		// Fetch payment channels when component mounts
		const fetchPaymentChannels = async () => {
			try {
				const response = await fetch("/api/tripay/payment-channels")
				const data = await response.json()
				if (data.success) {
					setPaymentChannels(data.data)
				} else {
					setError("Failed to load payment methods")
				}
			} catch (err) {
				console.error("Error fetching payment channels:", err)
				setError("Failed to load payment methods")
			}
		}

		fetchPaymentChannels()
	}, [])

	const handlePayment = async () => {
		if (!selectedMethod) {
			alert("Please select a payment method")
			return
		}

		setLoading(true)
		try {
			if (onSubmit) {
				onSubmit({
					method: selectedMethod,
					amount,
					customerName,
					customerEmail,
					customerPhone,
					rivoUserId,
					coinAmount,
					orderItems,
				})
			}
		} catch (error) {
			console.error("Payment error:", error)
			alert("Failed to process payment. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	// Group payment channels by their group
	const groupedChannels = paymentChannels.reduce((acc, channel) => {
		if (!acc[channel.group]) {
			acc[channel.group] = []
		}
		acc[channel.group].push(channel)
		return acc
	}, {} as Record<string, PaymentChannel[]>)

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<div className="font-medium">Payment Summary</div>
				<div className="text-sm text-gray-600">
					Amount: Rp {amount.toLocaleString("id-ID")}
				</div>
				<div className="text-sm text-gray-600">Customer: {customerName}</div>
				<div className="text-sm text-gray-600">Email: {customerEmail}</div>
				<div className="text-sm text-gray-600">Phone: {customerPhone}</div>
				<div className="text-sm text-gray-600">Rivo ID: {rivoUserId}</div>
				<div className="text-sm text-gray-600">
					Coins: {coinAmount.toLocaleString()}
				</div>
			</div>

			{error ? (
				<div className="text-red-500 text-sm">{error}</div>
			) : (
				<div className="space-y-4">
					<div className="font-medium">Select Payment Method</div>
					<RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
						{Object.entries(groupedChannels).map(([group, channels]) => (
							<div key={group} className="space-y-2">
								<div className="text-sm font-medium text-gray-500">{group}</div>
								{channels.map((channel) => (
									<div
										key={channel.code}
										className="flex items-center space-x-2"
									>
										<RadioGroupItem value={channel.code} id={channel.code} />
										<Label htmlFor={channel.code}>
											{channel.name}
											{channel.fee_flat > 0 && (
												<span className="text-xs text-gray-500 ml-2">
													+Rp {channel.fee_flat.toLocaleString("id-ID")}
												</span>
											)}
										</Label>
									</div>
								))}
							</div>
						))}
					</RadioGroup>
				</div>
			)}

			<Button
				onClick={handlePayment}
				disabled={loading || !selectedMethod}
				className="w-full"
			>
				{loading ? "Processing..." : "Pay Now"}
			</Button>
		</div>
	)
}
