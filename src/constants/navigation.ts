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
		name: "Status Pesanan",
		path: "/status-pesanan",
		icon: Users,
	},
	{
		name: "Tentang Kami",
		path: "/about",
		icon: Info,
	},
	{
		name: "Kontak",
		path: "/contact",
		icon: Mail,
	},
] as const
