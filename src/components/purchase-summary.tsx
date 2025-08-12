"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import type { Product } from "@/app/(main)/topup/rivo/client"

interface PurchaseSummaryProps {
	selectedPackage?: Product
	userId?: string
	whatsApp?: string
	onPurchase?: () => void
	isLoading?: boolean
	disabled?: boolean
	username?: string
}

export function PurchaseSummary({
	selectedPackage,
	userId,
	username,
	whatsApp,
	onPurchase,
	isLoading,
	disabled,
}: PurchaseSummaryProps) {
	const formatPrice = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
			.format(amount)
			.replace("IDR", "Rp")
	}

	const formatCoins = (amount: number) => {
		return new Intl.NumberFormat("id-ID").format(amount)
	}

	const isValid = selectedPackage && userId && whatsApp

	if (!selectedPackage) return null

	return (
		<>
			{/* Desktop / Tablet: Sidebar Card */}
			<Card className="sticky top-4 hidden md:block">
				<CardContent className="space-y-4 p-4">
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<span className="text-lg">👤</span>
							<span className="text-gray-500 text-sm">ID Rivo:</span>
							<span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-semibold ml-auto">
								{userId || "-"}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-lg">🪙</span>
							<span className="text-gray-500 text-sm">Coin:</span>
							<span className="text-purple-700 font-bold text-lg ml-auto">
								{formatCoins(selectedPackage.amount)} Coin
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-lg">💰</span>
							<span className="text-gray-500 text-sm">Harga:</span>
							<span className="text-green-600 font-bold text-lg ml-auto">
								{formatPrice(selectedPackage.price)}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-lg">💳</span>
							<span className="text-gray-500 text-sm">Pembayaran:</span>
							<span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold ml-auto">
								QRIS
							</span>
						</div>
						{selectedPackage.bonusAmount > 0 && (
							<div className="flex items-center gap-2 bg-purple-50 rounded-lg p-2 mt-2">
								<span className="text-lg">🎁</span>
								<span className="font-bold text-purple-700">BONUS 5%!</span>
								<span className="text-green-600 font-semibold">
									+{formatCoins(selectedPackage.bonusAmount)} coins gratis
								</span>
							</div>
						)}
						<div className="flex items-center gap-2">
							<span className="text-lg">📱</span>
							<span className="text-gray-500 text-sm">WhatsApp:</span>
							<span className="ml-auto">{whatsApp || "-"}</span>
						</div>
					</div>

					<Button
						className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
						size="lg"
						disabled={!isValid || disabled}
						onClick={onPurchase}
					>
						{isLoading
							? "Memproses..."
							: isValid
							? "Beli Sekarang"
							: "Lengkapi Data"}
					</Button>

					{username && (
						<p className="text-sm text-center text-green-600 mt-2">
							Mengirim ke: {username}
						</p>
					)}

					{!isValid && (
						<p className="text-sm text-gray-500 text-center mt-2">
							Harap lengkapi semua data untuk melanjutkan
						</p>
					)}
				</CardContent>
			</Card>

			{/* Mobile: Fixed bottom purchase bar */}
			<div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto px-3 py-3 flex items-center gap-3">
					<div className="flex-1 min-w-0">
						<p className="text-xs text-muted-foreground truncate">
							{selectedPackage.code === "RIVO_CUSTOM"
								? "Custom Coin"
								: selectedPackage.name}
						</p>
						<p className="text-sm font-medium truncate">
							{formatCoins(selectedPackage.amount)} coins
							{selectedPackage.bonusAmount > 0 && (
								<span className="text-green-600 font-semibold">
									{" "}
									(+{formatCoins(selectedPackage.bonusAmount)} bonus)
								</span>
							)}
						</p>
						<p className="text-sm font-bold text-primary">
							{formatPrice(selectedPackage.price)}
						</p>
						<p className="text-[11px] text-muted-foreground">via QRIS</p>
					</div>
					<Button
						className="min-w-[140px] whitespace-nowrap"
						size="lg"
						onClick={onPurchase}
						disabled={!isValid || disabled}
					>
						{isLoading
							? "Memproses..."
							: isValid
							? "Bayar Sekarang"
							: "Lengkapi Data"}
					</Button>
				</div>
				<div className="h-[env(safe-area-inset-bottom)]" />
			</div>

			{/* Spacer so fixed bar doesn't cover content on mobile */}
			<div className="md:hidden h-24" />
		</>
	)
}
