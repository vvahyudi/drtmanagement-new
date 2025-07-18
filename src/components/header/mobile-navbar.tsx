"use client"
import React, { memo, useCallback, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Menu, UserPlus, Sparkles, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dmSerif } from "@/styles/font"
import { NAVIGATION_LINKS } from "@/constants/navigation"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"

interface MobileNavbarProps {
	className?: string
}

export const MobileNavbar = memo<MobileNavbarProps>(({ className }) => {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [openAccordion, setOpenAccordion] = useState<string | undefined>(
		undefined,
	)

	const handleLinkClick = useCallback(() => {
		setIsOpen(false)
		setOpenAccordion(undefined)
	}, [])

	const handleOpenChange = useCallback((open: boolean) => setIsOpen(open), [])

	const handleAccordionChange = useCallback(
		(value: string | undefined) => setOpenAccordion(value),
		[],
	)

	return (
		<div className={className}>
			<Sheet open={isOpen} onOpenChange={handleOpenChange}>
				<SheetTrigger asChild>
					<Button
						variant="default"
						size="icon"
						className="relative hover:scale-110 focus:ring-2 focus:ring-primary/50 backdrop-blur-sm z-30"
						aria-label="Open mobile menu"
					>
						<Menu
							size={24}
							className={cn(
								"text-primary transition-transform duration-300",
								isOpen && "rotate-90",
							)}
						/>
						<div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
					</Button>
				</SheetTrigger>

				<SheetContent
					side="right"
					className="flex flex-col w-[85vw] max-w-[320px] h-[100dvh] backdrop-blur-xl border-l border-white/10 pt-safe-top pb-safe-bottom z-[100]"
				>
					{/* Decorative elements */}
					<Sparkles className="absolute top-4 left-4 w-4 h-4 text-purple-300/50 animate-pulse" />
					<Zap className="absolute bottom-4 right-4 w-5 h-5 text-blue-300/50 animate-pulse delay-100" />

					{/* Logo Section */}
					<div className="mt-8 mb-6 flex justify-center">
						<Link
							href="/"
							onClick={handleLinkClick}
							className="group flex flex-col items-center gap-2"
						>
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-border-slate rounded-full blur-md group-hover:blur-lg transition-all duration-500 -z-10" />
								<Image
									src="/logo-drt.png"
									alt="DRT Management Logo"
									width={60}
									height={60}
									className="transition-transform duration-300 group-hover:rotate-3 drop-shadow-lg"
								/>
							</div>
							<div className="text-center">
								<h1
									className={cn(
										dmSerif.className,
										"text-2xl font-bold text-gradient-cyan-blue ",
									)}
								>
									DRT
								</h1>
								<h2
									className={cn(
										dmSerif.className,
										"text-xl font-bold text-gradient-purple-pink ",
									)}
								>
									Entertainment
								</h2>
							</div>
						</Link>
					</div>

					<Separator className="mb-4 " />

					{/* Navigation Content */}
					<div className="text-gradient-cyan-blue flex-1 overflow-y-auto">
						<Accordion
							type="single"
							collapsible
							value={openAccordion}
							onValueChange={handleAccordionChange}
							className="space-y-1"
						>
							{NAVIGATION_LINKS.map((link) => (
								<React.Fragment key={link.path}>
									{link.submenu ? (
										<AccordionItem value={link.path} className="border-none">
											<AccordionTrigger
												className={cn(
													"px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors",
													(openAccordion === link.path ||
														pathname === link.path ||
														link.submenu.some(
															(sub) => sub.path === pathname,
														)) &&
														"bg-white/5",
												)}
											>
												<span className="flex items-center gap-2">
													{link.icon && <link.icon className="w-4 h-4" />}
													{link.name}
												</span>
											</AccordionTrigger>
											<AccordionContent className="pt-1 pb-0">
												<div className="ml-4 pl-3 border-l border-white/10 space-y-1">
													{link.submenu.map((subLink) => (
														<Link
															key={subLink.path}
															href={subLink.path}
															onClick={handleLinkClick}
															className={cn(
																"flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
																"hover:bg-white/5 transition-colors",
																pathname === subLink.path && " font-medium",
															)}
														>
															{subLink.icon && (
																<subLink.icon className="w-4 h-4" />
															)}
															{subLink.name}
														</Link>
													))}
												</div>
											</AccordionContent>
										</AccordionItem>
									) : (
										<Link
											href={link.path}
											onClick={handleLinkClick}
											className={cn(
												"flex items-center gap-2 px-3 py-2.5 rounded-lg",
												"hover:bg-white/5 transition-colors",
												pathname === link.path && " font-medium",
												"text-base",
											)}
										>
											{link.icon && <link.icon className="w-4 h-4" />}
											{link.name}
										</Link>
									)}
								</React.Fragment>
							))}
						</Accordion>
					</div>

					{/* CTA Button */}
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
								<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
							</Button>
						</Link>
					</div>

					{/* Footer */}
					<div className="mt-auto pt-4">
						<Separator className="mb-4 " />
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
