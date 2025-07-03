import React, { memo } from "react"
import Link from "next/link"
import { NavigationLink } from "@/types/navigation"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

interface NavLinkProps {
	link: NavigationLink
	isActive: boolean
	className?: string
	showIcon?: boolean
	onClick?: () => void
	variant?: "default" | "mobile"
}

export const NavLink = memo<NavLinkProps>(
	({
		link,
		isActive,
		className,
		showIcon = false,
		onClick,
		variant = "default",
	}) => {
		const IconComponent = link.icon

		const baseStyles = {
			default: cn(
				"relative capitalize font-medium transition-all duration-300",
				"text-white/80 hover:text-white group",
				"backdrop-blur-sm hover:backdrop-blur-md",
			),
			mobile: cn(
				"w-full text-lg py-3 px-4 rounded-lg",
				"backdrop-blur-xl bg-white/5 hover:bg-white/10",
				"border border-white/10 hover:border-white/20",
				"transition-all duration-300 hover:shadow-lg hover:shadow-primary/20",
				"flex items-center justify-center gap-2",
			),
		}

		return (
			<Link
				href={link.path}
				className={cn(
					baseStyles[variant],
					isActive && variant === "default" && "text-white",
					isActive && variant === "mobile" && "bg-white/15 border-white/30",
					className,
				)}
				onClick={onClick}
				aria-current={isActive ? "page" : undefined}
			>
				<div className="flex items-center gap-2 justify-center relative">
					{showIcon && IconComponent && (
						<>
							<IconComponent
								size={20}
								className={cn(
									"transition-transform duration-300",
									variant === "default" && "group-hover:scale-110",
									variant === "mobile" && "group-hover:rotate-6",
									isActive ? "text-primary" : "text-white/80",
								)}
							/>
							{isActive && variant === "mobile" && (
								<Sparkles className="absolute -top-1 -right-2 w-3 h-3 text-yellow-400 animate-pulse" />
							)}
						</>
					)}
					<span>{link.name}</span>
				</div>

				{/* Enhanced active indicator */}
				{variant === "default" && (
					<div
						className={cn(
							"absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-purple-500",
							"transition-all duration-300 rounded-full",
							isActive ? "w-full" : "w-0 group-hover:w-full",
						)}
					/>
				)}
			</Link>
		)
	},
)

NavLink.displayName = "NavLink"
