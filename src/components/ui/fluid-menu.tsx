"use client"

import React, { useState } from "react"
import { Menu as MenuIcon, X } from "lucide-react"
import { NAVIGATION_LINKS } from "@/constants/navigation"
import Link from "next/link"
import Image from "next/image"

interface MenuItemProps {
	children?: React.ReactNode
	onClick?: () => void
	icon?: React.ReactElement<React.SVGProps<SVGSVGElement>> // More specific type
	href?: string
}

function MenuItem({ children, onClick, icon, href }: MenuItemProps) {
	const content = (
		<div className="flex items-center h-full px-4 gap-3">
			{icon && (
				<span className="flex-shrink-0">
					{React.cloneElement(icon, {
						className: `${
							icon.props.className || ""
						} w-6 h-6 stroke-[2.5] text-white`,
					})}
				</span>
			)}
			<span className="text-white font-medium text-base">{children}</span>
		</div>
	)
	return href ? (
		<Link
			href={href}
			className="block w-full h-16 hover:bg-slate-700/50 transition-colors"
			onClick={onClick}
		>
			{content}
		</Link>
	) : (
		<button
			className="block w-full h-16 hover:bg-slate-700/50 transition-colors"
			onClick={onClick}
		>
			{content}
		</button>
	)
}

export function MobileFluidMenu() {
	const [isExpanded, setIsExpanded] = useState(false)
	const toggleMenu = () => setIsExpanded((prev) => !prev)

	const menuButtonClass = `
	relative w-auto px-4 h-16 bg-gradient-deep-space 
	cursor-pointer rounded-full shadow-lg border border-white/20 
	hover:scale-105 transition-all duration-300 z-50
	flex items-center justify-center gap-2
  `

	const menuItemClass = `
  absolute top-0 left-0 w-48 h-16 bg-gradient-deep-space  
  shadow-lg border border-white/20 rounded-lg overflow-hidden
  transition-all duration-300 ease-in-out will-change-transform
  `

	return (
		<div className="fixed top-6 left-6 z-[2000] pointer-events-none">
			<div className="relative z-[2000] pointer-events-auto">
				{/* Main toggle button */}
				<button
					className={menuButtonClass}
					onClick={toggleMenu}
					aria-expanded={isExpanded}
					aria-label="Toggle menu"
				>
					<div className="relative w-6 h-6">
						<MenuIcon
							size={24}
							strokeWidth={2}
							className={`text-white absolute inset-0 transition-all duration-300 ${
								isExpanded ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
							}`}
						/>
						<X
							size={24}
							strokeWidth={2}
							className={`text-white absolute inset-0 transition-all duration-300 ${
								isExpanded ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
							}`}
						/>
					</div>
					<span
						className={`text-white font-medium transition-all duration-300 ${
							isExpanded ? "opacity-0" : "opacity-100"
						}`}
					>
						Menu
					</span>
					<span
						className={`text-gradient-purple-pink font-medium transition-all duration-300 ${
							isExpanded ? "opacity-0" : "opacity-100"
						}`}
					>
						DRT Entertainment
					</span>
					<Image
						src="/logo-drt.png"
						alt="DRT Logo"
						width={24}
						height={24}
						className="w-6 h-6 ml-2"
						style={{ opacity: isExpanded ? 0 : 1 }}
						aria-hidden={true}
					/>
				</button>

				{/* Navigation items */}
				<nav aria-hidden={!isExpanded}>
					{NAVIGATION_LINKS.map((link, index) => (
						<div
							key={link.name}
							className={menuItemClass}
							style={{
								transform: `translateY(${isExpanded ? (index + 1) * 60 : 0}px)`,
								opacity: isExpanded ? 1 : 0,
								zIndex: 40 - index,
								transitionDelay: isExpanded ? `${index * 50}ms` : "0ms",
							}}
						>
							<MenuItem
								href={link.path}
								icon={link.icon && <link.icon />}
								onClick={toggleMenu}
							>
								{link.name}
							</MenuItem>
						</div>
					))}
				</nav>
			</div>
		</div>
	)
}
