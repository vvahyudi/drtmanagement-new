import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import "@/styles/globals.css"
import { Providers } from "@/components/providers"

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

// WhatsApp component loading fallback

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={dmSans.variable} suppressHydrationWarning>
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

				{/* Preload font agar warning hilang dan optimasi loading */}
				<link
					rel="preload"
					href="/_next/static/media/_nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0vrx52g-s.p.b23d43ef.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
				<Script
					id="org-ld-json"
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
			</head>
			<body className="font-sans antialiased">
				<Providers>{children}</Providers>

				{/* Structured data for SEO */}
			</body>
		</html>
	)
}
