"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
	id: number
	name: string
	image: string
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
		badges: [
			{ label: "CUSTOM AMOUNT", variant: "default" },
			{ label: "SUPPORT API", variant: "secondary" },
		],
		available: false,
	},
]

export default function ProductGrid() {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 relative">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12 space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold ">Layanan Topup</h1>
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
							<div className="absolute top-3 left-3 right-3 flex justify-between">
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
							<CardHeader className=" overflow-hidden">
								<div className=" inset-0 flex items-center justify-center p-4">
									<div className="relative w-32 h-32">
										<Image
											src={product.image}
											alt={product.name}
											fill
											className="object-contain rounded-4xl drop-shadow-lg"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 33vw"
										/>
									</div>
								</div>
							</CardHeader>

							{/* Coming Soon Overlay */}
							{!product.available && (
								<div className="absolute inset-0 bg-muted-foreground/60 flex items-center justify-center z-30">
									<div className="bg-muted-foreground/90  px-4 py-2 rounded-full font-bold text-sm">
										Coming Soon
									</div>
								</div>
							)}

							{/* Product Info */}
							<CardFooter className="flex-col items-center">
								<h3 className="text-lg font-bold  text-center">
									{product.name}
								</h3>
								{product.available && product.link ? (
									<Button asChild className="mt-4 w-full">
										<Link href={product.link}>Top Up Now</Link>
									</Button>
								) : (
									<Button className="mt-4 w-full" disabled={!product.available}>
										{product.available ? "Top Up Now" : "Unavailable"}
									</Button>
								)}
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
