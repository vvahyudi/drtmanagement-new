"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
	name: string
	url: string
	icon: LucideIcon
}

interface NavBarProps {
	items: NavItem[]
	className?: string
}

export function NavBar({ items, className }: NavBarProps) {
	const [activeTab, setActiveTab] = useState(() => {
		if (typeof window !== "undefined") {
			const currentPath = window.location.pathname
			const found = items.find((item) => item.url === currentPath)
			return found ? found.name : items[0].name
		}
		return items[0].name
	})

	return (
		<div
			className={cn(
				"fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-[2500] mb-6 sm:pt-6 pointer-events-none",
				className,
			)}
		>
			<div className="flex items-center gap-3 bg-gradient-deep-space border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg pointer-events-auto">
				{items.map((item) => {
					const Icon = item.icon
					const isActive = activeTab === item.name

					return (
						<Link
							key={item.name}
							href={item.url}
							onClick={() => setActiveTab(item.name)}
							className={cn(
								"relative cursor-pointer text-sm  font-semibold px-6 py-2 rounded-full transition-colors",
								"text-accent hover:text-accent/80",
								isActive && "bg-muted text-primary",
							)}
						>
							<span className="hidden md:inline">{item.name}</span>
							<span className="md:hidden">
								<Icon size={18} strokeWidth={2.5} />
							</span>
							{isActive && (
								<motion.div
									layoutId="lamp"
									className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
									initial={false}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
									}}
								>
									<div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
										<div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
										<div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
										<div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
									</div>
								</motion.div>
							)}
						</Link>
					)
				})}
			</div>
		</div>
	)
}
