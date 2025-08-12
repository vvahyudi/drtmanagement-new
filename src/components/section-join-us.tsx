import React from "react"
import Link from "next/link"
import { UserPlus, Users, Instagram, Phone, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JoinOption {
	id: string
	title: string
	description: string
	icon: React.ElementType
	href: string
}

const joinOptions: JoinOption[] = [
	{
		id: "join-talent",
		title: "Join Talent",
		description: "Become part of our creative community",
		icon: UserPlus,
		href: "#",
	},
	{
		id: "our-talents",
		title: "Our Talents",
		description: "Meet our amazing creators",
		icon: Users,
		href: "#",
	},
	{
		id: "instagram",
		title: "Instagram",
		description: "Follow us for daily updates",
		icon: Instagram,
		href: "#",
	},
	{
		id: "contact",
		title: "Contact Us",
		description: "Get in touch with our team",
		icon: Phone,
		href: "#",
	},
]

const SectionJoinUs: React.FC = () => {
	return (
		<section className="w-full px-4 py-20 bg-gradient-to-br from-background to-purple-100/40 dark:to-background relative overflow-hidden">
			{/* Decorative Elements */}
			<Sparkles className="absolute top-10 left-10 w-8 h-8 text-purple-300/20 animate-pulse" />
			<Zap className="absolute bottom-10 right-10 w-10 h-10 text-blue-300/20 animate-pulse delay-100" />
			<div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />

			<div className="max-w-5xl mx-auto relative z-10">
				{/* Header Section */}
				<div className="text-center mb-14">
					<Badge
						variant="outline"
						className="mb-3 px-5 py-2 text-base font-semibold border-primary/30 bg-primary/10 text-primary backdrop-blur-sm"
					>
						Join Our Community
					</Badge>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold  mb-4 tracking-tight">
						Gabung & Tumbuh Bersama Kami
					</h2>
					<p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
						Dapatkan peluang, relasi, dan inspirasi baru di dunia live streaming
						& digital kreatif.
					</p>
				</div>

				{/* Horizontal Card List */}
				<div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
					{joinOptions.map((option, index) => {
						const IconComponent = option.icon
						const gradientColors = [
							"from-emerald-400 to-teal-400",
							"from-cyan-400 to-blue-400",
							"from-purple-400 to-fuchsia-400",
							"from-pink-400 to-rose-400",
						]
						const currentGradient =
							gradientColors[index % gradientColors.length]
						return (
							<Link
								key={option.id}
								href={option.href}
								className="group flex-1 min-w-[220px] max-w-xs"
							>
								<Card className="h-full border border-primary/10 bg-white/70 dark:bg-background/80 shadow-md hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
									<CardContent className="p-6 flex flex-col items-center text-center h-full justify-between">
										<div
											className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${currentGradient} shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}
										>
											<IconComponent
												size={28}
												className="text-white md:w-8 md:h-8"
											/>
										</div>
										<h3 className="text-base md:text-lg font-bold mb-1  group-hover:text-primary transition-colors duration-300">
											{option.title}
										</h3>
										<p className="text-xs text-muted-foreground leading-relaxed mt-1 opacity-90">
											{option.description}
										</p>
									</CardContent>
								</Card>
							</Link>
						)
					})}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-14">
					<Button
						size="lg"
						className="relative px-8 py-3 rounded-full border-2 border-primary bg-gradient-deep-space text-primary font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group overflow-hidden"
					>
						<span className="flex items-center gap-2 relative z-10">
							Explore Opportunities
						</span>
						<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<span className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 rounded-full px-2 py-1 text-xs text-primary font-bold shadow-sm group-hover:bg-white/30 transition-all duration-200">
							🚀
						</span>
					</Button>
				</div>
			</div>
		</section>
	)
}

export default SectionJoinUs
