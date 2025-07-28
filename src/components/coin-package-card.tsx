"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CoinPackageCardProps {
	coins: number
	price: number
	isHot?: boolean
	cashback?: number
	isCustom?: boolean
	onSelect?: () => void
	isSelected?: boolean
}

export function CoinPackageCard({
	coins,
	price,
	isHot = false,
	cashback,
	isCustom = false,
	onSelect,
	isSelected = false,
}: CoinPackageCardProps) {
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

	const glassEffect = `
	backdrop-filter backdrop-blur-lg
	bg-gradient-deep-space-alt border border-border
	shadow-lg hover:shadow-xl
	transition-all duration-300
  `

	if (isCustom) {
		return (
			<Card
				className={`relative cursor-pointer ${glassEffect} ${
					isSelected ? "ring-3 ring-fuchsia-700 bg-gradient-purple-pink" : ""
				}`}
				onClick={onSelect}
			>
				<CardContent className="p-6 text-center">
					<div className="w-16 h-16 mx-auto mb-4 bg-gradient-deep-space rounded-full flex items-center justify-center backdrop-blur-sm">
						<div className="text-3xl text-accent font-bold">+</div>
					</div>
					<h3 className="font-semibold text-accent mb-1">Custom Amount</h3>
					<p className="text-sm text-accent/80">Klik untuk input</p>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card
			className={`relative cursor-pointer ${glassEffect} ${
				isSelected ? "ring-3 ring-fuchsia-700 bg-gradient-purple-pink" : ""
			}`}
			onClick={onSelect}
		>
			{isHot && (
				<Badge className="absolute -top-2 -right-2 bg-red-500/90 hover:bg-red-600/90 text-white px-3 py-1 text-xs font-medium backdrop-blur-sm">
					Hot
				</Badge>
			)}
			<CardContent className="p-6 text-center">
				<div className="w-16 h-16 mx-auto mb-4 bg-gradient-deep-space-alt rounded-full flex items-center justify-center backdrop-blur-sm">
					<div className="w-12 h-12 bg-gradient-deep-space-alt rounded-full flex items-center justify-center shadow-inner">
						<div className="text-3xl">🪙</div>
					</div>
				</div>
				<div className="space-y-1">
					<h3 className="font-semibold text-sm text-accent">
						{formatCoins(coins)} Coin
						{cashback && (
							<span className="text-sm text-green-500 block">
								+ Cashback {cashback}%
							</span>
						)}
					</h3>
					<p className="text-lg font-bold text-accent">{formatPrice(price)}</p>
				</div>
			</CardContent>
		</Card>
	)
}
