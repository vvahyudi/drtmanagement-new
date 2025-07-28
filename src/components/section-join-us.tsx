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
		<section className="w-full px-4 py-16 bg-gradient-deep-space relative overflow-hidden">
			{/* Floating decorative elements */}
			<Sparkles className="absolute top-20 left-10 w-6 h-6 text-purple-300/30 animate-pulse" />
			<Zap className="absolute bottom-20 right-10 w-8 h-8 text-blue-300/30 animate-pulse delay-100" />
			<div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

			<div className="max-w-7xl mx-auto relative z-10">
				{/* Header Section */}
				<div className="text-center mb-12">
					<Badge
						variant="outline"
						className="mb-4 px-4 py-2 text-sm font-medium border-white/20 bg-white/5 text-accent backdrop-blur-sm"
					>
						Join Our Community
					</Badge>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
						COME JOIN US!
					</h1>
					<p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
						Kreativitas Tanpa Batas di Dunia Live Streaming
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-6 rounded-full" />
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
					{joinOptions.map((option, index) => {
						const IconComponent = option.icon
						const gradientColors = [
							"from-emerald-500 to-teal-500",
							"from-cyan-500 to-blue-500",
							"from-purple-500 to-fuchsia-500",
							"from-pink-500 to-rose-500",
						]
						const currentGradient =
							gradientColors[index % gradientColors.length]

						return (
							<Link
								key={option.id}
								href={option.href}
								className="group block transform transition-all duration-300 hover:scale-[1.03]"
							>
								<Card
									className={`
                    h-full border border-white/20 bg-white/5 backdrop-blur-sm
                    transition-all duration-300 hover:border-white/30
                    hover:bg-white/10 hover:shadow-lg
                  `}
								>
									<CardContent className="p-6 flex flex-col items-center text-center h-full justify-between min-h-[220px]">
										{/* Icon Container */}
										<div
											className={`
                        w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-4
                        bg-gradient-to-br ${currentGradient} shadow-lg
                        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
                      `}
										>
											<IconComponent
												size={32}
												className="text-white md:w-10 md:h-10"
											/>
										</div>

										{/* Content */}
										<div className="flex-1 flex flex-col justify-center">
											<h3
												className={`
                          text-lg md:text-xl font-bold mb-2 text-white
                          transition-colors duration-300
                        `}
											>
												{option.title}
											</h3>
											<p className="text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												{option.description}
											</p>
										</div>

										{/* Hover Effect Indicator */}
										<div
											className={`
                        w-full h-1 bg-gradient-to-r ${currentGradient} rounded-full mt-4
                        transform scale-x-0 group-hover:scale-x-100
                        transition-transform duration-300 origin-left
                      `}
										/>
									</CardContent>
								</Card>
							</Link>
						)
					})}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-12">
					<Button
						size="lg"
						className={`
              bg-gradient-to-r from-primary to-purple-600 text-white font-semibold
              px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
              transform hover:scale-105 relative overflow-hidden group
            `}
					>
						<span className="relative z-10">Explore Opportunities</span>
						<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
					</Button>
				</div>
			</div>
		</section>
	)
}

export default SectionJoinUs
