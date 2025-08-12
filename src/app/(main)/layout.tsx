import { Suspense, type ReactNode } from "react"
import WhatsAppButton from "@/components/whatsapp-button"
import { Providers } from "@/components/providers"
import "@/styles/globals.css"
import { PageTransition } from "@/components/transitions"
import Header from "@/components/header/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

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

export default function MainLayout({ children }: RootLayoutProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Providers>
				<PageTransition>
					<Header />
					{children}
					<Footer />
				</PageTransition>
			</Providers>

			<Suspense fallback={<WhatsAppFallback />}>
				<WhatsAppButton
					phoneNumber="6282322503101"
					message="Hi! I'm interested in DRT Entertainment services. Can you help me get started with digital entertainment or livestreaming?"
					customText="Need Help?"
					notificationCount={1}
				/>
			</Suspense>
		</ThemeProvider>
	)
}
