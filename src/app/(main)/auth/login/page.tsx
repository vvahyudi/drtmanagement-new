"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function LoginPage() {
	const [loading, setLoading] = useState(false)
	const [emailLoading, setEmailLoading] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const router = useRouter()
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"

	const handleGoogleSignIn = async () => {
		setLoading(true)
		setError("")
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: callbackUrl,
			})
		} catch (error) {
			console.error("Google sign in failed:", error)
			setError("Google sign in failed. Please try again.")
			setLoading(false)
		}
	}

	const handleEmailSignIn = async (e: React.FormEvent) => {
		e.preventDefault()
		setEmailLoading(true)
		setError("")

		if (!email || !password) {
			setError("Please enter both email and password")
			setEmailLoading(false)
			return
		}

		try {
			await authClient.signIn.email({
				email,
				password,
				callbackURL: callbackUrl,
			})
		} catch (error) {
			console.error("Email sign in failed:", error)
			setError("Invalid email or password. Please try again.")
			setEmailLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
						Admin Login
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Sign in to access the admin dashboard
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Authentication</CardTitle>
						<CardDescription>
							Sign in with your credentials or Google account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
								{error}
							</div>
						)}

						{/* Email/Password Form */}
						<form onSubmit={handleEmailSignIn} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={emailLoading}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={emailLoading}
								/>
							</div>
							<Button type="submit" disabled={emailLoading} className="w-full">
								{emailLoading ? (
									<div className="flex items-center space-x-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Signing in...</span>
									</div>
								) : (
									"Sign in with Email"
								)}
							</Button>
						</form>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
									Or continue with
								</span>
							</div>
						</div>

						{/* Google Sign In */}
						<Button
							onClick={handleGoogleSignIn}
							disabled={loading}
							className="w-full"
							variant="outline"
						>
							{loading ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
									<span>Signing in...</span>
								</div>
							) : (
								<div className="flex items-center space-x-2">
									<svg className="w-5 h-5" viewBox="0 0 24 24">
										<path
											fill="currentColor"
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										/>
										<path
											fill="currentColor"
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										/>
										<path
											fill="currentColor"
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										/>
										<path
											fill="currentColor"
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										/>
									</svg>
									<span>Sign in with Google</span>
								</div>
							)}
						</Button>

						<div className="text-center text-sm text-gray-600 dark:text-gray-400">
							<p>Only authorized admin users can access this area</p>
							<p className="mt-2">
								Don't have an account?{" "}
								<Link
									href="/auth/register"
									className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Sign up here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
