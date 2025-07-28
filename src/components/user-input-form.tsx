"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import Image from "next/image"

interface UserInputFormProps {
	onUserIdSubmit?: (userId: string) => void
	onWhatsAppChange?: (whatsApp: string) => void
	isCheckingUser?: boolean
	userInfo?: {
		username: string
		avatar: string
	}
}

export function UserInputForm({
	onUserIdSubmit,
	onWhatsAppChange,
	isCheckingUser,
	userInfo,
}: UserInputFormProps) {
	const [inputValue, setInputValue] = useState("")
	const [whatsApp, setWhatsApp] = useState("")

	const handleCheckId = () => {
		if (inputValue.trim()) {
			onUserIdSubmit?.(inputValue)
		}
	}

	const handleWhatsAppChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, "")
		setWhatsApp(numericValue)
		onWhatsAppChange?.(numericValue)
	}

	return (
		<div className="space-y-6 mb-8">
			<div className="space-y-2">
				<Label htmlFor="rivo-id" className="text-base font-medium">
					Rivo Live ID
				</Label>
				<div className="flex gap-2">
					<Input
						id="rivo-id"
						placeholder="Masukkan Rivo Live ID"
						value={inputValue}
						onChange={(e) =>
							setInputValue(e.target.value.replace(/[^0-9]/g, ""))
						}
						className="flex-1"
						disabled={isCheckingUser}
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
					/>
					<Button
						variant="secondary"
						className={`min-w-[100px] ${
							userInfo
								? "bg-green-100 text-green-700 hover:bg-green-200"
								: "bg-purple-100 text-purple-700 hover:bg-purple-200"
						}`}
						onClick={handleCheckId}
						disabled={!inputValue.trim() || isCheckingUser}
					>
						{isCheckingUser ? "Checking..." : userInfo ? "✓ Valid" : "Check ID"}
					</Button>
				</div>
				{userInfo && (
					<div className="flex items-center gap-2 mt-2 p-2 bg-green-50 rounded-md border border-green-200">
						{userInfo.avatar && (
							<Image
								width={32}
								height={32}
								src={userInfo.avatar}
								alt={userInfo.username}
								className="w-8 h-8 rounded-full"
							/>
						)}
						<p className="text-sm font-medium text-green-600">
							User Found: {userInfo.username}
						</p>
					</div>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="whatsapp" className="text-base font-medium">
					WhatsApp (Notifikasi)
				</Label>
				<div className="flex gap-2">
					<Select defaultValue="+62">
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="+62">🇮🇩 +62</SelectItem>
							<SelectItem value="+60">🇲🇾 +60</SelectItem>
							<SelectItem value="+65">🇸🇬 +65</SelectItem>
						</SelectContent>
					</Select>
					<Input
						id="whatsapp"
						placeholder="Nomor WhatsApp"
						value={whatsApp}
						onChange={(e) => handleWhatsAppChange(e.target.value)}
						className="flex-1"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
					/>
				</div>
			</div>
		</div>
	)
}
