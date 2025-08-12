"use client"

import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/lib/fetcher"
import type { TransactionWithDetails } from "@/types/transaction"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useMemo, useState } from "react"
import {
	Loader2,
	CheckCircle2,
	AlertCircle,
	Clock,
	QrCode,
	ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StatusByInvoicePage() {
	const { invoiceId } = useParams()
	const {
		data: trx,
		isLoading,
		isFetching,
		refetch,
	} = useQuery<TransactionWithDetails | undefined>({
		queryKey: ["invoice-status", invoiceId],
		queryFn: () =>
			fetcher<TransactionWithDetails>(`/api/rivo/invoice/${invoiceId}`),
		refetchInterval: (query) => {
			const data = query.state.data
			const stillPending =
				!!data &&
				data.status === "PENDING" &&
				data.processingStatus === "UNPAID"
			return stillPending ? 5000 : false
		},
		enabled: !!invoiceId,
	})

	// Live countdown until expiry (if pending + expiredAt exists)
	const [nowTs, setNowTs] = useState<number>(() => Date.now())
	const countdown = useMemo(() => {
		if (!trx?.expiredAt) return null
		const end = new Date(trx.expiredAt).getTime()
		const ms = Math.max(0, end - nowTs)
		const m = Math.floor(ms / 60000)
		const s = Math.floor((ms % 60000) / 1000)
		return { ms, m, s }
	}, [trx?.expiredAt, nowTs])

	useEffect(() => {
		if (!trx) return
		const isPending =
			trx.status === "PENDING" && trx.processingStatus === "UNPAID"
		if (!isPending || !trx.expiredAt) return
		const id = setInterval(() => setNowTs(Date.now()), 1000)
		return () => clearInterval(id)
	}, [trx])

	useEffect(() => {
		if (!trx) return

		if (trx.status === "PAID") {
			toast.success("Pembayaran berhasil!", {
				description: "Terima kasih telah melakukan pembayaran.",
			})
		}
		if (trx.processingStatus === "DELIVERED") {
			toast.success("Koin berhasil dikirim!", {
				description: `${trx.totalAmount.toLocaleString()} koin sudah masuk ke akun Anda.`,
			})
		}
	}, [trx])

	useEffect(() => {
		if (!trx?.expiredAt) return
		if (trx.status !== "PENDING" || trx.processingStatus !== "UNPAID") return
		if (!countdown) return
		if (countdown.ms === 0) {
			refetch()
		}
	}, [
		countdown?.ms,
		trx?.status,
		trx?.processingStatus,
		trx?.expiredAt,
		refetch,
	])

	if (isLoading)
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<p className="text-muted-foreground">Memeriksa status pembayaran...</p>
			</div>
		)

	if (!trx)
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
				<AlertCircle className="h-10 w-10 text-destructive" />
				<h1 className="text-xl font-bold text-foreground">
					Transaksi tidak ditemukan
				</h1>
				<p className="text-muted-foreground text-center">
					Invoice ID{" "}
					<span className="font-mono bg-muted px-2 py-1 rounded">
						{invoiceId}
					</span>{" "}
					tidak valid
				</p>
				<Button asChild variant="link" className="mt-4">
					<Link href="/">Kembali ke beranda</Link>
				</Button>
			</div>
		)

	type PaymentStatusType = "PENDING" | "PAID" | "EXPIRED"
	interface PaymentStatusInfo {
		icon: React.ReactNode
		color: string
		bg: string
		message: string
		action: string
		progress: number
	}
	const paymentStatus: Record<PaymentStatusType, PaymentStatusInfo> = {
		PENDING: {
			icon: <Clock className="h-5 w-5 text-yellow-500" />,
			color: "text-yellow-600",
			bg: "bg-yellow-50",
			message: "Menunggu Pembayaran",
			action: "Silakan selesaikan pembayaran Anda",
			progress: 30,
		},
		PAID: {
			icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
			color: "text-green-600",
			bg: "bg-green-50",
			message: "Pembayaran Berhasil",
			action: "Pembayaran telah diterima",
			progress: 70,
		},
		EXPIRED: {
			icon: <AlertCircle className="h-5 w-5 text-red-500" />,
			color: "text-red-600",
			bg: "bg-red-50",
			message: "Pembayaran Kadaluarsa",
			action: "Silakan buat pesanan baru",
			progress: 0,
		},
	}

	const isExpiredLike =
		trx.status === "FAILED" || trx.processingStatus === "CANCELLED"
	const currentStatus = isExpiredLike
		? paymentStatus.EXPIRED
		: paymentStatus[trx.status as PaymentStatusType]

	return (
		<div className="min-h-screen bg-background p-4 md:p-6">
			<div className="mx-auto max-w-md space-y-6">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">
						Status Transaksi
					</h1>
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<span>Invoice:</span>
						<Badge variant="outline" className="font-mono">
							{trx.invoiceId}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						{new Date(trx.createdAt).toLocaleString("id-ID", {
							day: "numeric",
							month: "long",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				</div>

				{/* Progress Indicator */}
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span className="font-medium">Status Proses</span>
						<span className={currentStatus.color}>{currentStatus.message}</span>
					</div>
					<Progress value={currentStatus.progress} className="h-2" />
					<div className="grid grid-cols-3 text-xs text-muted-foreground">
						<span>Pembayaran</span>
						<span className="text-center">Verifikasi</span>
						<span className="text-right">Pengiriman</span>
					</div>
					{trx.status === "PENDING" &&
						trx.processingStatus === "UNPAID" &&
						trx.expiredAt && (
							<div className="mt-2 text-xs text-muted-foreground text-center">
								{countdown && countdown.ms > 0 ? (
									<span>
										Kedaluwarsa dalam {String(countdown.m).padStart(2, "0")}:
										{String(countdown.s).padStart(2, "0")} menit
									</span>
								) : (
									<span>Kedaluwarsa… memperbarui status</span>
								)}
							</div>
						)}
				</div>

				{/* Status Card */}
				<div className="rounded-lg border p-4 bg-background">
					<div className="flex items-center gap-3">
						{currentStatus.icon}
						<div>
							<h2 className="font-semibold">{currentStatus.message}</h2>
							<p className="text-sm text-muted-foreground">
								{currentStatus.action}
							</p>
						</div>
					</div>

					{/* QRIS Payment Section */}
					{trx.paymentMethodName === "QRIS" && (
						<div className="mt-4 space-y-3">
							<div className="flex items-center gap-2">
								<QrCode className="h-5 w-5 text-primary" />
								<h3 className="font-medium">
									{trx.status === "PAID"
										? "QR Pembayaran"
										: "Bayar dengan QRIS"}
								</h3>
							</div>
							<div className="flex justify-center">
								<div className="border rounded-lg p-4 bg-white">
									<Image
										src="/qris-bca-only.jpg"
										alt="QRIS Payment Code"
										width={180}
										height={180}
										className="object-contain"
										priority={trx.status === "PENDING"}
									/>
								</div>
							</div>
							<div className="text-center space-y-1">
								<p className="text-sm text-muted-foreground">
									{trx.status === "PAID"
										? "QR code pembayaran (sudah dibayar)"
										: "Scan QR code untuk menyelesaikan pembayaran"}
								</p>
								<p className="text-xl font-bold">
									Rp {trx.price.toLocaleString("id-ID")}
								</p>
								{trx.status === "PAID" && (
									<Badge variant="outline" className="text-green-600">
										Pembayaran terverifikasi
									</Badge>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Accordion Sections */}
				<Accordion
					type="multiple"
					defaultValue={["summary"]}
					className="w-full"
				>
					{/* Order Summary */}
					<AccordionItem value="summary">
						<AccordionTrigger className="hover:no-underline">
							<div className="flex items-center gap-2">
								<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
								<span className="font-medium">Ringkasan Pesanan</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-0 pt-2">
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Produk:</span>
									<span className="font-medium">{trx.product.name}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Jumlah Koin:</span>
									<span className="font-medium">
										{trx.amount.toLocaleString("id-ID")}
									</span>
								</div>
								{trx.bonus > 0 && (
									<div className="flex justify-between">
										<span className="text-muted-foreground">Bonus:</span>
										<span className="font-medium text-green-600">
											+{trx.bonus.toLocaleString("id-ID")}
										</span>
									</div>
								)}
								<div className="border-t pt-3 flex justify-between">
									<span className="text-muted-foreground">Total Koin:</span>
									<span className="font-bold">
										{trx.totalAmount.toLocaleString("id-ID")}
									</span>
								</div>
								<div className="border-t pt-3 flex justify-between">
									<span className="text-muted-foreground">
										Total Pembayaran:
									</span>
									<span className="font-bold text-primary">
										Rp {trx.price.toLocaleString("id-ID")}
									</span>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* Customer Info */}
					<AccordionItem value="customer">
						<AccordionTrigger className="hover:no-underline">
							<div className="flex items-center gap-2">
								<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
								<span className="font-medium">Informasi Pelanggan</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="pb-0 pt-2">
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Nomor WhatsApp:</span>
									<span className="font-medium">
										{trx.customer.phoneNumber}
									</span>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* Payment Instructions */}
					{trx.status === "PENDING" && (
						<AccordionItem value="instructions">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-2">
									<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
									<span className="font-medium">Instruksi Pembayaran</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-0 pt-2">
								<ol className="space-y-3">
									<li className="flex gap-2">
										<span className="text-primary font-bold">1.</span>
										<span>
											Scan QR code QRIS di atas menggunakan aplikasi pembayaran
											digital (OVO, Gopay, ShopeePay, DANA, dll).
										</span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary font-bold">2.</span>
										<span>
											Pastikan nominal yang ditransfer sesuai, yaitu{" "}
											<span className="font-bold">
												Rp {trx.price.toLocaleString("id-ID")}
											</span>
											.
										</span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary font-bold">3.</span>
										<span>
											Setelah pembayaran berhasil, simpan bukti transfer Anda.
										</span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary font-bold">4.</span>
										<span>
											Sistem akan memverifikasi pembayaran Anda secara otomatis
											dalam 1-2 menit.
										</span>
									</li>
									<li className="flex gap-2">
										<span className="text-primary font-bold">5.</span>
										<span>
											Jika mengalami kendala, hubungi admin via WhatsApp di{" "}
											<span className="font-bold">
												{trx.customer.phoneNumber}
											</span>
											.
										</span>
									</li>
								</ol>
							</AccordionContent>
						</AccordionItem>
					)}
				</Accordion>

				{/* Status Indicator */}
				{isFetching && (
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<Loader2 className="h-4 w-4 animate-spin" />
						<span>Memperbarui status...</span>
					</div>
				)}

				{/* Actions */}
				<div className="flex flex-col gap-3 pt-2">
					{trx.status === "PENDING" && (
						<Button variant="outline" onClick={() => window.location.reload()}>
							Periksa Status Pembayaran
						</Button>
					)}
					<Button asChild>
						<Link href="/">Kembali ke Beranda</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
