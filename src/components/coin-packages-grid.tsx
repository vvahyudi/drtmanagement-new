"use client"

import { CoinPackageCard } from "@/components/coin-package-card"
import type { Product } from "@/app/(main)/topup/rivo/client"

interface CoinPackagesGridProps {
	packages: Product[]
	onPackageSelect?: (productCode: string | null) => void
	selectedPackageId?: string | null
	disabled?: boolean
}
export function CoinPackagesGrid({
	packages,
	onPackageSelect,
	selectedPackageId,
}: CoinPackagesGridProps) {
	const handleProductSelect = (productCode: string | null) => {
		onPackageSelect?.(productCode)
	}

	return (
		<div className="space-y-6">
			<h2 className="text-lg font-semibold  z-[2000]">Pilih Paket Coin</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<CoinPackageCard
					isCustom
					onSelect={() => handleProductSelect("RIVO_CUSTOM")}
					isSelected={selectedPackageId === "RIVO_CUSTOM"}
					product={{
						name: "Custom Diamond",
						code: "RIVO_CUSTOM",
						amount: 0,
						purchasePrice: 0,
						price: 0,
						bonusAmount: 0,
						status: "available",
						badge: null,
					}}
				/>

				{packages
					.filter((product) => product.code !== "RIVO_CUSTOM")
					.map((product) => (
						<CoinPackageCard
							key={product.code}
							product={product}
							onSelect={() => handleProductSelect(product.code)}
							isSelected={selectedPackageId === product.code}
						/>
					))}
			</div>
		</div>
	)
}
