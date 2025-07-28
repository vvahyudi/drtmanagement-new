"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface UserData {
	code: string
	nickname: string
	avatar: string
}

export default function CheckRivoUser() {
	const [userId, setUserId] = useState("")
	const [userData, setUserData] = useState<UserData | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const handleCheck = async () => {
		if (!userId) {
			setError("Please enter a user ID")
			return
		}

		setIsLoading(true)
		setError("")
		setUserData(null)

		try {
			const response = await fetch(
				`https://api-mine.rivofernando.com/v1/api/get-id-rivo?id=${userId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				},
			)

			const data = await response.json()

			if (data.status === 200) {
				setUserData({
					code: data.status.toString(),
					nickname: data.result.nickname,
					avatar: data.result.avatar,
				})
				setError("")
			} else {
				setError("User not found or invalid ID")
			}
		} catch (err) {
			setError("Error checking user. Please try again.")
			console.error("Error:", err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<div className="flex gap-2 mb-4">
				<Input
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					placeholder="Enter Rivo User ID"
					className="flex-1"
				/>
				<Button
					onClick={handleCheck}
					disabled={isLoading}
					className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
				>
					{isLoading ? "Checking..." : "Check ID"}
				</Button>
			</div>

			{error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

			{userData && (
				<Card className="p-4 backdrop-blur-xl bg-white/5 border border-white/10">
					<div className="flex items-center gap-4">
						<div className="relative w-16 h-16 rounded-full overflow-hidden">
							<Image
								src={userData.avatar}
								alt={userData.nickname}
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
								{userData.nickname}
							</h3>
							<p className="text-sm text-gray-400">ID: {userId}</p>
						</div>
					</div>
				</Card>
			)}
		</div>
	)
}
