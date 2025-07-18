import { NavigationLink } from "@/types/navigation"
import { Home, Wallet, Users, Info, Mail, Sparkles } from "lucide-react"

export const NAVIGATION_LINKS: NavigationLink[] = [
	{
		name: "Home",
		path: "/",
		icon: Home,
	},
	{
		name: "Top Up",
		path: "/topup",
		icon: Wallet,
		submenu: [
			{
				name: "Dazz",
				path: "/topup/dazz",
				icon: Sparkles,
			},
			{
				name: "Duku",
				path: "/topup/duku",
				icon: Sparkles,
			},
			{
				name: "Mico",
				path: "/topup/mico",
				icon: Sparkles,
			},
			{
				name: "Rivo",
				path: "/topup/rivo",
				icon: Sparkles,
			},
		],
	},
	{
		name: "Our Talents",
		path: "/talent",
		icon: Users,
	},
	{
		name: "About",
		path: "/about",
		icon: Info,
	},
	{
		name: "Contact",
		path: "/contact",
		icon: Mail,
	},
] as const
