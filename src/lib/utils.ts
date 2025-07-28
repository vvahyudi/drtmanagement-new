import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(amount: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
		.format(amount)
		.replace("IDR", "Rp")
}

export function formatDate(timestamp: number) {
	return new Date(timestamp * 1000).toLocaleDateString("id-ID", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
}
