"use client"

import React from "react"
import { dmSerif } from "@/styles/font"
import Image from "next/image"
import Link from "next/link"

// Footer navigation item interface
interface NavItem {
	label: string
	href: string
	external?: boolean
}

// Footer section interface
interface FooterSection {
	title: string
	items: NavItem[]
}

const Footer: React.FC = () => {
	// Memoized navigation data to prevent re-creation on each render
	const footerSections: FooterSection[] = React.useMemo(
		() => [
			{
				title: "Layanan Kami",
				items: [
					{ label: "Top Up", href: "/topup" },
					{ label: "Partnership", href: "/partnership" },
					{ label: "Talent Recruitment", href: "/talent-recruitment" },
				],
			},
			{
				title: "DRT Entertainment",
				items: [
					{ label: "Talent ", href: "#" },
					{ label: "Tentang Kami", href: "/about" },
					{ label: "Kontak", href: "/contact" },
				],
			},
		],
		[],
	)

	// Handle navigation clicks with analytics tracking
	const handleNavClick = React.useCallback((href: string, label: string) => {
		// Add analytics tracking here if needed
		console.log(`Footer navigation: ${label} -> ${href}`)
	}, [])

	return (
		<footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden ">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
			<div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

			{/* Main content */}
			<div className="relative container mx-auto px-6 py-6 lg:px-8 lg:py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* Brand section */}
					<div className="lg:col-span-1">
						<div className="flex items-center gap-4 mb-6">
							<div className="relative group">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
								<div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
									<Image
										src="/logo-drt.png"
										alt="DRT Entertainment Logo"
										width={60}
										height={60}
										className="w-15 h-15 object-contain"
										priority
									/>
								</div>
							</div>

							<div className={`${dmSerif.className} flex flex-col`}>
								<span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
									DRT
								</span>
								<span className="text-xl text-slate-200 font-medium">
									Entertainment
								</span>
							</div>
						</div>

						<p className="text-slate-300 leading-relaxed max-w-md text-sm">
							Broadcasting and Live Entertainment solutions tailored for modern
							digital experiences.
						</p>

						{/* Social links placeholder */}
						<div className="flex gap-4 mt-6">
							{["twitter", "linkedin", "instagram"].map((social) => (
								<button
									key={social}
									className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
									aria-label={`Follow us on ${social}`}
								>
									<div className="w-5 h-5 bg-slate-300 group-hover:bg-white rounded-sm transition-colors duration-300" />
								</button>
							))}
						</div>
					</div>

					{/* Navigation sections */}
					<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
						{footerSections.map((section) => (
							<nav key={section.title} className="space-y-4">
								<h3 className="text-lg font-semibold text-white mb-6 relative">
									{section.title}
									<div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
								</h3>

								<ul className="space-y-3">
									{section.items.map((item) => (
										<li key={item.label}>
											{item.external ? (
												<a
													href={item.href}
													target="_blank"
													rel="noopener noreferrer"
													onClick={() => handleNavClick(item.href, item.label)}
													className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 ease-out"
												>
													<span className="relative ">
														{item.label}
														<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
													</span>
													<svg
														className="w-3 h-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
														/>
													</svg>
												</a>
											) : (
												<Link
													href={item.href}
													onClick={() => handleNavClick(item.href, item.label)}
													className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 ease-out"
												>
													<span className="relative text-sm lg:text-base">
														{item.label}
														<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
													</span>
												</Link>
											)}
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>

				{/* Bottom section */}
				<div className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-xs text-slate-400 text-center md:text-left">
						© {new Date().getFullYear()} DRT Entertainment. All rights reserved.
					</p>

					<div className="flex items-center gap-6 text-xs text-slate-400">
						<Link
							href="/privacy"
							className="hover:text-white transition-colors duration-300"
						>
							Kebijakan Privasi
						</Link>
						<Link
							href="/terms"
							className="hover:text-white transition-colors duration-300"
						>
							Ketentuan Layanan
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default React.memo(Footer)
