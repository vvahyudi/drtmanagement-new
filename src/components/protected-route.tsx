"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
	children: React.ReactNode
	fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter()

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

	useEffect(() => {
		if (!loading && !user) {
			router.push("/auth/login")
		}
	}, [user, loading, router])

	if (loading) {
		return (
			fallback || (
				<div className="min-h-screen flex items-center justify-center">
					<div className="flex items-center space-x-2">
						<Loader2 className="h-6 w-6 animate-spin" />
						<span>Loading...</span>
					</div>
				</div>
			)
		)
	}

	if (!user) {
		return null
	}

	return <>{children}</>
}
