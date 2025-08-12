"use client"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNav() {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getSession = async () => {
			try {
				const { data: session } = await authClient.getSession()
				setUser(session?.user || null)
			} catch (error) {
				console.error("Failed to get session:", error)
			} finally {
				setLoading(false)
			}
		}
		getSession()
	}, [])

	const handleLogout = async () => {
		try {
			await authClient.signOut()
			setUser(null)
			// Redirect to login page
			window.location.href = "/auth/login"
		} catch (error) {
			console.error("Logout failed:", error)
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="flex items-center justify-between px-4 w-full">
			<div className="flex items-center space-x-4">
				<h1 className="text-xl font-semibold">Admin Dashboard</h1>
			</div>
			<div className="flex items-center space-x-4">
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage src={user.image || ""} alt={user.name || ""} />
									<AvatarFallback>
										{user.name ? user.name.charAt(0).toUpperCase() : "U"}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										{user.name}
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										{user.email}
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										Role: {user.role || "STAFF"}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer text-red-600 focus:text-red-600"
								onClick={handleLogout}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}
