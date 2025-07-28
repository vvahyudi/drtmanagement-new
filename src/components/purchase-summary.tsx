"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface PurchaseSummaryProps {
	selectedPackage?: {
		coins: number
		price: number
		cashback?: number
	}
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

	if (!selectedPackage) {
		return null
	}

	return (
		<Card className="sticky top-4">
			<CardHeader>
				<CardTitle className="text-lg">Ringkasan Pembelian</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-gray-600">Paket:</span>
						<span className="font-medium">
							{formatCoins(selectedPackage.coins)} Coin
						</span>
					</div>
					{selectedPackage.cashback && (
						<div className="flex justify-between">
							<span className="text-gray-600">Cashback:</span>
							<span className="font-medium text-green-600">
								{selectedPackage.cashback}%
							</span>
						</div>
					)}
					<div className="flex justify-between">
						<span className="text-gray-600">Rivo Live ID:</span>
						<span className="font-medium">{userId || "-"}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">WhatsApp:</span>
						<span className="font-medium">{whatsApp || "-"}</span>
					</div>
				</div>

				<Separator />

				<div className="flex justify-between text-lg font-bold">
					<span>Total:</span>
					<span>{formatPrice(selectedPackage.price)}</span>
				</div>

				<Button
					className="w-full bg-purple-600 hover:bg-purple-700"
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
					<p className="text-sm text-center text-green-600">
						Mengirim ke: {username}
					</p>
				)}

				{!isValid && (
					<p className="text-sm text-gray-500 text-center">
						Harap lengkapi semua data untuk melanjutkan
					</p>
				)}
			</CardContent>
		</Card>
	)
}
