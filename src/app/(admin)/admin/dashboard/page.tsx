"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionsTable } from "@/components/transactions-table"
import { useCoinBalance } from "@/lib/hooks/use-rivo-queries"

import React from "react"

function DashboardPageContent() {
	const { data: balanceData, isLoading: balanceLoading } = useCoinBalance()
	return (
		<div className="space-y-8 p-4">
			<header>
				<h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
				<div className="text-sm text-primary/50">Welcome, Guest</div>
			</header>

			{/* Stats Cards */}
			<section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-primary/50">
							Coin Balance
						</CardTitle>
					</CardHeader>
					<CardContent>
						{balanceLoading ? (
							<div className="animate-pulse h-8 w-1/2 bg-background rounded"></div>
						) : (
							<>
								<div className="text-2xl font-bold text-primary">
									{balanceData?.coinBalance.toLocaleString()}
								</div>
								<p className="text-xs text-primary/50 mt-1">Available coins</p>
							</>
						)}
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-primary/50">
							Today&apos;s Sales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">-</div>
						<p className="text-xs text-primary/50 mt-1">
							From today&apos;s transactions
						</p>
					</CardContent>
				</Card>

				<Card className="hover:shadow-md transition-shadow">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-primary/50">
							Success Rate
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">100%</div>
						<p className="text-xs text-primary/50 mt-1">Last 30 days</p>
					</CardContent>
				</Card>
			</section>

			{/* Transactions Section */}
			<section className="bg-background rounded-lg border shadow-sm">
				<div className="p-6">
					<h2 className="text-lg font-semibold text-primary mb-4">
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
