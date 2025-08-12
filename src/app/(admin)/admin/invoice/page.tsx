"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { useSellCoin } from "@/lib/hooks/use-rivo-queries"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React from "react"

export default function InvoicePage() {
	return (
		<div className="space-y-8 p-4">
			<header>
				<h1 className="text-2xl font-bold text-primary">
					Transaction Management
				</h1>
				<div className="text-sm text-primary/50">
					Kelola transaksi penjualan & pengiriman koin
				</div>
			</header>
			<section className="bg-background rounded-lg border shadow-sm">
				<div className="p-6">
					<h2 className="text-lg font-semibold text-primary mb-4">
						Daftar Transaksi
					</h2>
					{/* Table komponen lama tetap dipakai, bisa dipecah ke komponen terpisah jika ingin lebih modular */}
					<AdminTransactionTable />
				</div>
			</section>
		</div>
	)
}

// Komponen table transaksi lama tetap digunakan
type Transaction = {
	id: string
	createdAt: string
	invoiceId: string
	requestBody?: {
		clientId?: string
		amount?: number
	}
	amount?: number
	bonus?: number
	price?: number
	totalAmount?: number
	processingStatus: string
}

function AdminTransactionTable() {
	const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

	const { data, isLoading, refetch } = useQuery<
		{ transactions: Transaction[] } | Transaction[]
	>({
		queryKey: ["transactions"],
		queryFn: async () => {
			const res = await fetch("/api/admin/transactions")
			if (!res.ok) throw new Error("Failed to fetch transactions")
			return res.json()
		},
		refetchInterval: 10000,
	})
	const { mutate: sellCoin } = useSellCoin()
	const [sendingMap, setSendingMap] = useState<Record<string, boolean>>({})
	const handleSendCoin = async (tx: Transaction) => {
		const { invoiceId, requestBody } = tx
		const userId = requestBody?.clientId
		const coinAmount = requestBody?.amount
		if (!userId || !coinAmount) return
		setSendingMap((prev) => ({ ...prev, [invoiceId]: true }))
		sellCoin(
			{ userId: Number(userId), amount: coinAmount },
			{
				onSuccess: async () => {
					await fetch("/api/admin/confirm-delivery", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ invoiceId }),
					})
					await refetch()
					toast.success("Koin berhasil dikirim")
				},
				onError: () => toast.error("Gagal mengirim koin"),
				onSettled: () =>
					setSendingMap((prev) => ({ ...prev, [invoiceId]: false })),
			},
		)
	}
	// Helper for readable date in Indonesian
	function formatTanggal(dateStr: string) {
		if (!dateStr) return "-"
		const date = new Date(dateStr)
		return (
			date.toLocaleDateString("id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric",
			}) +
			" " +
			date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
		)
	}

	return (
		<div className="rounded-lg bg-background overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Tgl Transaksi</TableHead>
						<TableHead>Invoice</TableHead>
						<TableHead>Rivo ID</TableHead>
						<TableHead>Koin</TableHead>
						<TableHead>Cashback</TableHead>
						<TableHead>Harga</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Aksi</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-xs">
					{isLoading || !data
						? Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={i}>
									<TableCell colSpan={7}>
										<Skeleton className="h-10 w-full" />
									</TableCell>
								</TableRow>
						  ))
						: (Array.isArray(data) ? data : data.transactions).map(
								(tx: Transaction) => (
									<TableRow key={tx.id}>
										<TableCell>{formatTanggal(tx.createdAt)}</TableCell>
										<TableCell>{tx.invoiceId}</TableCell>
										<TableCell className="font-mono text-sm text-primary/60">
											{tx.requestBody?.clientId || "-"}
										</TableCell>
										<TableCell>{tx.amount?.toLocaleString()}</TableCell>
										<TableCell>{tx.bonus?.toLocaleString()}</TableCell>
										<TableCell>Rp {tx.price?.toLocaleString()}</TableCell>
										<TableCell>
											<Badge
												variant={
													tx.processingStatus === "DELIVERED"
														? "default"
														: "secondary"
												}
											>
												{tx.processingStatus}
											</Badge>
										</TableCell>
										<TableCell className="space-x-2">
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button
														size="sm"
														variant="outline"
														onClick={() => setSelectedTx(tx)}
														disabled={tx.processingStatus === "DELIVERED"}
													>
														{sendingMap[tx.invoiceId] ? (
															<span>
																<Skeleton className="inline-block h-4 w-4 mr-2 align-middle" />
																Loading...
															</span>
														) : (
															"Kirim Koin"
														)}
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Konfirmasi Pengiriman
														</AlertDialogTitle>
													</AlertDialogHeader>
													<p>
														Pastikan pembayaran untuk{" "}
														<strong>{selectedTx?.invoiceId}</strong>
														sudah diterima. Lanjut kirim koin?
													</p>
													<AlertDialogFooter>
														<AlertDialogCancel>Batal</AlertDialogCancel>
														<AlertDialogAction
															onClick={() => {
																if (selectedTx) {
																	handleSendCoin(selectedTx)
																	setSelectedTx(null)
																}
															}}
														>
															Lanjutkan
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleSendWhatsApp(tx.invoiceId)}
											>
												Kirim WA
											</Button>
										</TableCell>
									</TableRow>
								),
						  )}
				</TableBody>
			</Table>
		</div>
	)
}

function handleSendWhatsApp(invoiceId: string) {
	console.log("Send WA:", invoiceId)
	// TODO: call /api/notify-wa
}
