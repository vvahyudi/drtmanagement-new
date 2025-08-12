"use client"

import { authClient } from "@/lib/auth-client"

// Re-export Better Auth client methods for convenience
export { authClient }

// Custom hook that provides typed user data
export function useAuth() {
	return {
		user: null, // Will be populated when session is available
		loading: false,
		isAuthenticated: false,
		signIn: (provider: string, options?: any) => {
			if (provider === "google") {
				return authClient.signIn.social({ provider: "google", ...options })
			}
			return authClient.signIn.email(options)
		},
		signOut: () => authClient.signOut(),
	}
}

// Type for the auth context (if you need it elsewhere)
export interface AuthContextType {
	user: any | null
	loading: boolean
	isAuthenticated: boolean
	signIn: (provider: string, options?: any) => Promise<any>
	signOut: () => Promise<any>
}
