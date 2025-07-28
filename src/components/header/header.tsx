"use client"
import { Home } from "lucide-react"
import React, { memo } from "react"

import { NavBar } from "@/components/ui/tubelight-navbar"
import { NAVIGATION_LINKS } from "@/constants/navigation"

interface HeaderProps {
	className?: string
}

const navItems = NAVIGATION_LINKS.map((link) => ({
	name: link.name,
	url: link.path,
	icon: link.icon ?? Home,
}))

const Header = memo<HeaderProps>(({ className }) => {
	return (
		<header className={className}>
			{/* Desktop navigation */}
			<div className="hidden md:block">
				<NavBar items={navItems} />
			</div>
			{/* Mobile fluid menu */}
			<div className="md:hidden flex justify-center items-center py-2">
				<div className="flex items-center justify-between w-full max-w-sm">
					{/* Fluid menu for mobile */}
					<MobileFluidMenu />
				</div>
			</div>
			{/* Background decoration */}
		</header>
	)
})

Header.displayName = "Header"

import { MobileFluidMenu } from "@/components/ui/fluid-menu"
export default Header
