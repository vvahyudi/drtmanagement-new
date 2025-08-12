import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
	CheckCircle2,
	AlertCircle,
	Clock,
	QrCode,
	ChevronDown,
} from "lucide-react"

export const dynamic = "force-dynamic" // optional: hindari cache untuk detail pembayaran

export default async function PaymentDetailPage({
	params,
}: {
	params: Promise<{ invoiceId: string }>
}) {
	const { invoiceId } = await params

	const transaction = await prisma.transaction.findUnique({
		where: { invoiceId },
		include: { customer: true, product: true },
	})

	if (!transaction) return notFound()

	let {
		status,
		processingStatus,
		product,
		customer,
		price,
		amount,
		bonus,
		paymentMethodName,
		createdAt,
		expiredAt,
	} = transaction

	// Lazy expiration on SSR: update if past expiry and still pending/unpaid
	if (
		expiredAt &&
		new Date(expiredAt).getTime() <= Date.now() &&
		status === "PENDING" &&
		processingStatus === "UNPAID"
	) {
		const updated = await prisma.transaction.update({
			where: { id: transaction.id },
			data: { status: "FAILED", processingStatus: "CANCELLED" },
			include: { customer: true, product: true },
		})
		status = updated.status
		processingStatus = updated.processingStatus
		product = updated.product
		customer = updated.customer
		price = updated.price
		amount = updated.amount
		bonus = updated.bonus
		paymentMethodName = updated.paymentMethodName
		createdAt = updated.createdAt
	}

	const formattedDate = new Date(createdAt).toLocaleString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})

	const totalAmount = (amount ?? 0) + (bonus ?? 0)

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

	const isExpiredLike = status === "FAILED" || processingStatus === "CANCELLED"
	const currentStatus = isExpiredLike
		? paymentStatus.EXPIRED
		: paymentStatus[status as PaymentStatusType]

	return (
		<div className="min-h-screen bg-background p-4 md:p-6">
			<div className="mx-auto max-w-md space-y-6">
				{/* Header */}
				<div className="text-center space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">
						Detail Pembayaran
					</h1>
					<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
						<span>Invoice:</span>
						<Badge variant="outline" className="font-mono">
							{invoiceId}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{formattedDate}</p>
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
					{status === "PENDING" &&
						processingStatus === "UNPAID" &&
						expiredAt && (
							<div className="mt-2 text-xs text-muted-foreground text-center">
								<span>
									Kedaluwarsa pada{" "}
									{new Date(expiredAt).toLocaleTimeString("id-ID", {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</span>
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
					{paymentMethodName === "QRIS" && (
						<div className="mt-4 space-y-3">
							<div className="flex items-center gap-2">
								<QrCode className="h-5 w-5 text-primary" />
								<h3 className="font-medium">
									{status === "PAID" ? "QR Pembayaran" : "Bayar dengan QRIS"}
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
										priority={status === "PENDING"}
									/>
								</div>
							</div>
							<div className="text-center space-y-1">
								<p className="text-sm text-muted-foreground">
									{status === "PAID"
										? "QR code pembayaran (sudah dibayar)"
										: "Scan QR code untuk menyelesaikan pembayaran"}
								</p>
								<p className="text-xl font-bold">
									Rp {price.toLocaleString("id-ID")}
								</p>
								{status === "PAID" && (
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
									<span className="font-medium">{product.name}</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Jumlah Koin:</span>
									<span className="font-medium">
										{amount.toLocaleString("id-ID")}
									</span>
								</div>
								{bonus > 0 && (
									<div className="flex justify-between">
										<span className="text-muted-foreground">Bonus:</span>
										<span className="font-medium text-green-600">
											+{bonus.toLocaleString("id-ID")}
										</span>
									</div>
								)}
								<div className="border-t pt-3 flex justify-between">
									<span className="text-muted-foreground">Total Koin:</span>
									<span className="font-bold">
										{totalAmount.toLocaleString("id-ID")}
									</span>
								</div>
								<div className="border-t pt-3 flex justify-between">
									<span className="text-muted-foreground">
										Total Pembayaran:
									</span>
									<span className="font-bold text-primary">
										Rp {price.toLocaleString("id-ID")}
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
									<span className="font-medium">{customer.phoneNumber}</span>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* Payment Instructions */}
					{status === "PENDING" && (
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
												Rp {price.toLocaleString("id-ID")}
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
											<span className="font-bold">{customer.phoneNumber}</span>.
										</span>
									</li>
								</ol>
							</AccordionContent>
						</AccordionItem>
					)}
				</Accordion>

				{/* Actions */}
				<div className="flex flex-col gap-3 pt-2">
					<Button asChild variant="outline">
						<Link href={`/payment/status/${invoiceId}`}>
							Periksa Status Pembayaran
						</Link>
					</Button>
					<Button asChild>
						<Link href="/">Kembali ke Beranda</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
