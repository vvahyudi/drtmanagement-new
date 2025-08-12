"use client"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
//
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return null
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Providers>
				<SidebarProvider
					style={
						{
							"--sidebar-width": "calc(var(--spacing) * 72)",
							"--header-height": "calc(var(--spacing) * 12)",
						} as React.CSSProperties
					}
				>
					<AppSidebar variant="inset" />
					<SidebarInset>
						<SiteHeader />
						<div className="flex flex-1 flex-col">
							<div className="@container/main flex flex-1 flex-col">
								<div className="flex flex-col gap-4 py-4 md:py-6">
									{children}
								</div>
							</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			</Providers>
		</ThemeProvider>
	)
}
