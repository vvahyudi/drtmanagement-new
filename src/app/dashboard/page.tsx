"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionsTable } from "@/components/transactions-table"
import { useCoinBalance } from "@/lib/hooks/use-rivo-queries"

import React from "react"

function DashboardPageContent() {
	const { data: balanceData, isLoading: balanceLoading } = useCoinBalance()
	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
				<div className="text-sm text-gray-500">Welcome, Guest</div>
			</header>

			{/* Stats Cards */}
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Coin Balance
						</CardTitle>
					</CardHeader>
					<CardContent>
						{balanceLoading ? (
							<div className="animate-pulse h-8 w-1/2 bg-gray-200 rounded"></div>
						) : (
							<>
								<div className="text-2xl font-bold text-gray-800">
									{balanceData?.coinBalance.toLocaleString()}
								</div>
								<p className="text-xs text-gray-500 mt-1">Available coins</p>
							</>
						)}
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Today&apos;s Sales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-800">-</div>
						<p className="text-xs text-gray-500 mt-1">
							From today&apos;s transactions
						</p>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-500">
							Success Rate
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-800">100%</div>
						<p className="text-xs text-gray-500 mt-1">Last 30 days</p>
					</CardContent>
				</Card>
			</section>

			{/* Transactions Section */}
			<section className="bg-white rounded-lg border shadow-sm">
				<div className="p-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-4">
						Transaction History
					</h2>
					<TransactionsTable pageSize={10} />
				</div>
			</section>
		</div>
	)
}

export default function DashboardPage() {
	return <DashboardPageContent />
}
