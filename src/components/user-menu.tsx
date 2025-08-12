"use client"

import { authClient } from "@/lib/auth-client"
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
import Link from "next/link"
import { useEffect, useState } from "react"

export function UserMenu() {
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

	if (loading) {
		return <div>Loading...</div>
	}

	if (!user) {
		return (
			<div className="flex items-center space-x-4">
				<Link href="/auth/login">
					<Button variant="ghost">Sign In</Button>
				</Link>
				<Link href="/auth/register">
					<Button>Sign Up</Button>
				</Link>
			</div>
		)
	}

	const handleSignOut = async () => {
		await authClient.signOut()
		setUser(null)
	}

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.image || ""} alt={user.name || ""} />
						<AvatarFallback>
							{user.name ? getInitials(user.name) : "U"}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/dashboard" className="cursor-pointer">
						<User className="mr-2 h-4 w-4" />
						<span>Dashboard</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/profile" className="cursor-pointer">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer text-red-600 focus:text-red-600"
					onClick={handleSignOut}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
