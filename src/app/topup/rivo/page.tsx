"use client"
import { useState } from "react"
import { ProductHeader } from "@/components/product-header"
import { UserInputForm } from "@/components/user-input-form"
import { CoinPackagesGrid } from "@/components/coin-packages-grid"
import { PurchaseSummary } from "@/components/purchase-summary"
import { useUserInfo } from "@/lib/hooks/use-rivo-queries"
import { toast } from "sonner"
import { formatNumber, unformatNumber } from "@/constants/constants"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const coinPackages: CoinPackage[] = [
	{ id: "1", coins: 10000, price: 17000, isHot: true, cashback: 5 },
	{ id: "2", coins: 20000, price: 34000, isHot: true, cashback: 5 },
	{ id: "3", coins: 30000, price: 51000, isHot: true, cashback: 5 },
	{ id: "4", coins: 42000, price: 68000, isHot: true },
	{ id: "5", coins: 52500, price: 85000, isHot: true },
	{ id: "6", coins: 63000, price: 102000, isHot: true },
	{ id: "7", coins: 105000, price: 170000, isHot: true },
	{ id: "8", coins: 157500, price: 255000, isHot: true },
	{ id: "9", coins: 210000, price: 340000, isHot: true },
	{ id: "10", coins: 262500, price: 425000, isHot: true },
	{ id: "11", coins: 525000, price: 850000, isHot: true },
]

interface CoinPackage {
	id: string
	coins: number
	price: number
	isHot: boolean
	cashback?: number
}

interface PaymentChannel {
	code: string
	name: string
	type: string
	fee_merchant: {
		flat: number
		percent: number
	}
}

export default function RivoTopUpPageClient() {
	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
		null,
	)
	const [userIdToCheck, setUserIdToCheck] = useState<string>("")
	const [whatsApp, setWhatsApp] = useState("")
	const [showPaymentDialog, setShowPaymentDialog] = useState(false)
	const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([])
	const [selectedMethod, setSelectedMethod] = useState("")
	const [isLoadingPayment, setIsLoadingPayment] = useState(false)
	const [showCustomAmountDialog, setShowCustomAmountDialog] = useState(false)
	const [customPrice, setCustomPrice] = useState("")
	const [customPackage, setCustomPackage] = useState<CoinPackage | null>(null)

	// Coin to rupiah conversion rate: 1 coin = 1.7 rupiah
	const COIN_RATE = 1.619

	// Query user info only when Check ID button is clicked
	const { data: userInfo, isLoading: isCheckingUser } = useUserInfo(
		Number(userIdToCheck),
	)

	// Selected package from the grid
	const selectedPackage = selectedPackageId
		? selectedPackageId === "custom"
			? customPackage
			: coinPackages.find((pkg) => pkg.id === selectedPackageId)
		: undefined

	// Fetch payment channels when payment sheet is opened
	const [isLoadingChannels, setIsLoadingChannels] = useState(false)
	const [channelError, setChannelError] = useState<string | null>(null)

	const fetchPaymentChannels = async () => {
		setIsLoadingChannels(true)
		setChannelError(null)
		try {
			const response = await fetch("/api/tripay/payment-channels")
			const data = await response.json()
			if (data.success) {
				setPaymentChannels(data.data)
			} else {
				setChannelError(data.message || "Failed to load payment methods")
				toast.error(data.message || "Failed to load payment methods")
			}
		} catch (error) {
			console.error("Error fetching payment channels:", error)
			// message dihapus karena tidak digunakan
			setChannelError(
				"Could not connect to payment server. Please check your connection and try again.",
			)
			toast.error("Could not connect to payment server")
		} finally {
			setIsLoadingChannels(false)
		}
	}

	// Handle check ID button click
	const handleCheckId = (userId: string) => {
		setUserIdToCheck(userId)
	}

	// Handle custom amount dialog
	const handleCustomAmountSelect = () => {
		// Reset form when opening dialog

		setCustomPrice("")
		setShowCustomAmountDialog(true)
	}

	// Handle price input change and auto-calculate coins
	const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numeric = e.target.value.replace(/[^\d]/g, "")
		const formattedValue = numeric === "" ? "" : formatNumber(parseInt(numeric))

		// Limit to reasonable maximum
		const maxPrice = 100000000 // 100 million max
		const numericValue = parseInt(unformatNumber(formattedValue))
		const finalValue =
			numericValue > maxPrice ? formatNumber(maxPrice) : formattedValue

		setCustomPrice(finalValue)

		// price dihapus karena tidak digunakan
	}

	const handlePackageSelect = (packageId: string | null) => {
		if (packageId === "custom") {
			handleCustomAmountSelect()
		} else {
			setSelectedPackageId(packageId)
			setCustomPackage(null)
		}
	}

	const handleCustomAmountSave = () => {
		const price = parseInt(unformatNumber(customPrice))

		// Validation
		if (!price || price <= 0) {
			toast.error("Harga harus lebih dari 0")
			return
		}

		if (price < 17000) {
			toast.error("Minimal pembelian Rp 17.000")
			return
		}

		// Calculate coins automatically
		const calculatedCoins = Math.round(price / COIN_RATE)

		const newCustomPackage: CoinPackage = {
			id: "custom",
			coins: calculatedCoins,
			price: price,
			isHot: false,
		}

		setCustomPackage(newCustomPackage)
		setSelectedPackageId("custom")
		setShowCustomAmountDialog(false)
		toast.success(
			`Custom amount berhasil: ${formatNumber(
				calculatedCoins,
			)} coin - Rp ${formatNumber(price)}`,
		)
	}

	const handlePurchase = () => {
		setShowPaymentDialog(true)
		fetchPaymentChannels()
	}

	const handlePayment = async () => {
		if (!selectedPackage || !userIdToCheck || !whatsApp || !userInfo) {
			toast.error("Please complete all required information")
			return
		}

		if (!selectedMethod) {
			toast.error("Please select a payment method")
			return
		}

		setIsLoadingPayment(true)
		try {
			// Create payment request
			const response = await fetch("/api/tripay/create-payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					method: selectedMethod,
					merchant_ref: selectedPackage
						? `RIVO_${userIdToCheck}_${selectedPackage.coins}`
						: "",
					amount: selectedPackage ? selectedPackage.price : 0,
					customer_name: userInfo?.nickName || `User ${userIdToCheck}`,
					customer_email: `${userIdToCheck}@drtlive.com`,
					customer_phone: whatsApp,
					order_items: [
						{
							name: selectedPackage
								? `${selectedPackage.coins} Rivo Coins`
								: "",
							price: selectedPackage ? selectedPackage.price : 0,
							quantity: 1,
						},
					],
				}),
			})

			const result = await response.json()
			if (result.success) {
				// Redirect to payment page
				window.location.href = result.data.checkout_url
			} else {
				throw new Error(result.message)
			}
		} catch {
			toast.error("Failed to process payment. Please try again.")
		} finally {
			setIsLoadingPayment(false)
			setShowPaymentDialog(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 relative">
			<div className="container mx-auto px-4 py-8">
				<div className="mx-auto">
					<ProductHeader
						title="Top Up Rivo Live Coin"
						subtitle="Rivo Live"
						icon="/logo-rivo.webp?height=60&width=60"
					/>

					<div className="grid lg:grid-cols-3 gap-8">
						<div className="lg:col-span-2 space-y-8">
							<UserInputForm
								onUserIdSubmit={handleCheckId}
								onWhatsAppChange={setWhatsApp}
								isCheckingUser={isCheckingUser}
								userInfo={
									userInfo
										? {
												username: userInfo.nickName,
												avatar: userInfo.avatar,
										  }
										: undefined
								}
							/>

							<CoinPackagesGrid
								packages={coinPackages}
								onPackageSelect={handlePackageSelect}
								selectedPackageId={selectedPackageId}
								disabled={!userInfo}
							/>
						</div>

						<div className="lg:col-span-1">
							<PurchaseSummary
								selectedPackage={selectedPackage || undefined}
								userId={userIdToCheck}
								whatsApp={whatsApp}
								onPurchase={handlePurchase}
								isLoading={isLoadingPayment}
								disabled={!userInfo || !selectedPackage}
								username={userInfo?.nickName}
							/>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
				<DialogContent className="w-full sm:max-w-lg overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Pilih Tipe Pembayaran</DialogTitle>
					</DialogHeader>

					<div className="mt-6 space-y-6">
						<div>
							{isLoadingChannels ? (
								<div className="mt-4 text-center py-8">
									<div className="animate-spin h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full mx-auto"></div>
									<p className="mt-2 text-sm text-gray-500">
										Memuat metode pembayaran...
									</p>
								</div>
							) : channelError ? (
								<div className="mt-4 text-center py-8">
									<p className="text-sm text-red-600 mb-4">{channelError}</p>
									<Button
										onClick={fetchPaymentChannels}
										variant="outline"
										size="sm"
									>
										Coba Lagi
									</Button>
								</div>
							) : (
								<RadioGroup
									value={selectedMethod}
									onValueChange={setSelectedMethod}
									className="space-y-6"
								>
									{/* E-Wallet Section */}
									<div className="space-y-3">
										<h3 className="font-medium text-sm text-gray-500">
											E-Wallet
										</h3>
										<div className="space-y-2">
											{paymentChannels
												.filter((channel) =>
													["GOPAY", "SHOPEEPAY", "DANA"].includes(channel.code),
												)
												.map((channel) => (
													<div
														key={channel.code}
														className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
														onClick={() => setSelectedMethod(channel.code)}
													>
														<RadioGroupItem
															value={channel.code}
															id={channel.code}
														/>
														<Label
															htmlFor={channel.code}
															className="flex-1 cursor-pointer"
														>
															<div className="flex justify-between items-center">
																<div className="flex items-center space-x-3">
																	<span className="font-medium">
																		{channel.name}
																	</span>
																</div>
																<span className="text-sm text-gray-600">
																	{channel.fee_merchant.flat > 0
																		? `+${channel.fee_merchant.flat.toLocaleString()}`
																		: "Gratis"}
																</span>
															</div>
														</Label>
													</div>
												))}
										</div>
									</div>

									{/* Virtual Account Section */}
									<div className="space-y-3">
										<h3 className="font-medium text-sm text-gray-500">
											Virtual Account
										</h3>
										<div className="space-y-2">
											{paymentChannels
												.filter((channel) => channel.code === "BCAVA")
												.map((channel) => (
													<div
														key={channel.code}
														className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
														onClick={() => setSelectedMethod(channel.code)}
													>
														<RadioGroupItem
															value={channel.code}
															id={channel.code}
														/>
														<Label
															htmlFor={channel.code}
															className="flex-1 cursor-pointer"
														>
															<div className="flex justify-between items-center">
																<div className="flex items-center space-x-3">
																	<span className="font-medium">
																		{channel.name}
																	</span>
																</div>
																<span className="text-sm text-gray-600">
																	{channel.fee_merchant.flat > 0
																		? `+${channel.fee_merchant.flat.toLocaleString()}`
																		: "Gratis"}
																</span>
															</div>
														</Label>
													</div>
												))}
										</div>
									</div>

									{/* QRIS Section */}
									<div className="space-y-3">
										<h3 className="font-medium text-sm text-gray-500">QRIS</h3>
										<div className="space-y-2">
											{paymentChannels
												.filter((channel) => channel.code === "QRIS")
												.map((channel) => (
													<div
														key={channel.code}
														className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
														onClick={() => setSelectedMethod(channel.code)}
													>
														<RadioGroupItem
															value={channel.code}
															id={channel.code}
														/>
														<Label
															htmlFor={channel.code}
															className="flex-1 cursor-pointer"
														>
															<div className="flex justify-between items-center">
																<div className="flex items-center space-x-3">
																	<span className="font-medium">
																		{channel.name}
																	</span>
																	<span className="text-xs text-gray-500">
																		Supported: GoPay, OVO, DANA, LinkAja,
																		ShopeePay
																	</span>
																</div>
																<span className="text-sm text-gray-600">
																	{channel.fee_merchant.flat > 0
																		? `+${channel.fee_merchant.flat.toLocaleString()}`
																		: "Gratis"}
																</span>
															</div>
														</Label>
													</div>
												))}
										</div>
									</div>
								</RadioGroup>
							)}
						</div>

						<Button
							className="w-full"
							onClick={handlePayment}
							disabled={
								isLoadingPayment ||
								!selectedMethod ||
								!whatsApp ||
								isLoadingChannels
							}
						>
							{isLoadingPayment ? "Processing..." : "Pay Now"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Custom Amount Dialog */}
			<Dialog
				open={showCustomAmountDialog}
				onOpenChange={setShowCustomAmountDialog}
			>
				<DialogContent className="w-full sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">
							Custom Amount
						</DialogTitle>
					</DialogHeader>

					<div className="mt-6 space-y-6">
						{/* Input Section */}
						<div className="space-y-2">
							<Label htmlFor="customPrice" className="text-lg font-medium">
								Nominal Rupiah
							</Label>
							<Input
								id="customPrice"
								type="text"
								inputMode="numeric"
								placeholder="Masukkan nominal"
								value={customPrice}
								onChange={handleCustomPriceChange}
								className="text-lg px-4 py-3 border-2"
							/>
							<p className="text-sm text-gray-500">
								Rate: 1 coin = Rp{COIN_RATE.toLocaleString("id-ID")}
							</p>
						</div>

						{/* Results Section */}
						{customPrice && parseInt(unformatNumber(customPrice)) > 0 && (
							<div className="space-y-4">
								{/* Total Price */}
								<div className="text-right">
									<p className="text-sm text-gray-600 mb-1">Total Harga:</p>
									<p className="text-2xl font-bold text-purple-600">
										Rp{customPrice}
									</p>
								</div>

								{/* Coins Result */}
								<div className="bg-green-50 rounded-lg p-4">
									<p className="text-sm text-gray-600 mb-1">
										Jumlah yang didapat:
									</p>
									<p className="text-xl font-bold text-green-600">
										{formatNumber(
											Math.round(
												parseInt(unformatNumber(customPrice)) / COIN_RATE,
											),
										)}{" "}
										Coin
									</p>
								</div>
							</div>
						)}

						{/* Action Button */}
						<Button
							className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium"
							onClick={handleCustomAmountSave}
							disabled={
								!customPrice ||
								parseInt(unformatNumber(customPrice || "")) < 17000
							}
						>
							Pilih
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
