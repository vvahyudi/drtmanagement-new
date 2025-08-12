"use client"
import React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { NAVIGATION_LINKS } from "@/constants/navigation"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

export function NewHeader() {
	const [menuState, setMenuState] = React.useState(false)
	const [isScrolled, setIsScrolled] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<header>
			<nav
				data-state={menuState && "active"}
				className="fixed z-20 w-full px-2 group"
			>
				<div
					className={cn(
						"mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
						isScrolled &&
							"bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
					)}
				>
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2"
							>
								{/* <Logo /> */}
								<Image src="/logo-drt.png" alt="Logo" width={40} height={40} />
							</Link>

							<div className="flex items-center gap-2">
								{/* Mobile theme toggle (hidden on lg and above) */}
								<div className="lg:hidden">
									<ThemeToggle />
								</div>
								<button
									onClick={() => setMenuState(!menuState)}
									aria-label={menuState ? "Close Menu" : "Open Menu"}
									className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
								>
									<Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
									<X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
								</button>
							</div>
						</div>

						<div className="absolute inset-0 m-auto hidden size-fit lg:flex items-center gap-4">
							<ul className="flex gap-8 text-sm">
								{NAVIGATION_LINKS.map((item, index) => (
									<li key={index}>
										<Link
											href={item.path}
											className="text-primary font-semibold  hover:text-accent-foreground block duration-150"
										>
											<span>{item.name}</span>
										</Link>
									</li>
								))}
							</ul>
							<ThemeToggle />
						</div>

						<div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{NAVIGATION_LINKS.map((item, index) => (
										<li key={index}>
											<Link
												href={item.path}
												className="text-primary font-semibold  hover:text-accent-foreground block duration-150"
												onClick={() => setMenuState(false)}
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
							{/* Action buttons can be added here if needed */}
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
