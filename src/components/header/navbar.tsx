"use client"
import React, { memo, useState } from "react"
import { usePathname } from "next/navigation"
import { NavLink } from "@/components/ui/navlink"
import { NAVIGATION_LINKS } from "@/constants/navigation"
import { cn } from "@/lib/utils"

interface NavbarProps {
	className?: string
}

export const Navbar = memo<NavbarProps>(({ className }) => {
	const pathname = usePathname()
	const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

	return (
		<nav
			className={cn("flex z-100 gap-6 lg:gap-8", className)}
			role="navigation"
			aria-label="Main navigation"
		>
			{NAVIGATION_LINKS.map((link) => (
				<div
					key={link.path}
					className="relative group"
					onMouseEnter={() => link.submenu && setOpenSubmenu(link.path)}
					onMouseLeave={() => setOpenSubmenu(null)}
				>
					<NavLink
						link={link}
						isActive={
							pathname === link.path ||
							!!(
								link.submenu &&
								link.submenu.some((sub) => sub.path === pathname)
							)
						}
						className="text-sm lg:text-base"
					/>

					{link.submenu && (
						<div
							className={cn(
								"absolute top-full left-0 min-w-[200px] bg-gradient-deep-space backdrop-blur-lg rounded-lg shadow-xl border border-white/10 overflow-hidden transition-all duration-300",
								openSubmenu === link.path
									? "opacity-100 visible"
									: "opacity-0 invisible",
							)}
						>
							{link.submenu.map((subLink) => (
								<NavLink
									key={subLink.path}
									link={subLink}
									isActive={pathname === subLink.path}
									className="px-4 py-2 text-sm hover:bg-white/5 flex items-center gap-2"
								/>
							))}
						</div>
					)}
				</div>
			))}
		</nav>
	)
})

Navbar.displayName = "Navbar"
