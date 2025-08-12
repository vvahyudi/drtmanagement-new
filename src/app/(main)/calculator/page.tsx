"use client"

import Link from "next/link"
import { Calculator, Sparkles } from "lucide-react"

const platforms = [
	{
		name: "Dazz",
		color: "bg-gradient-purple-pink",
		iconColor: "text-pink-100",
		href: "/calculator/dazz",
		description: "Kalkulator pendapatan & reward agensi Dazz",
	},
	{
		name: "Duku",
		color: "bg-gradient-yellow-red",
		iconColor: "text-yellow-100",
		href: "/calculator/duku",
		description: "Hitung gaji dan bonus performa di Duku",
	},
	{
		name: "Mico",
		color: "bg-gradient-cyan-blue",
		iconColor: "text-cyan-100",
		href: "/calculator/mico",
		description: "Estimasi penghasilan dan reward mingguan",
	},
]

export default function KalkulatorPage() {
	return (
		<div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
			{/* Header */}
			<div className="text-center space-y-4">
				<div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-cyan-blue shadow-md">
					<Calculator className="w-8 h-8 text-white" />
				</div>
				<h1 className="text-3xl md:text-4xl font-bold text-foreground">
					Pilih Platform
				</h1>
				<p className="text-muted-foreground max-w-xl mx-auto">
					Hitung pendapatan streaming kamu dan dapatkan estimasi reward dari
					agensi 🎯
				</p>
			</div>

			{/* Platform Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{platforms.map((platform) => (
					<Link
						key={platform.name}
						href={platform.href}
						className={`group relative p-6 rounded-2xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden text-foreground ring-1 ring-border bg-card backdrop-blur-lg`}
					>
						<div
							className={`absolute inset-0 ${platform.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-md`}
						/>
						<div className="relative z-10">
							<div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
								<Sparkles className={`w-6 h-6 ${platform.iconColor}`} />
							</div>
							<h2 className="text-xl font-semibold mb-1">{platform.name}</h2>
							<p className="text-sm text-muted-foreground">
								{platform.description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
