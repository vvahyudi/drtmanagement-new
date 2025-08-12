"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { AlertTriangle, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader className="space-y-1 text-center">
					<div className="mx-auto mb-4">
						<AlertTriangle className="h-16 w-16 text-red-500" />
					</div>
					<CardTitle className="text-2xl font-bold text-red-600">
						Access Denied
					</CardTitle>
					<CardDescription>
						You don't have permission to access this area
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center text-sm text-gray-600 dark:text-gray-400">
						This area is restricted to authorized administrators only.
						<br />
						If you believe this is an error, please contact your system
						administrator.
					</p>

					<div className="flex flex-col space-y-2">
						<Button asChild variant="outline">
							<Link href="/auth/login">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Login
							</Link>
						</Button>

						<Button asChild variant="ghost">
							<Link href="/">Return to Home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

