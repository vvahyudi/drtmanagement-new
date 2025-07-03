import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import { Suspense, type ReactNode } from "react"

import WhatsAppButton from "@/components/whatsapp-button"
import "@/styles/globals.css"
import { PageTransition, StairTransition } from "@/components/transitions"
import Header from "@/components/header"
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
		default: "DRT Management - Start Your Livestreaming Journey Today",
		template: "%s | DRT Management",
	},
	description:
		"DRT Management is a premier livestreaming agency providing comprehensive solutions for content creators. We nurture gifted talent, help grow audiences, and maximize content monetization through expert guidance and support.",
	keywords: [
		"livestreaming agency",
		"content creator management",
		"livestream monetization",
		"talent management",
		"streaming services",
		"audience growth",
		"content creation",
		"digital marketing",
		"influencer management",
	],
	authors: [{ name: "DRT Management" }],
	creator: "DRT Management",
	publisher: "DRT Management",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://drtmanagement.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "/",
		siteName: "DRT Management",
		title: "DRT Management - Start Your Livestreaming Journey Today",
		description:
			"Premier livestreaming agency providing comprehensive solutions for content creators. We nurture talent, grow audiences, and maximize monetization.",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "DRT Management - Livestreaming Agency",
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
		<div
			className="min-h-screen font-sans antialiased bg-gradient-deep-space"
			suppressHydrationWarning
		>
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
					message="Hi! I'm interested in DRT Management services. Can you help me get started with livestreaming?"
					customText="Need Help?"
					notificationCount={1}
				/>
			</Suspense>
		</div>
	)
}
