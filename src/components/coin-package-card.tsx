"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import type { Product } from "@/app/(main)/topup/rivo/client"
import Image from "next/image"

interface CoinPackageCardProps {
	product: Product
	isCustom?: boolean
	onSelect?: () => void
	isSelected?: boolean
}

export function CoinPackageCard({
	product,
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
					<div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center backdrop-blur-sm">
						<div className="text-3xl text-primary-foreground dark:text-primary-foreground font-bold">
							+
						</div>
					</div>
					<h3 className="font-semibold text-primary-foreground dark:text-primary mb-1">
						Custom Amount
					</h3>
					<p className="text-sm text-primary-foreground/80 dark:text-primary/80">
						Klik untuk input
					</p>
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
			{product.badge && (
				<Badge className="absolute -top-2 -right-2 bg-red-500/90 hover:bg-red-600/90  px-3 py-1 text-xs font-medium backdrop-blur-sm">
					{product.badge}
				</Badge>
			)}
			<CardContent className="p-6 text-center">
				<div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center backdrop-blur-sm">
					<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-inner">
						<Image
							src={"/rivo-coin.png"}
							alt="Rivo Coin"
							width={48}
							height={48}
						/>
					</div>
				</div>
				<div className="space-y-1">
					<h3 className="font-semibold text-sm text-primary-foreground dark:text-primary">
						{formatCoins(product.amount)} Coin
						{product.bonusAmount > 0 && (
							<span className="text-sm text-green-500 block">
								+ Bonus {formatCoins(product.bonusAmount)}
							</span>
						)}
					</h3>
					<p className="text-lg font-bold text-primary-foreground dark:text-primary">
						{formatPrice(product.price)}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
