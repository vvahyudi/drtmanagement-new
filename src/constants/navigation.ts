import { NavigationLink } from "../types/navigation"
import { Home, Wallet, Users, Info, Mail } from "lucide-react"

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
