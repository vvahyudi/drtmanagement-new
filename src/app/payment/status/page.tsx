"use client"

import { useEffect, useState, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	CheckCircle,
	XCircle,
	Clock,
	AlertCircle,
	ArrowLeft,
	RefreshCw,
} from "lucide-react"
import Link from "next/link"
declare global {
	interface Window {
		__sellCoinTriggered?: string
	}
}

import { useSellCoin } from "@/lib/hooks/use-rivo-queries"

interface TransactionData {
	reference: string
	merchant_ref: string
	payment_method: string
	payment_name: string
	amount: number // Changed from total_amount to amount
	fee_merchant: number
	fee_customer: number
	total_fee: number
	amount_received: number
	pay_code?: string
	pay_url?: string
	checkout_url?: string
	status: string
	expired_time: number
	paid_at?: number | null
	order_items: Array<{
		sku?: string | null
		name: string
		price: number
		quantity: number
		subtotal: number
		product_url?: string | null
		image_url?: string | null
	}>
	customer_name: string
	customer_email: string
	customer_phone: string
	callback_url: string
	return_url: string
	payment_selection_type: string
	instructions?: Array<{
		title: string
		steps: string[]
	}>
}

function PaymentStatusContent() {
	const searchParams = useSearchParams()
	const [transaction, setTransaction] = useState<TransactionData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const tripayReference = searchParams
		? searchParams.get("tripay_reference")
		: null
	const sellCoin = useSellCoin()

	const fetchTransactionStatus = useCallback(async () => {
		if (!tripayReference) {
			setError("No transaction reference provided")
			setLoading(false)
			return
		}

		try {
			setLoading(true)
			setError(null)

			const response = await fetch(
				`/api/tripay/transaction-status?reference=${tripayReference}`,
			)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Failed to fetch transaction status")
			}

			setTransaction(data.data)
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred")
		} finally {
			setLoading(false)
		}
	}, [tripayReference])

	useEffect(() => {
		fetchTransactionStatus()
	}, [tripayReference, fetchTransactionStatus])

	// Trigger sellCoin when payment status is PAID
	useEffect(() => {
		if (
			transaction &&
			transaction.status &&
			transaction.status.toUpperCase() === "PAID"
		) {
			// Pastikan hanya trigger sekali per transaksi
			if (
				!window.__sellCoinTriggered ||
				window.__sellCoinTriggered !== transaction.reference
			) {
				sellCoin.mutate({
					userId: Number(transaction.customer_name) || 0, // Ganti dengan userId yang benar jika tersedia
					amount: transaction.amount || 0,
				})
				window.__sellCoinTriggered = transaction.reference
			}
		}
	}, [transaction, sellCoin])

	const getStatusIcon = (status: string) => {
		switch (status.toUpperCase()) {
			case "PAID":
				return <CheckCircle className="h-6 w-6 text-green-500" />
			case "UNPAID":
				return <Clock className="h-6 w-6 text-yellow-500" />
			case "EXPIRED":
				return <XCircle className="h-6 w-6 text-red-500" />
			case "FAILED":
				return <XCircle className="h-6 w-6 text-red-500" />
			default:
				return <AlertCircle className="h-6 w-6 text-gray-500" />
		}
	}

	const getStatusBadge = (status: string) => {
		switch (status.toUpperCase()) {
			case "PAID":
				return (
					<Badge className="bg-green-100 text-green-800 border-green-200">
						Berhasil
					</Badge>
				)
			case "UNPAID":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
						Menunggu Pembayaran
					</Badge>
				)
			case "EXPIRED":
				return (
					<Badge className="bg-red-100 text-red-800 border-red-200">
						Kadaluarsa
					</Badge>
				)
			case "FAILED":
				return (
					<Badge className="bg-red-100 text-red-800 border-red-200">
						Gagal
					</Badge>
				)
			default:
				return (
					<Badge className="bg-gray-100 text-gray-800 border-gray-200">
						Unknown
					</Badge>
				)
		}
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
		}).format(amount)
	}

	const formatDate = (timestamp: number) => {
		return new Date(timestamp * 1000).toLocaleString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<Card className="w-full max-w-md">
					<CardContent className="p-6">
						<div className="flex items-center justify-center space-x-2">
							<RefreshCw className="h-5 w-5 animate-spin" />
							<span>Mengecek status pembayaran...</span>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardContent className="p-6">
						<div className="text-center space-y-4">
							<XCircle className="h-12 w-12 text-red-500 mx-auto" />
							<h2 className="text-xl font-semibold text-gray-900">
								Terjadi Kesalahan
							</h2>
							<p className="text-gray-600">{error}</p>
							<div className="space-y-2">
								<Button onClick={fetchTransactionStatus} className="w-full">
									<RefreshCw className="h-4 w-4 mr-2" />
									Coba Lagi
								</Button>
								<Button variant="outline" asChild className="w-full">
									<Link href="/topup/rivo">
										<ArrowLeft className="h-4 w-4 mr-2" />
										Kembali ke Top Up
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (!transaction) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardContent className="p-6">
						<div className="text-center space-y-4">
							<AlertCircle className="h-12 w-12 text-gray-500 mx-auto" />
							<h2 className="text-xl font-semibold text-gray-900">
								Transaksi Tidak Ditemukan
							</h2>
							<p className="text-gray-600">
								Data transaksi tidak dapat ditemukan
							</p>
							<Button variant="outline" asChild className="w-full">
								<Link href="/topup">
									<ArrowLeft className="h-4 w-4 mr-2" />
									Kembali ke Top Up
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8 px-4">
			<div className="max-w-3xl mx-auto space-y-6">
				{/* Header */}
				<div className="text-center">
					<div className="flex justify-center mb-4">
						{getStatusIcon(transaction.status)}
					</div>
					<h1 className="text-2xl font-bold text-gray-900 mb-2">
						Status Pembayaran
					</h1>
					{getStatusBadge(transaction.status)}
				</div>

				{/* Transaction Details */}
				<Card>
					<CardHeader>
						<CardTitle>Detail Transaksi</CardTitle>
						<CardDescription>Informasi lengkap transaksi Anda</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium text-gray-500">
									Reference ID
								</label>
								<p className="text-sm font-mono bg-gray-100 p-2 rounded">
									{transaction.reference}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">
									Merchant Reference
								</label>
								<p className="text-sm font-mono bg-gray-100 p-2 rounded">
									{transaction.merchant_ref}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">
									Metode Pembayaran
								</label>
								<p className="text-sm">{transaction.payment_name}</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">
									Total Pembayaran
								</label>
								<p className="text-sm font-semibold">
									{formatCurrency(transaction.amount)}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">
									Waktu Dibuat
								</label>
								<p className="text-sm">
									{formatDate(transaction.expired_time - 3600)}
								</p>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-500">
									Batas Waktu
								</label>
								<p className="text-sm">
									{formatDate(transaction.expired_time)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Customer Information */}
				<Card>
					<CardHeader>
						<CardTitle>Informasi Customer</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div>
							<label className="text-sm font-medium text-gray-500">Nama</label>
							<p className="text-sm">{transaction.customer_name}</p>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-500">Email</label>
							<p className="text-sm">{transaction.customer_email}</p>
						</div>
						<div>
							<label className="text-sm font-medium text-gray-500">
								Telepon
							</label>
							<p className="text-sm">{transaction.customer_phone}</p>
						</div>
					</CardContent>
				</Card>

				{/* Order Items */}
				{transaction.order_items && transaction.order_items.length > 0 && (
					<Card>
						<CardHeader>
							<CardTitle>Detail Pesanan</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{transaction.order_items.map((item, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-2 border-b last:border-b-0"
									>
										<div>
											<p className="font-medium">{item.name}</p>
											<p className="text-sm text-gray-500">
												Qty: {item.quantity}
											</p>
										</div>
										<p className="font-semibold">
											{formatCurrency(item.price)}
										</p>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Fee Breakdown */}
				<Card>
					<CardHeader>
						<CardTitle>Rincian Biaya</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex justify-between">
							<span>Jumlah Transaksi</span>
							<span>{formatCurrency(transaction.amount_received)}</span>
						</div>
						<div className="flex justify-between">
							<span>Biaya Admin</span>
							<span>{formatCurrency(transaction.total_fee)}</span>
						</div>
						<div className="flex justify-between font-semibold pt-2 border-t">
							<span>Total Pembayaran</span>
							<span>{formatCurrency(transaction.amount)}</span>
						</div>
					</CardContent>
				</Card>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button variant="outline" onClick={fetchTransactionStatus}>
						<RefreshCw className="h-4 w-4 mr-2" />
						Refresh Status
					</Button>
					<Button variant="outline" asChild>
						<Link href="/topup">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Kembali ke Top Up
						</Link>
					</Button>
					{transaction.status.toUpperCase() === "UNPAID" &&
						transaction.checkout_url && (
							<Button asChild>
								<a
									href={transaction.checkout_url}
									target="_blank"
									rel="noopener noreferrer"
								>
									Lanjutkan Pembayaran
								</a>
							</Button>
						)}
				</div>
			</div>
		</div>
	)
}

export default function PaymentStatus() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<Card className="w-full max-w-md">
						<CardContent className="p-6">
							<div className="flex items-center justify-center space-x-2">
								<RefreshCw className="h-5 w-5 animate-spin" />
								<span>Loading...</span>
							</div>
						</CardContent>
					</Card>
				</div>
			}
		>
			<PaymentStatusContent />
		</Suspense>
	)
}
