"use client"

import SectionJoinUs from "@/components/section-join-us"
import ProductGrid from "@/components/section-list-product"
import { AcceptPayment } from "@/components/section-payment-carousel"

export default function MainPage() {
	// Show the landing page for non-authenticated users
	return (
		<main className="bg-gradient-deep-space min-h-screen">
			<AcceptPayment />
			<ProductGrid />
			<SectionJoinUs />
		</main>
	)
}
