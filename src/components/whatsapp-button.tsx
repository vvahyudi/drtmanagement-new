"use client"

import { useState, useCallback } from "react"
import { MessageCircle, X } from "lucide-react"

interface WhatsAppButtonProps {
	phoneNumber: string
	message?: string
	position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
	size?: "sm" | "md" | "lg"
	customText?: string
	notificationCount?: number
	className?: string
}

const WhatsAppButton = ({
	phoneNumber,
	message = "Hello! I'm interested in your services.",
	position = "bottom-right",
	size = "lg",
	customText,
	notificationCount,
	className = "",
}: WhatsAppButtonProps) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const [isAnimating, setIsAnimating] = useState(false)

	// Position classes
	const positionClasses = {
		"bottom-right": "bottom-4 right-4",
		"bottom-left": "bottom-4 left-4",
		"top-right": "top-4 right-4",
		"top-left": "top-4 left-4",
	}

	// Size classes
	const sizeClasses = {
		sm: "h-12 w-12",
		md: "h-14 w-14",
		lg: "h-16 w-16",
	}

	const iconSizeClasses = {
		sm: "h-6 w-6",
		md: "h-7 w-7",
		lg: "h-8 w-8",
	}

	// Format phone number - remove any non-digit characters and ensure it starts with country code
	const formatPhoneNumber = useCallback((phone: string): string => {
		const cleaned = phone.replace(/\D/g, "") // Remove all non-digit characters

		// If it doesn't start with country code, assume it needs Indonesian code
		if (!cleaned.startsWith("62") && cleaned.startsWith("0")) {
			return "62" + cleaned.substring(1)
		}

		return cleaned.startsWith("62") ? cleaned : "62" + cleaned
	}, [])

	// Handle WhatsApp click
	const handleWhatsAppClick = useCallback(() => {
		setIsAnimating(true)

		try {
			const formattedPhone = formatPhoneNumber(phoneNumber)
			const encodedMessage = encodeURIComponent(message)
			const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

			// Open WhatsApp in a new tab/window
			const newWindow = window.open(
				whatsappUrl,
				"_blank",
				"noopener,noreferrer",
			)

			// Fallback if popup is blocked
			if (!newWindow) {
				window.location.href = whatsappUrl
			}

			console.log("WhatsApp opened:", whatsappUrl)
		} catch (error) {
			console.error("Error opening WhatsApp:", error)
			// Fallback: try to open WhatsApp without message
			const formattedPhone = formatPhoneNumber(phoneNumber)
			window.open(
				`https://wa.me/${formattedPhone}`,
				"_blank",
				"noopener,noreferrer",
			)
		}

		setTimeout(() => setIsAnimating(false), 300)
	}, [phoneNumber, message, formatPhoneNumber])

	// Toggle expanded state
	const toggleExpanded = useCallback(() => {
		setIsExpanded((prev) => !prev)
	}, [])

	return (
		<div
			className={`fixed z-50 ${positionClasses[position]} ${className}`}
			role="button"
			aria-label={customText || "Contact us on WhatsApp"}
		>
			{/* Expanded card */}
			{isExpanded && (
				<div
					className="absolute bottom-20 right-0 mb-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-72 animate-in slide-in-from-bottom-2 duration-300"
					role="dialog"
					aria-modal="true"
				>
					{/* Header */}
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center space-x-2">
							<div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
								<MessageCircle className="h-4 w-4 text-white" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 text-sm">
									DRT Entertainment
								</h3>
								<p className="text-xs text-green-600">● Online</p>
							</div>
						</div>
						<button
							onClick={toggleExpanded}
							className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
							aria-label="Close chat"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					{/* Message */}
					<div className="mb-4">
						<div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700">
							Hi there! 👋
							<br />
							How can we help you with your livestreaming journey today?
						</div>
					</div>

					{/* CTA Button */}
					<button
						onClick={handleWhatsAppClick}
						disabled={isAnimating}
						className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
					>
						<MessageCircle className="h-4 w-4" />
						<span>{isAnimating ? "Opening..." : "Start Chat"}</span>
					</button>
				</div>
			)}

			{/* Main WhatsApp Button */}
			<button
				onClick={customText ? toggleExpanded : handleWhatsAppClick}
				disabled={isAnimating}
				className={`
          ${sizeClasses[size]}
          bg-green-500 hover:bg-green-600 disabled:bg-green-400
          text-white rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center justify-center
          focus:outline-none focus:ring-4 focus:ring-green-500/30
          ${isAnimating ? "scale-95" : "hover:scale-110"}
          ${isExpanded ? "rotate-45" : ""}
          group relative
        `}
				aria-label={customText || "Open WhatsApp chat"}
			>
				{/* Notification badge */}
				{notificationCount && notificationCount > 0 && (
					<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
						{notificationCount > 9 ? "9+" : notificationCount}
					</span>
				)}

				{/* Icon */}
				<MessageCircle
					className={`
            ${iconSizeClasses[size]} 
            transition-transform duration-200
            ${isExpanded ? "rotate-45" : ""}
          `}
				/>

				{/* Ripple effect */}
				<div className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150" />
			</button>

			{/* Custom text label */}
			{customText && !isExpanded && (
				<div className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
					{customText}
					<div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
				</div>
			)}

			{/* Pulse animation for attention */}
			<div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none" />
		</div>
	)
}

export default WhatsAppButton
