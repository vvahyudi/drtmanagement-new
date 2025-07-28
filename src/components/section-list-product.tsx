"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Product {
	id: number
	name: string
	image: string
	gradient: string
	badges: {
		label: string
		variant: "default" | "secondary" | "destructive" | "outline"
	}[]
	available: boolean
	link?: string
}

const products: Product[] = [
	{
		id: 1,
		name: "DUKU MOMENT",
		image: "/logo-duku.jpeg",
		gradient: "bg-gradient-to-br from-green-400 to-emerald-500",
		badges: [
			{ label: "CUSTOM AMOUNT", variant: "default" },
			{ label: "SUPPORT API", variant: "secondary" },
		],
		available: true,
	},
	{
		id: 2,
		name: "DAZZ LIVE",
		image: "/logo-dazz.webp",
		gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
		badges: [
			{ label: "SUPPORT API", variant: "secondary" },
			{ label: "CUSTOM AMOUNT", variant: "default" },
		],
		available: false,
	},
	{
		id: 3,
		name: "RIVO LIVE",
		image: "/logo-rivo.webp",
		gradient: "bg-gradient-to-br from-rose-500 to-pink-600",
		badges: [
			{ label: "CUSTOM AMOUNT", variant: "default" },
			{ label: "SUPPORT API", variant: "secondary" },
		],
		available: true,
		link: "/topup/rivo",
	},
	{
		id: 4,
		name: "MICO LIVE",
		image: "/logo-mico.png",
		gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
		badges: [
			{ label: "CUSTOM AMOUNT", variant: "default" },
			{ label: "SUPPORT API", variant: "secondary" },
		],
		available: false,
	},
]

export default function ProductGrid() {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 relative z-100">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12 space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold text-accent">
						Layanan Topup
					</h1>
					<h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
						Support API Top Up Cepat, Fleksibel & Otomatis
					</h2>
					<p className="text-muted-foreground/80 max-w-2xl mx-auto">
						API Langsung & Custom Nominal, Top Up Jadi Makin Mudah!
					</p>
				</div>

				{/* Rivo User Check */}

				{/* Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<Card
							key={product.id}
							className={cn(
								"relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
								!product.available && "opacity-70 cursor-not-allowed",
							)}
						>
							{/* Badges */}
							<div className="absolute top-3 left-3 right-3 flex justify-between z-20">
								{product.badges.map((badge, index) => (
									<Badge
										key={index}
										variant={badge.variant}
										className={cn(
											"text-xs font-bold",
											badge.variant === "default" &&
												"bg-green-500 hover:bg-green-600",
											badge.variant === "secondary" &&
												"bg-purple-500 hover:bg-purple-600",
										)}
									>
										{badge.label}
									</Badge>
								))}
							</div>

							{/* Image with Gradient Background */}
							<CardHeader
								className={cn(
									"p-0 h-48 relative overflow-hidden",
									product.gradient,
								)}
							>
								<div className="absolute inset-0 flex items-center justify-center p-8">
									<div className="relative w-32 h-32">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="object-contain rounded-4xl drop-shadow-lg"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									</div>
								</div>
							</CardHeader>

							{/* Coming Soon Overlay */}
							{!product.available && (
								<div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
									<div className="bg-white/90 text-black px-4 py-2 rounded-full font-bold text-sm">
										Coming Soon
									</div>
								</div>
							)}

							{/* Product Info */}
							<CardFooter className="flex-col items-center p-6 bg-gradient-to-b from-card to-card/80">
								<h3 className="text-lg font-bold text-center">
									{product.name}
								</h3>
								{product.available && product.link ? (
									<Link
										href={product.link}
										className={cn(
											"mt-4 w-full py-2 rounded-md font-medium transition-colors text-center block",
											"bg-primary text-primary-foreground hover:bg-primary/90",
										)}
									>
										Top Up Now
									</Link>
								) : (
									<button
										className={cn(
											"mt-4 w-full py-2 rounded-md font-medium transition-colors",
											product.available
												? "bg-primary text-primary-foreground hover:bg-primary/90"
												: "bg-gray-400 text-gray-800 cursor-not-allowed",
										)}
										disabled={!product.available}
									>
										{product.available ? "Top Up Now" : "Unavailable"}
									</button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
