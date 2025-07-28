"use client"

import { useState } from "react"
import { CoinPackageCard } from "@/components/coin-package-card"

interface CoinPackage {
	id: string
	coins: number
	price: number
	isHot?: boolean
	cashback?: number
}

interface CoinPackagesGridProps {
	packages: CoinPackage[]
	onPackageSelect?: (packageId: string | null) => void
	selectedPackageId?: string | null
	disabled?: boolean
}

export function CoinPackagesGrid({
	packages,

	onPackageSelect,
}: CoinPackagesGridProps) {
	const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

	const handlePackageSelect = (packageId: string | null) => {
		setSelectedPackage(packageId)
		onPackageSelect?.(packageId)
	}

	return (
		<div className="space-y-6">
			<h2 className="text-lg font-semibold text-gray-900 z-[2000]">
				Pilih Paket Coin
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<CoinPackageCard
					isCustom
					onSelect={() => handlePackageSelect("custom")}
					isSelected={selectedPackage === "custom"}
					coins={0}
					price={0}
				/>

				{packages.map((pkg) => (
					<CoinPackageCard
						key={pkg.id}
						coins={pkg.coins}
						price={pkg.price}
						isHot={pkg.isHot}
						cashback={pkg.cashback}
						onSelect={() => handlePackageSelect(pkg.id)}
						isSelected={selectedPackage === pkg.id}
					/>
				))}
			</div>
		</div>
	)
}
