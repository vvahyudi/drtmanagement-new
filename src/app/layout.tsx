import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import { Suspense, type ReactNode } from "react"

import WhatsAppButton from "@/components/whatsapp-button"
import "@/styles/globals.css"
import { PageTransition, StairTransition } from "@/components/transitions"
import Header from "@/components/main-header"
import Footer from "@/components/footer"

// Optimized font loading with display swap for better performance
const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-dmSans",
	display: "swap",
	preload: true,
})

// Enhanced SEO-friendly metadata
export const metadata: Metadata = {
	title: {
		default:
			"DRT Entertainment - Start Your Livestreaming & Digital Entertainment Journey Today",
		template: "%s | DRT Entertainment",
	},
	description:
		"DRT Entertainment is a leading digital entertainment and livestreaming agency empowering creators, influencers, and brands. We nurture talent, grow audiences, and maximize monetization through expert guidance, innovative strategies, and global reach.",
	keywords: [
		"digital entertainment",
		"livestreaming agency",
		"content creator management",
		"influencer marketing",
		"talent management",
		"streaming services",
		"audience growth",
		"content creation",
		"digital marketing",
		"brand partnerships",
		"monetization strategy",
		"social media growth",
		"creator economy",
		"DRT Entertainment",
	],
	authors: [{ name: "DRT Entertainment" }],
	creator: "DRT Entertainment",
	publisher: "DRT Entertainment",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://link.drtentertainment.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "/",
		siteName: "DRT Entertainment",
		title:
			"DRT Entertainment - Start Your Livestreaming & Digital Entertainment Journey Today",
		description:
			"Leading digital entertainment and livestreaming agency empowering creators, influencers, and brands. Nurture talent, grow audiences, and maximize monetization.",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "DRT Entertainment - Digital Entertainment & Livestreaming Agency",
				type: "image/jpeg",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
}

// Viewport configuration for better mobile experience
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
}

interface RootLayoutProps {
	children: ReactNode
}

// WhatsApp component loading fallback
function WhatsAppFallback() {
	return (
		<div
			className="fixed bottom-4 right-4 z-50 h-16 w-16 rounded-full bg-green-500 animate-pulse"
			aria-label="Loading WhatsApp button"
		/>
	)
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={dmSans.variable}>
			<head>
				{/* Preconnect to external domains for performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>

				{/* DNS prefetch for potential external resources */}
				<link rel="dns-prefetch" href="https://api.whatsapp.com" />

				{/* Favicon and app icons */}
				<link rel="icon" href="/favicon.ico" sizes="32x32" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body
				className="min-h-screen bg-gradient-deep-space-alt font-sans antialiased"
				suppressHydrationWarning
			>
				{/* Skip to main content for accessibility */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all duration-200"
				>
					Skip to main content
				</a>

				{/* Main content area */}
				<PageTransition>
					<StairTransition />
					<div>
						<Header />
						{children}

						<Footer />
					</div>
				</PageTransition>

				{/* WhatsApp component with suspense boundary */}
				<Suspense fallback={<WhatsAppFallback />}>
					<WhatsAppButton
						phoneNumber="6282322503101"
						message="Hi! I'm interested in DRT Entertainment services. Can you help me get started with digital entertainment or livestreaming?"
						customText="Need Help?"
						notificationCount={1}
					/>
				</Suspense>

				{/* Structured data for SEO */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							name: "DRT Entertainment",
							description:
								"Leading digital entertainment and livestreaming agency empowering creators, influencers, and brands.",
							url: "https://drtentertainment.com",
							logo: "https://drtentertainment.com/images/logo.png",
							contactPoint: {
								"@type": "ContactPoint",
								contactType: "Customer Service",
								availableLanguage: ["English", "Indonesian"],
							},
							areaServed: "Worldwide",
							serviceType: [
								"Digital Entertainment Management",
								"Livestreaming Management",
								"Content Creator Services",
								"Audience Growth",
								"Monetization Strategy",
								"Influencer Marketing",
								"Brand Partnerships",
							],
							sameAs: [
								"https://instagram.com/drtentertainment",
								"https://www.tiktok.com/@drtentertainment",
								"https://www.youtube.com/@drtentertainment",
							],
						}),
					}}
				/>
			</body>
		</html>
	)
}
