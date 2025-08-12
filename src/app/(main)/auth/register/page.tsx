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
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [name, setName] = useState("")
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const router = useRouter()

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError("")
		setSuccess("")

		// Validation
		if (!email || !password || !confirmPassword || !name) {
			setError("Please fill in all fields")
			setLoading(false)
			return
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match")
			setLoading(false)
			return
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters long")
			setLoading(false)
			return
		}

		try {
			await authClient.signUp.email({
				email,
				password,
				name,
			})
			setSuccess(
				"Registration successful! Please check your email for verification.",
			)
			// Redirect to login after a delay
			setTimeout(() => {
				router.push("/auth/login")
			}, 3000)
		} catch (error: any) {
			console.error("Registration failed:", error)
			setError(error.message || "Registration failed. Please try again.")
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
						Create Account
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Sign up for a new admin account
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Registration</CardTitle>
						<CardDescription>
							Enter your details to create a new account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-md">
								{error}
							</div>
						)}

						{success && (
							<div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-md">
								{success}
							</div>
						)}

						<form onSubmit={handleRegister} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Enter your full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									disabled={loading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									disabled={loading}
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
									disabled={loading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Confirm your password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									disabled={loading}
								/>
							</div>

							<Button type="submit" disabled={loading} className="w-full">
								{loading ? (
									<div className="flex items-center space-x-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										<span>Creating account...</span>
									</div>
								) : (
									"Create Account"
								)}
							</Button>
						</form>

						<div className="text-center text-sm text-gray-600 dark:text-gray-400">
							<p>
								Already have an account?{" "}
								<Link
									href="/auth/login"
									className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Sign in here
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
