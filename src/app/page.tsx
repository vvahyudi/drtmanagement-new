"use client"

import Image from "next/image"
import { JSX, useState } from "react"
import {
	Share2,
	PlayCircle,
	Music2,
	Camera,
	MessageCircle,
	ShoppingCart,
	Calculator,
	ChevronDown,
	CircleDollarSign,
	Sparkles,
	Zap,
	Heart,
} from "lucide-react"

// Types
interface Agency {
	name: string
	icon: string
	link: string
}

interface Platform {
	name: string
	icon: string
	submenu?: Agency[]
}

interface TopUpPlatform {
	name: string
	icon: string
	link: string
}

interface LinkItem {
	id?: string
	title: string
	icon: JSX.Element
	image: string
	link?: string
	dropdown?: TopUpPlatform[] | Platform[]
}

// Constants
const ANIMATION_CLASSES = {
	bounce: "animate-bounce",
	pulse: "animate-pulse",
	spin: "animate-spin",
	ping: "animate-ping",
}

const GRADIENT_STYLES = {
	primary: "bg-gradient-purple-pink",
	secondary: "bg-gradient-cyan-blue",
	accent: "bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500",
	glassmorphism: "backdrop-blur-xl bg-white/10 border border-white/20",
}

// Styled Components
const GlassContainer: React.FC<{
	children: React.ReactNode
	className?: string
}> = ({ children, className = "" }) => (
	<div className={`${GRADIENT_STYLES.glassmorphism} ${className}`}>
		{children}
	</div>
)

const FloatingIcon: React.FC<{
	Icon: React.ComponentType<any>
	delay?: string
}> = ({ Icon, delay = "0s" }) => (
	<div
		className="absolute opacity-20 animate-pulse"
		style={{ animationDelay: delay }}
	>
		<Icon className="w-8 h-8 text-purple-300" />
	</div>
)

// Component Props Types
interface PlatformLinkProps {
	platform: Platform
	agency: Agency
	isMico?: boolean
}

interface TopUpLinkProps {
	platform: TopUpPlatform
}

interface HeaderProps {
	title: string
	subtitle: string
	logoSrc: string
}

interface DropdownButtonProps {
	link: LinkItem
	isActive: boolean
	onClick: () => void
}

// Modular Components
const PlatformLink: React.FC<PlatformLinkProps> = ({
	platform,
	agency,
	isMico = false,
}) => {
	const containerClasses = isMico
		? "flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
		: "flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"

	if (isMico) {
		return (
			<a
				href={agency.link}
				target="_blank"
				rel="noopener noreferrer"
				className={containerClasses}
				aria-label={`Join ${agency.name} on ${platform.name}`}
			>
				<div className="flex items-center space-x-3">
					<div className="relative">
						<div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/30 p-0.5">
							<Image
								src={agency.icon}
								width={28}
								height={28}
								alt={`${agency.name} logo`}
								className="w-full h-full object-contain"
							/>
						</div>
						<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
					</div>
					<span className="text-sm font-medium text-white/90 hover:text-white transition-colors">
						{agency.name}
					</span>
				</div>
			</a>
		)
	}

	return (
		<a
			href={agency.link}
			target="_blank"
			rel="noopener noreferrer"
			className={containerClasses}
			aria-label={`Join ${agency.name} on ${platform.name}`}
		>
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center space-x-4">
					<div className="relative group">
						<div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/30 p-1">
							<Image
								src={platform.icon}
								width={48}
								height={48}
								alt={`${platform.name} logo`}
								className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
							/>
						</div>
						<Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
					</div>
					<span className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
						{platform.name}
					</span>
				</div>
				<div className="flex items-center space-x-3">
					<span className="text-sm font-medium text-white/80 hover:text-white transition-colors">
						{agency.name}
					</span>
					<div className="relative">
						<div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/30 p-0.5">
							<Image
								src={agency.icon}
								width={32}
								height={32}
								alt={`${agency.name} logo`}
								className="w-full h-full object-contain"
							/>
						</div>
						<Heart className="absolute -top-1 -right-1 w-3 h-3 text-red-400 animate-pulse" />
					</div>
				</div>
			</div>
		</a>
	)
}

const TopUpLink: React.FC<TopUpLinkProps> = ({ platform }) => (
	<a
		href={platform.link}
		target="_blank"
		rel="noopener noreferrer"
		className="flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 border border-emerald-400/30 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
		aria-label={`Top up coins for ${platform.name}`}
	>
		<div className="flex items-center space-x-4">
			<div className="relative">
				<div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/40 p-1">
					<Image
						src={platform.icon}
						width={48}
						height={48}
						alt={`${platform.name} logo`}
						className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
					/>
				</div>
				<CircleDollarSign className="absolute -top-2 -right-2 w-5 h-5 text-green-400 animate-bounce" />
			</div>
			<span className="text-lg font-bold text-white hover:text-emerald-200 transition-colors">
				{platform.name}
			</span>
		</div>
	</a>
)

const Header: React.FC<HeaderProps> = ({ title, subtitle, logoSrc }) => (
	<GlassContainer className="w-full max-w-md rounded-3xl p-8 shadow-2xl mt-8 relative overflow-hidden">
		{/* Floating background elements */}
		<FloatingIcon Icon={Sparkles} delay="0s" />
		<FloatingIcon Icon={Zap} delay="1s" />
		<FloatingIcon Icon={Heart} delay="2s" />

		<div className="flex flex-col items-center relative z-10">
			<div className="relative group mb-6">
				{/* Animated rings */}
				<div className="absolute inset-0 bg-gradient-purple-pink rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
				<div
					className="absolute inset-0 bg-gradient-cyan-blue rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-700 animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>

				<div className="relative w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500">
					<div className="w-full h-full rounded-full overflow-hidden backdrop-blur-sm bg-white/10 flex items-center justify-center border border-white/20">
						<Image
							src={logoSrc}
							width={112}
							height={112}
							alt="DRT Logo"
							className="object-contain p-3 transition duration-300 group-hover:scale-110 group-hover:rotate-12"
						/>
					</div>
				</div>

				{/* Orbiting elements */}
				<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
					<Sparkles className="w-4 h-4 text-yellow-400 animate-bounce" />
				</div>
				<div className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2">
					<Zap className="w-5 h-5 text-blue-400 animate-pulse" />
				</div>
			</div>

			<h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-center mb-3 hover:scale-105 transition-transform duration-300">
				{title}
			</h1>
			<p className="text-purple-200 text-center text-base font-medium leading-relaxed">
				{subtitle}
			</p>
		</div>
	</GlassContainer>
)

const DropdownButton: React.FC<DropdownButtonProps> = ({
	link,
	isActive,
	onClick,
}) => (
	<button
		onClick={onClick}
		className={`w-full backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20 rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 ${
			isActive ? "from-white/15 to-white/20 shadow-lg shadow-purple-500/20" : ""
		}`}
		aria-expanded={isActive}
		aria-controls={`dropdown-${link.id}`}
	>
		<div className="flex items-center space-x-4">
			<div className="relative">
				<div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-xl border border-white/20">
					{link.icon}
				</div>
				{link.id === "topup" && (
					<CircleDollarSign className="absolute -top-2 -right-2 w-5 h-5 text-green-400 animate-bounce" />
				)}
				{link.id === "join" && (
					<Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
				)}
			</div>
			<span className="font-bold text-white text-lg hover:text-purple-200 transition-colors">
				{link.title}
			</span>
		</div>
		<ChevronDown
			className={`w-6 h-6 text-purple-300 transition-all duration-300 ${
				isActive ? "rotate-180 text-purple-200" : ""
			}`}
			aria-hidden="true"
		/>
	</button>
)

const SocialButton: React.FC<{
	Icon: React.ComponentType<any>
	index: number
}> = ({ Icon, index }) => (
	<button
		className="relative group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/15 border border-white/20 p-4 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/25"
		style={{ animationDelay: `${index * 0.2}s` }}
	>
		<Icon className="w-7 h-7 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
		<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
	</button>
)

// Main Component
export default function Home(): JSX.Element {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
	const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null)

	const links: LinkItem[] = [
		{
			id: "topup",
			title: "AGENT TOP UP COIN",
			icon: <CircleDollarSign className="w-7 h-7 text-green-300" />,
			image: "/logo-drt.png",
			dropdown: [
				{
					name: "DAZZ",
					icon: "/logo-dazz.webp",
					link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Top%20Up%20Koin%20DAZZ",
				},
				{
					name: "DUKU",
					icon: "/logo-duku.jpeg",
					link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Top%20Up%20Koin%20DUKU",
				},
				{
					name: "MICO",
					icon: "/logo-mico.png",
					link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Top%20Up%20Koin%20MICO",
				},
				{
					name: "RIVO",
					icon: "/logo-rivo.webp",
					link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Top%20Up%20Koin%20RIVO",
				},
			] as TopUpPlatform[],
		},
		{
			id: "join",
			title: "JOIN TALENT",
			icon: <Music2 className="w-7 h-7 text-purple-300" />,
			image: "/logo-drt.png",
			dropdown: [
				{
					name: "Mico Live",
					icon: "/logo-mico.png",
					submenu: [
						{
							name: "DRT Management",
							icon: "/logo-drt.png",
							link: "https://wa.me/6282322503101?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20MICO%20(DRT)",
						},
						{
							name: "LEON Agency",
							icon: "/logo-leon.png",
							link: "https://wa.me/6282322503101?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20MICO%20(LEON)",
						},
					],
				},
				{
					name: "Dazz Live",
					icon: "/logo-dazz.webp",
					submenu: [
						{
							name: "BDC Agency",
							icon: "/logo-bdc.png",
							link: "https://wa.me/6282322503101?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20DAZZ%20(BDC)",
						},
					],
				},
				{
					name: "Momo Live",
					icon: "/logo-momo.png",
					submenu: [
						{
							name: "DRT Management",
							icon: "/logo-drt.png",
							link: "https://wa.me/6282322503101?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20MOMO%20(DRT)",
						},
					],
				},
				{
					name: "Duku Live",
					icon: "/logo-duku.jpeg",
					submenu: [
						{
							name: "LEON Agency",
							icon: "/logo-leon.png",
							link: "https://wa.me/6282322503101?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20DUKU%20(LEON)",
						},
					],
				},
				{
					name: "TikTok Live",
					icon: "/logo-tiktok.png",
					submenu: [
						{
							name: "Rich Glory",
							icon: "/logo-rich.png",
							link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20TikTok%20(Rich%20Glory)",
						},
					],
				},
				{
					name: "Moma Live",
					icon: "/logo-moma.webp",
					submenu: [
						{
							name: "DRT Management",
							icon: "/logo-drt.png",
							link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20MOMA%20(DRT)",
						},
					],
				},
				{
					name: "Rivo Live",
					icon: "/logo-rivo.webp",
					submenu: [
						{
							name: "DRT Management",
							icon: "/logo-drt.png",
							link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20RIVO%20(DRT)",
						},
					],
				},
				{
					name: "Dramabite",
					icon: "/logo-dramabite.webp",
					submenu: [
						{
							name: "DRT Management",
							icon: "/logo-drt.png",
							link: "https://wa.me/6287750405086?text=Halo%20Admin%20DRT%20Management%2C%20Saya%20mau%20Join%20Talent%20di%20DRAMABITE%20(DRT)",
						},
					],
				},
			] as Platform[],
		},
		{
			title: "DRT STORE",
			icon: <ShoppingCart className="w-7 h-7 text-blue-300" />,
			image: "/logo-drtsurf.png",
			link: "https://drtstore.id",
		},
		{
			title: "INCOME CALCULATOR",
			icon: <Calculator className="w-7 h-7 text-yellow-300" />,
			image: "/logo-drt.png",
			link: "/kalkulator",
		},
		{
			title: "CUSTOMER SERVICE 24/7",
			icon: <MessageCircle className="w-7 h-7 text-pink-300" />,
			image: "/logo-drt.png",
			link: "https://wa.me/6282322503101",
		},
	]

	const toggleDropdown = (id: string): void => {
		setActiveDropdown(activeDropdown === id ? null : id)
		setExpandedPlatform(null)
	}

	const togglePlatform = (platformName: string, e: React.MouseEvent): void => {
		e.stopPropagation()
		setExpandedPlatform(expandedPlatform === platformName ? null : platformName)
	}

	return (
		<main className="min-h-screen bg-gradient-deep-space flex flex-col items-center p-6 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
				<div
					className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-lg animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute bottom-32 left-1/4 w-28 h-28 bg-blue-500/10 rounded-full blur-xl animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
				<div
					className="absolute bottom-20 right-10 w-20 h-20 bg-red-500/10 rounded-full blur-lg animate-pulse"
					style={{ animationDelay: "0.5s" }}
				></div>
			</div>

			{/* Header */}
			<Header
				title="DRT Management"
				subtitle="Kreativitas Tanpa Batas di Dunia Live Streaming"
				logoSrc="/logo-drt.png"
			/>

			{/* Links Container */}
			<div className="w-full max-w-md mt-8 space-y-4 relative z-10">
				{links.map((link) => (
					<div key={link.title} className="group relative">
						{link.dropdown ? (
							<>
								<DropdownButton
									link={link}
									isActive={activeDropdown === link.id}
									onClick={() => link.id && toggleDropdown(link.id)}
								/>

								{activeDropdown === link.id && (
									<div
										className="mt-3 space-y-3 pl-6 pr-2 py-2"
										id={`dropdown-${link.id}`}
										role="region"
										aria-label={`${link.title} options`}
									>
										{link.id === "topup"
											? (link.dropdown as TopUpPlatform[]).map((platform) => (
													<TopUpLink key={platform.name} platform={platform} />
											  ))
											: (link.dropdown as Platform[]).map((platform) => (
													<div key={platform.name} className="space-y-2">
														{platform.name === "Mico Live" ? (
															<>
																<button
																	onClick={(e) =>
																		togglePlatform(platform.name, e)
																	}
																	className="w-full flex items-center justify-between backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
																	aria-expanded={
																		expandedPlatform === platform.name
																	}
																	aria-controls={`mico-agencies-${platform.name}`}
																>
																	<div className="flex items-center space-x-4">
																		<div className="relative">
																			<div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/30 p-1">
																				<Image
																					src={platform.icon}
																					width={48}
																					height={48}
																					alt={`${platform.name} logo`}
																					className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
																				/>
																			</div>
																			<Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
																		</div>
																		<span className="text-lg font-bold text-white hover:text-purple-200 transition-colors">
																			{platform.name}
																		</span>
																	</div>
																	<ChevronDown
																		className={`w-6 h-6 text-purple-300 transition-transform duration-300 ${
																			expandedPlatform === platform.name
																				? "rotate-180"
																				: ""
																		}`}
																		aria-hidden="true"
																	/>
																</button>

																{expandedPlatform === platform.name && (
																	<div
																		className="ml-8 space-y-2"
																		id={`mico-agencies-${platform.name}`}
																		role="region"
																		aria-label={`${platform.name} agencies`}
																	>
																		{platform.submenu?.map((agency) => (
																			<PlatformLink
																				key={agency.name}
																				platform={platform}
																				agency={agency}
																				isMico={true}
																			/>
																		))}
																	</div>
																)}
															</>
														) : (
															platform.submenu?.[0] && (
																<PlatformLink
																	platform={platform}
																	agency={platform.submenu[0]}
																/>
															)
														)}
													</div>
											  ))}
									</div>
								)}
							</>
						) : (
							<a
								href={link.link}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full backdrop-blur-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20 rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
							>
								<div className="flex items-center space-x-4">
									<div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-3 rounded-xl border border-white/20">
										{link.icon}
									</div>
									<span className="font-bold text-white text-lg hover:text-purple-200 transition-colors">
										{link.title}
									</span>
								</div>
							</a>
						)}
					</div>
				))}
			</div>

			{/* Social Links */}
			<div className="flex space-x-4 mt-10 relative z-10">
				{[PlayCircle, Music2, Camera].map((Icon, index) => (
					<SocialButton key={index} Icon={Icon} index={index} />
				))}
			</div>

			{/* Footer */}
			<GlassContainer className="mt-10 mb-6 rounded-full px-8 py-3 relative z-10">
				<p className="text-sm font-medium text-purple-300 flex items-center space-x-2">
					<span>© {new Date().getFullYear()} DRT Management Crew</span>
					<Heart className="w-4 h-4 text-red-400 animate-pulse" />
				</p>
			</GlassContainer>
		</main>
	)
}
