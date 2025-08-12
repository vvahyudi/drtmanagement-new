"use client"

import {
	BarChart2,
	Receipt,
	Building2,
	CreditCard,
	Folder,
	Wallet,
	Users2,
	Shield,
	MessagesSquare,
	Video,
	Settings,
	HelpCircle,
	Home,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
	Sidebar as UISidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "@/components/ui/sidebar"

export default function DashboardSidebar() {
	const pathname = usePathname()

	return (
		<UISidebar side="left" variant="sidebar" collapsible="icon">
			<SidebarHeader className="h-16 border-b border-sidebar-border">
				<Link href="/" className="flex items-center gap-3 px-2">
					<Image
						src="/logo-drt.png"
						alt="DRT TOP UP"
						width={32}
						height={32}
						className="flex-shrink-0"
					/>
					<span className="text-xl font-bold">DRT TOP UP</span>
				</Link>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Overview</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname?.startsWith("/admin/dashboard")}
								>
									<Link href="/admin/dashboard">
										<Home />
										<span>Dashboard</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<BarChart2 />
									<span>Analytics</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Building2 />
									<span>Organization</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Folder />
									<span>Projects</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarGroup>
					<SidebarGroupLabel>Finance</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname?.startsWith("/admin/transactions")}
								>
									<Link href="/admin/transactions">
										<Wallet />
										<span>Transactions</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Receipt />
									<span>Invoices</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<CreditCard />
									<span>Payments</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarGroup>
					<SidebarGroupLabel>Team</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Users2 />
									<span>Members</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Shield />
									<span>Permissions</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<MessagesSquare />
									<span>Chat</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton disabled>
									<Video />
									<span>Meetings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t border-sidebar-border">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton disabled>
							<Settings />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton disabled>
							<HelpCircle />
							<span>Help</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>

			<SidebarRail />
		</UISidebar>
	)
}
