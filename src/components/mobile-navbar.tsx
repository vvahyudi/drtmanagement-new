"use client"

import React, { memo, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, UserPlus, Sparkles, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from "@/components/ui/navlink"
import { Separator } from "@/components/ui/separator"
import { dmSerif } from "@/styles/font"
import { NAVIGATION_LINKS } from "@/constants/navigation"
import { cn } from "@/lib/utils"

interface MobileNavbarProps {
	className?: string
}

export const MobileNavbar = memo<MobileNavbarProps>(({ className }) => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const handleLinkClick = useCallback(() => {
		setIsOpen(false)
	}, [])

	const handleOpenChange = useCallback((open: boolean) => {
		setIsOpen(open)
	}, [])

	return (
		<div className={className}>
			<Sheet open={isOpen} onOpenChange={handleOpenChange}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="relative hover:bg-white/10 hover:scale-110 focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
						aria-label="Open mobile menu"
						aria-expanded={isOpen}
					>
						<Menu
							size={24}
							className={cn(
								"text-primary transition-transform duration-300",
								isOpen && "rotate-90",
							)}
						/>
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
					</Button>
				</SheetTrigger>

				<SheetContent
					className="flex flex-col w-80 bg-gradient-deep-space backdrop-blur-xl border-l border-white/10"
					side="right"
				>
					{/* Floating decorative elements */}
					<Sparkles className="absolute top-4 left-4 w-4 h-4 text-purple-300/50 animate-pulse" />
					<Zap className="absolute bottom-4 right-4 w-5 h-5 text-blue-300/50 animate-pulse delay-100" />

					{/* Enhanced Mobile Logo */}
					<div className="mt-8 mb-6 flex justify-center relative z-10">
						<Link
							href="/"
							onClick={handleLinkClick}
							className="group flex flex-col gap-2 items-center transition-transform duration-300 hover:scale-105"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500 -z-10" />
								<Image
									src="/logo-drt.png"
									alt="DRT Management Logo"
									width={80}
									height={80}
									className="transition-transform duration-300 group-hover:rotate-3 drop-shadow-lg"
								/>
							</div>

							<div className="text-center">
								<h1
									className={cn(
										dmSerif.className,
										"text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent",
									)}
								>
									DRT
								</h1>
								<h2
									className={cn(
										dmSerif.className,
										"text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
									)}
								>
									Entertainment
								</h2>
							</div>
						</Link>
					</div>

					<Separator className="mb-6 bg-white/10" />

					{/* Enhanced Mobile Navigation */}
					<nav
						className="flex flex-col gap-3 px-2 flex-1 relative z-10"
						role="navigation"
						aria-label="Mobile navigation"
					>
						{NAVIGATION_LINKS.map((link) => (
							<NavLink
								key={link.path}
								link={link}
								isActive={pathname === link.path}
								onClick={handleLinkClick}
								showIcon
								variant="mobile"
								className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
							/>
						))}

						{/* Enhanced CTA Button */}
						<div className="mt-6 px-2">
							<Link
								href="/register"
								onClick={handleLinkClick}
								className="block group"
							>
								<Button
									className="w-full relative overflow-hidden font-semibold py-3 h-auto bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg shadow-primary/20"
									size="lg"
								>
									<span className="relative z-10 flex items-center justify-center gap-2">
										<UserPlus size={20} className="text-white" />
										<span className="text-white">Join Talent</span>
									</span>
									<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									<Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
								</Button>
							</Link>
						</div>
					</nav>

					{/* Mobile Footer */}
					<div className="mt-auto pb-6 px-4 relative z-10">
						<Separator className="mb-4 bg-white/10" />
						<p className="text-xs text-white/60 text-center">
							© {new Date().getFullYear()} DRT Management. All rights reserved.
						</p>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
})

MobileNavbar.displayName = "MobileNavbar"

export default MobileNavbar
