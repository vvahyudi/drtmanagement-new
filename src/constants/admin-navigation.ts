import {
	IconCamera,
	IconChartBar,
	IconCreditCard,
	IconDashboard,
	IconDatabase,
	IconFileAi,
	IconFileDescription,
	IconFileWord,
	IconFolder,
	IconHelp,
	IconListDetails,
	IconReport,
	IconSearch,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react"

export type AdminNavItem = {
	title: string
	url: string
	icon: any
}

export type AdminNavigation = {
	navMain: AdminNavItem[]
	navSecondary: AdminNavItem[]
	documents?: { name: string; url: string; icon: any }[]
}

export const adminNavigation: AdminNavigation = {
	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: IconDashboard,
		},
		{
			title: "Transactions",
			url: "/admin/transactions",
			icon: IconCreditCard,
		},
		// Add more items as needed
		{
			title: "Analytics",
			url: "#",
			icon: IconChartBar,
		},
		{
			title: "Projects",
			url: "#",
			icon: IconFolder,
		},
		{
			title: "Team",
			url: "#",
			icon: IconUsers,
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "#",
			icon: IconSettings,
		},
		{
			title: "Get Help",
			url: "#",
			icon: IconHelp,
		},
		{
			title: "Search",
			url: "#",
			icon: IconSearch,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: IconDatabase,
		},
		{
			name: "Reports",
			url: "#",
			icon: IconReport,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: IconFileWord,
		},
		// Examples
		{
			name: "Capture",
			url: "#",
			icon: IconCamera,
		},
		{
			name: "Proposal",
			url: "#",
			icon: IconFileDescription,
		},
		{
			name: "Prompts",
			url: "#",
			icon: IconFileAi,
		},
	],
}
