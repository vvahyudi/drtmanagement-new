"use client"

import { useState } from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSellRecords } from "@/lib/hooks/use-rivo-queries"
import { formatDate } from "@/lib/utils"

interface TransactionsTableProps {
	page?: number
	pageSize?: number
	className?: string
}

export function TransactionsTable({
	page: initialPage = 1,
	pageSize = 10,
	className,
}: TransactionsTableProps) {
	const [page, setPage] = useState(initialPage)
	const [searchUserId, setSearchUserId] = useState("")
	const [searchOrderNum, setSearchOrderNum] = useState("")
	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState("")

	// Set default time range to fetch from most recent if no dates selected
	const now = Math.floor(Date.now() / 1000)
	const oneYearAgo = now - 365 * 24 * 60 * 60 // One year ago in seconds

	const {
		data: rawData,
		isLoading,
		error,
	} = useSellRecords({
		page,
		size: pageSize,
		toUId: searchUserId ? parseInt(searchUserId) : undefined,
		orderNum: searchOrderNum || undefined,
		startTimeTicks: startDate
			? new Date(startDate).getTime() / 1000
			: endDate
			? undefined
			: oneYearAgo,
		endTimeTicks: endDate
			? new Date(endDate).getTime() / 1000
			: startDate
			? undefined
			: now,
	})

	// Process the raw data
	const data = rawData

	const handleSearch = () => {
		setPage(1) // Reset to first page when searching
	}

	const handleClear = () => {
		setSearchUserId("")
		setSearchOrderNum("")
		setStartDate("")
		setEndDate("")
		setPage(1)
	}

	return (
		<div className={className}>
			{/* Search Filters */}
			<div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
				<div>
					<Input
						placeholder="Search by User ID"
						value={searchUserId}
						onChange={(e) => setSearchUserId(e.target.value)}
						type="number"
					/>
				</div>
				<div>
					<Input
						placeholder="Search by Order Number"
						value={searchOrderNum}
						onChange={(e) => setSearchOrderNum(e.target.value)}
					/>
				</div>
				<div>
					<Input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
				</div>
				<div>
					<Input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
			</div>
			<div className="mb-4 flex gap-2">
				<Button onClick={handleSearch} disabled={isLoading}>
					Search
				</Button>
				<Button variant="outline" onClick={handleClear} disabled={isLoading}>
					Clear Filters
				</Button>
			</div>

			{/* Table */}
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order Number</TableHead>
							<TableHead>Platform Order ID</TableHead>
							<TableHead>User ID</TableHead>
							<TableHead>Coins</TableHead>
							<TableHead>Date</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									Loading transactions...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center text-red-500">
									Error loading transactions
								</TableCell>
							</TableRow>
						) : !data?.records?.length ? (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No transactions found
								</TableCell>
							</TableRow>
						) : (
							data.records.map((record) => (
								<TableRow
									key={`${record.orderNum}-${record.platFormOrderId}-${record.createTimeTicks}`}
								>
									<TableCell className="font-medium">
										{record.orderNum}
									</TableCell>
									<TableCell>{record.platFormOrderId}</TableCell>
									<TableCell>{record.uid}</TableCell>
									<TableCell>{Number(record.coin).toLocaleString()}</TableCell>
									<TableCell>
										{formatDate(Number(record.createTimeTicks))}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<div className="mt-4 flex items-center justify-between">
				<Button
					variant="outline"
					onClick={() => setPage((p) => Math.max(1, p - 1))}
					disabled={page === 1 || isLoading}
				>
					Previous
				</Button>
				<span className="text-sm text-gray-600">
					Page {page}
					{data?.records && ` (${data.records.length} records)`}
				</span>
				<Button
					variant="outline"
					onClick={() => setPage((p) => p + 1)}
					disabled={
						isLoading || (data?.records && data.records.length < pageSize)
					}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
