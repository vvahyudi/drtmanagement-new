"use client"

import { useState } from "react"
import type { TransactionWithDetails } from "@/types/transaction"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentStatusChecker() {
	const [invoiceId, setInvoiceId] = useState("")
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<TransactionWithDetails | null>(null)
	const [error, setError] = useState("")

	const handleCheck = async () => {
		setLoading(true)
		setError("")
		setResult(null)
		try {
			const res = await fetch(`/api/rivo/invoice/${invoiceId}`)
			if (!res.ok) throw new Error("Invoice tidak ditemukan")
			const data: TransactionWithDetails = await res.json()
			setResult(data)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError("Terjadi kesalahan")
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
			<div className="w-full max-w-md  rounded-2xl shadow-lg p-8 flex flex-col gap-6 border border-accent">
				<h1 className="text-2xl font-bold text-center ">Cek Status Pesanan</h1>
				<Input
					placeholder="Masukkan Invoice ID"
					value={invoiceId}
					onChange={(e) => setInvoiceId(e.target.value)}
					className="text-lg px-4 py-3 border-2"
				/>
				<Button
					className="w-full  font-semibold text-lg py-3 rounded-xl shadow"
					onClick={handleCheck}
					disabled={loading || !invoiceId}
				>
					{loading ? (
						<Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
					) : null}
					Cek Status
				</Button>
				{error && <div className="text-red-500 text-center mt-2">{error}</div>}
				{result && (
					<Card className="mt-4">
						<CardContent className="p-6 text-sm">
							<div className="mb-2">
								<b>Invoice ID:</b> {result.invoiceId}
							</div>
							<div className="mb-2">
								<b>Status:</b> {result.status}
							</div>
							<div className="mb-2">
								<b>Waktu:</b>{" "}
								{new Date(result.createdAt).toLocaleString("id-ID")}
							</div>
							<div className="mb-2">
								<b>Produk:</b> {result.product?.name}
							</div>
							<div className="mb-2">
								<b>Jumlah Coin:</b> {result.amount.toLocaleString("id-ID")}
							</div>
							<div className="mb-2">
								<b>Harga:</b>{" "}
								{new Intl.NumberFormat("id-ID", {
									style: "currency",
									currency: "IDR",
									minimumFractionDigits: 0,
								}).format(result.price)}
							</div>
							{/* Tambahkan detail lain sesuai response API */}
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	)
}
