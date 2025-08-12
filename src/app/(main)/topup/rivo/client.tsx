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

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { fetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
export interface Product {
	name: string
	code: string
	amount: number
	purchasePrice: number
	price: number
	bonusAmount: number
	status: string
	badge: string | null
}

// ------------------------------------------------------------
// Component (Mobile-first redesign)
// ------------------------------------------------------------
export default function RivoTopUpPageClient() {
	const [selectedProductCode, setSelectedProductCode] = useState<string | null>(
		null,
	)
	const { data: products, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => fetcher("/api/rivo/products"),
	})

	const [userIdToCheck, setUserIdToCheck] = useState<string>("")
	const [whatsApp, setWhatsApp] = useState("")
	const [showPaymentDialog, setShowPaymentDialog] = useState(false)
	const [isLoadingPayment, setIsLoadingPayment] = useState(false)

	const [showCustomAmountDialog, setShowCustomAmountDialog] = useState(false)
	const [customPrice, setCustomPrice] = useState("")
	const [customProduct, setCustomProduct] = useState<Product | null>(null)

	// Custom coin calculation will use: base = price * 0.5882; bonus = base * 5%; total = base + bonus

	// Query user info only when Check ID button is clicked (hook handles enable internally)
	const { data: userInfo, isLoading: isCheckingUser } = useUserInfo(
		Number(userIdToCheck),
	)

	const selectedProduct = selectedProductCode
		? selectedProductCode === "RIVO_CUSTOM"
			? customProduct && customProduct.amount > 0 && customProduct.price > 0
				? customProduct
				: undefined
			: products?.find((p) => p.code === selectedProductCode)
		: undefined

	// For confirmation dialog: when custom price, show base coins (amount - bonus)
	const dialogCoinAmount = selectedProduct
		? selectedProduct.code === "RIVO_CUSTOM"
			? Math.max(
					(selectedProduct.amount || 0) - (selectedProduct.bonusAmount || 0),
					0,
			  )
			: selectedProduct.amount || 0
		: 0

	// ----------------------------------------------------------
	// Handlers
	// ----------------------------------------------------------
	const handleCheckId = (userId: string) => {
		setUserIdToCheck(userId)
	}

	const handleCustomAmountSelect = () => {
		setCustomPrice("")
		setShowCustomAmountDialog(true)
	}

	const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numeric = e.target.value.replace(/[^\d]/g, "")
		const formattedValue = numeric === "" ? "" : formatNumber(parseInt(numeric))

		const maxPrice = 100_000_000 // 100M cap for safety
		const numericValue = parseInt(unformatNumber(formattedValue || "0"))
		const finalValue =
			numericValue > maxPrice ? formatNumber(maxPrice) : formattedValue

		setCustomPrice(finalValue)
	}

	const handleProductSelect = (productCode: string | null) => {
		if (productCode === "RIVO_CUSTOM") {
			handleCustomAmountSelect()
		} else {
			setSelectedProductCode(productCode)
			setCustomProduct(null)
		}
	}

	const handleCustomAmountSave = () => {
		const price = parseInt(unformatNumber(customPrice))

		if (!price || price <= 0) {
			toast.error("Harga harus lebih dari 0")
			return
		}
		if (price < 17_000) {
			toast.error("Minimal pembelian Rp 17.000")
			return
		}

		// New calculation
		const baseCoins = Math.floor(price * 0.5882)
		const bonusCoins = Math.floor(baseCoins * 0.05)
		const totalCoins = baseCoins + bonusCoins

		const newCustomProduct: Product = {
			name: "Custom Diamond",
			code: "RIVO_CUSTOM",
			amount: totalCoins,
			purchasePrice: 0,
			price,
			bonusAmount: bonusCoins,
			status: "available",
			badge: null,
		}

		setCustomProduct(newCustomProduct)
		setSelectedProductCode("RIVO_CUSTOM")
		setShowCustomAmountDialog(false)

		toast.success(
			`Custom berhasil: Dasar ${formatNumber(baseCoins)} + Bonus ${formatNumber(
				bonusCoins,
			)} = ${formatNumber(totalCoins)} coin — Rp ${formatNumber(price)}`,
		)
	}

	const handlePurchase = () => {
		if (!selectedProduct || !userInfo) return
		setShowPaymentDialog(true)
	}

	const handleConfirmAndRedirect = async () => {
		if (!selectedProduct || !userInfo) return

		const payload: {
			amount: number
			clientId: number
			phoneNumber: string
			productCode: string
			totalAmount: number
			bonusAmount: number
			price?: number
		} = {
			amount: selectedProduct.amount,
			clientId: Number(userIdToCheck),
			phoneNumber: whatsApp,
			productCode: selectedProduct.code,
			totalAmount:
				selectedProduct.code === "RIVO_CUSTOM"
					? selectedProduct.amount
					: selectedProduct.amount + (selectedProduct.bonusAmount || 0),
			bonusAmount: selectedProduct.bonusAmount || 0,
		}

		if (selectedProduct.code === "RIVO_CUSTOM") {
			payload.price = selectedProduct.price
		}

		try {
			setIsLoadingPayment(true)
			const res = await fetch("/api/rivo/invoice", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			})
			const data = await res.json()
			if (!res.ok) throw new Error(data.message || "Gagal buat transaksi")
			// Redirect to dynamic payment page (mobile-first: rely on route)
			window.location.href = `/payment/${data.invoiceId}`
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message)
			else toast.error("Terjadi kesalahan")
		} finally {
			setIsLoadingPayment(false)
			setShowPaymentDialog(false)
		}
	}

	// ----------------------------------------------------------
	// Render
	// ----------------------------------------------------------
	return (
		<div className="min-h-dvh bg-background">
			<div className="mx-auto w-full container  px-3 sm:px-4 md:px-6 py-6 md:py-8">
				<ProductHeader
					title="Top Up Rivo Live Coin"
					subtitle="Rivo Live"
					icon="/logo-rivo.webp?height=60&width=60"
				/>

				{/* Loading state (mobile-first friendly) */}
				{isLoading && (
					<div className="mt-6 text-sm text-muted-foreground">
						Memuat produk…
					</div>
				)}

				<div className="mt-6 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-12">
					{/* Main column */}
					<div className="md:col-span-7 lg:col-span-8 space-y-6">
						<UserInputForm
							onUserIdSubmit={handleCheckId}
							onWhatsAppChange={setWhatsApp}
							isCheckingUser={isCheckingUser}
							userInfo={
								userInfo
									? { username: userInfo.nickName, avatar: userInfo.avatar }
									: undefined
							}
						/>

						{/* Packages */}
						{products?.length ? (
							<CoinPackagesGrid
								packages={products}
								onPackageSelect={handleProductSelect}
								selectedPackageId={selectedProductCode}
							/>
						) : !isLoading ? (
							<div className="rounded-lg border text-center py-8 text-sm text-muted-foreground">
								Belum ada produk tersedia.
							</div>
						) : null}
					</div>

					{/* Summary sidebar: sticks on larger screens, stacks on mobile */}
					<aside className="md:col-span-5 lg:col-span-4 md:sticky md:top-6 h-max">
						<PurchaseSummary
							selectedPackage={selectedProduct || undefined}
							userId={userIdToCheck}
							whatsApp={whatsApp}
							onPurchase={handlePurchase}
							isLoading={isLoadingPayment}
							disabled={!userInfo || !selectedProduct}
							username={userInfo?.nickName}
						/>
					</aside>
				</div>
			</div>

			{/* Payment Confirmation Dialog */}
			<Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
				<DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg">
					<DialogHeader>
						<DialogTitle className="text-center text-xl md:text-2xl font-bold text-purple-700">
							📦 Konfirmasi Pesanan
						</DialogTitle>
					</DialogHeader>

					<div className="mt-4 space-y-4">
						<div className="bg-muted p-3 md:p-4 rounded-lg space-y-2 text-sm md:text-base">
							<p className="flex justify-between items-center gap-2">
								<strong>👤 ID Rivo:</strong>{" "}
								<span>
									<span className="text-purple-700 break-all">
										{userIdToCheck}
									</span>
								</span>
							</p>
							<p className="flex justify-between items-center gap-2">
								<strong>🪙 Coin:</strong>{" "}
								<span>
									<span className="text-indigo-600 font-bold md:text-lg">
										{formatNumber(dialogCoinAmount)} Coin
									</span>
								</span>
							</p>
							<p className="flex justify-between items-center gap-2">
								<span>
									💰<strong>Harga:</strong>{" "}
								</span>
								<span>
									<span className="text-green-600 font-bold md:text-lg">
										Rp {formatNumber(selectedProduct?.price || 0)}
									</span>
								</span>
							</p>
							<p className="flex justify-between items-center gap-2">
								<span>
									💳<strong>Pembayaran:</strong>
								</span>
								<span>QRIS</span>
							</p>

							{selectedProduct &&
								typeof selectedProduct.bonusAmount === "number" &&
								selectedProduct.bonusAmount > 0 && (
									<p className="text-pink-600 font-semibold text-xs md:text-sm justify-between flex items-center gap-2">
										<span>🎁 BONUS 5%: </span>
										<span>
											+{formatNumber(selectedProduct.bonusAmount)} coin
										</span>
									</p>
								)}
						</div>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:items-center">
							<Button
								variant="outline"
								className="w-full sm:w-auto sm:min-w-[160px] py-2 text-sm md:text-base whitespace-nowrap"
								onClick={() => setShowPaymentDialog(false)}
							>
								❌ Batal
							</Button>
							<Button
								className="w-full sm:w-auto sm:min-w-[180px] py-2 text-sm md:text-base whitespace-nowrap"
								onClick={handleConfirmAndRedirect}
								disabled={isLoadingPayment}
							>
								{isLoadingPayment ? (
									<span className="flex items-center justify-center gap-2">
										<Loader2 className="h-4 w-4 animate-spin" />
										Memproses...
									</span>
								) : (
									"✅ Konfirmasi Pesanan"
								)}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Custom Amount Dialog */}
			<Dialog
				open={showCustomAmountDialog}
				onOpenChange={setShowCustomAmountDialog}
			>
				<DialogContent className="w-[calc(100vw-2rem)] sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">
							Custom Amount
						</DialogTitle>
					</DialogHeader>

					<div className="mt-6 space-y-6">
						{/* Input */}
						<div className="space-y-2">
							<Label
								htmlFor="customPrice"
								className="text-base md:text-lg font-medium"
							>
								Nominal Rupiah
							</Label>
							<Input
								id="customPrice"
								type="text"
								inputMode="numeric"
								placeholder="Masukkan nominal"
								value={customPrice}
								onChange={handleCustomPriceChange}
								className="text-lg px-4 py-3"
								aria-describedby="custom-rate"
							/>
							<p
								id="custom-rate"
								className="text-xs md:text-sm text-muted-foreground"
							>
								Rumus: koin dasar = harga × 0.5882, bonus = 5% dari koin dasar.
							</p>
						</div>

						{/* Calculated result */}
						{customPrice &&
							parseInt(unformatNumber(customPrice)) > 0 &&
							(() => {
								const price = parseInt(unformatNumber(customPrice))
								const base = Math.floor(price * 0.5882)
								const bonus = Math.floor(base * 0.05)
								const total = base + bonus
								return (
									<div className="space-y-4">
										<div className="text-right">
											<p className="text-xs md:text-sm text-muted-foreground mb-1">
												Total Harga:
											</p>
											<p className="text-2xl font-bold text-purple-600">
												Rp{customPrice}
											</p>
										</div>
										<div className="rounded-lg bg-green-50 dark:bg-emerald-950/20 p-4 space-y-1">
											<p className="text-xs md:text-sm text-muted-foreground">
												Rincian koin:
											</p>
											<p className="text-sm md:text-base text-green-700">
												Dasar: {formatNumber(base)}
											</p>
											<p className="text-sm md:text-base text-green-700">
												Bonus 5%: {formatNumber(bonus)}
											</p>
											<p className="text-xl font-bold text-green-600">
												Total: {formatNumber(total)} Coin
											</p>
										</div>
									</div>
								)
							})()}

						<Button
							className="w-full"
							onClick={handleCustomAmountSave}
							disabled={
								!customPrice ||
								parseInt(unformatNumber(customPrice || "")) < 17_000
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
