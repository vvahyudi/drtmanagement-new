import React, { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import MobileNavbar from "@/components/header/mobile-navbar"
import { dmSerif } from "@/styles/font"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface HeaderProps {
	className?: string
}

const Header = memo<HeaderProps>(({ className }) => {
	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 py-4 xl:py-6 text-white backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-white/10 transition-all duration-300",
				className,
			)}
		>
			<div className="container mx-auto px-4 relative z-10">
				<div className="flex justify-between items-center">
					{/* Enhanced Logo with Gradient Effects */}
					<Link
						href="/"
						className="group flex gap-3 items-center transition-all duration-300 hover:scale-105"
						aria-label="DRT Management Home"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500 -z-10" />
							<Image
								src="/logo-drt.png"
								alt="DRT Management Logo"
								width={70}
								height={70}
								className="transition-transform duration-300 group-hover:rotate-3 drop-shadow-lg"
								priority
							/>
						</div>

						<div className="flex flex-col">
							<h1
								className={cn(
									dmSerif.className,
									"text-xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent",
								)}
							>
								DRT Entertainment
							</h1>
							<div className="h-px bg-gradient-to-r from-primary via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-1" />
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-6">
						<Navbar />
						<Link href="/register">
							<Button
								className="relative overflow-hidden transition-all duration-300 hover:scale-105 font-semibold group px-6 py-2 h-auto bg-gradient-to-br from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/20"
								size="default"
							>
								<span className="relative z-10 flex items-center gap-2">
									<span className="text-white">Join Talent</span>
								</span>
								<div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
							</Button>
						</Link>
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden">
						<MobileNavbar />
					</div>
				</div>
			</div>
		</header>
	)
})

Header.displayName = "Header"

export default Header
