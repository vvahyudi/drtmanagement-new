"use client"

import React, { memo } from "react"
import { usePathname } from "next/navigation"
import { NavLink } from "@/components/ui/navlink"
import { NAVIGATION_LINKS } from "@/constants/navigation"
import { cn } from "@/lib/utils"

interface NavbarProps {
	className?: string
}

export const Navbar = memo<NavbarProps>(({ className }) => {
	const pathname = usePathname()

	return (
		<nav
			className={cn("flex gap-6 lg:gap-8", className)}
			role="navigation"
			aria-label="Main navigation"
		>
			{NAVIGATION_LINKS.map((link) => (
				<NavLink
					key={link.path}
					link={link}
					isActive={pathname === link.path}
					className="text-sm lg:text-base"
				/>
			))}
		</nav>
	)
})

Navbar.displayName = "Navbar"
