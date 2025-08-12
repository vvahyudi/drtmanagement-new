// lib/fetcher.ts
import { toast } from "sonner"

export const fetcher = async <T = unknown>(
	url: string,
	options: RequestInit = {},
): Promise<T> => {
	try {
		const token =
			typeof window !== "undefined" ? localStorage.getItem("token") : null

		const res = await fetch(url, {
			...options,
			headers: {
				...(options.headers || {}),
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		})

		if (!res.ok) {
			const errorData = await res.json()
			toast.error(errorData.message || "Gagal mengambil data")
			throw new Error(errorData.message || "Fetch error")
		}

		return await res.json()
	} catch (err: unknown) {
		let message = "Terjadi kesalahan saat memuat data"
		if (err instanceof Error) {
			message = err.message
		}
		toast.error(message)
		throw err
	}
}
export async function updateTransactionProcessingStatus(
	id: string,
	status: string,
) {
	const res = await fetch(`/api/transactions/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ processingStatus: status }),
	})

	if (!res.ok) throw new Error("Gagal update status")
	return res.json()
}
