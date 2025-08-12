"use client"

import React, { useState } from "react"
import { AlertCircle, Calendar, Clock, Sparkles } from "lucide-react"
import {
	weeklyLevels,
	monthlyLevels,
	formatNumber,
	unformatNumber,
} from "@/constants/constants"
import {
	calculateBonuses,
	findCurrentLevel,
	calculateReward,
} from "@/utils/dazz-utils"
import { Level, RewardLevel } from "@/types/types"

export default function KalkulatorDazzPage(): React.JSX.Element {
	const [input, setInput] = useState<string>("")
	const [result, setResult] = useState<number | null>(null)
	const [level, setLevel] = useState<Level | null>(null)
	const [rewardLevel, setRewardLevel] = useState<RewardLevel | null>(null)
	const [bonuses, setBonuses] = useState<ReturnType<
		typeof calculateBonuses
	> | null>(null)
	const [reward, setReward] = useState<number | null>(null)
	const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly")
	const [displayTab, setDisplayTab] = useState<"income" | "reward">("income")

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numeric = e.target.value.replace(/[^\d]/g, "")
		setInput(numeric === "" ? "" : formatNumber(parseInt(numeric)))
	}

	const calculateIncome = () => {
		if (!input) return
		const value = parseFloat(unformatNumber(input))
		const data = activeTab === "weekly" ? weeklyLevels : monthlyLevels
		const current = findCurrentLevel(value, data)
		if (!current) return

		const calculatedBonuses = calculateBonuses(
			value,
			current,
			activeTab === "weekly",
		)

		const { reward: calculatedReward, level: calculatedRewardLevel } =
			calculateReward(value)

		setLevel(current)
		setBonuses(calculatedBonuses)
		setResult(calculatedBonuses.total)
		setReward(calculatedReward)
		setRewardLevel(calculatedRewardLevel)
	}

	const resetCalculator = () => {
		setInput("")
		setResult(null)
		setLevel(null)
		setBonuses(null)
		setReward(null)
		setRewardLevel(null)
	}

	const handleTabChange = (tab: "weekly" | "monthly") => {
		setActiveTab(tab)
		resetCalculator()
	}

	const handleDisplayTabChange = (tab: "income" | "reward") => {
		setDisplayTab(tab)
	}

	return (
		<div className="max-w-md mx-auto p-4 rounded-xl bg-gradient-deep-space-alt border border-white/10 shadow-lg backdrop-blur relative">
			<header className="bg-gradient-purple-pink p-6 rounded-lg text-center">
				<div className="inline-flex p-3 rounded-full bg-white/10 mb-3">
					<Sparkles className="w-6 h-6 text-accent" />
				</div>
				<h2 className="text-2xl font-bold text-accent">
					DAZZ Income Calculator
				</h2>
				<p className="text-gradient-deep-space">
					Calculate your streaming earnings
				</p>
			</header>

			<section className="p-6">
				<div className="flex mb-6 bg-gradient-deep-space-alt rounded-lg p-1">
					{(["weekly", "monthly"] as const).map((tab) => (
						<button
							key={tab}
							className={`flex-1 py-2 rounded-md transition-all ${
								activeTab === tab
									? "bg-gradient-purple-pink text-accent shadow-md"
									: "text-accent hover:text-accent"
							}`}
							onClick={() => handleTabChange(tab)}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>

				<div className="mb-6">
					<label className="block text-sm font-medium text-accent mb-2">
						Enter Diamond Amount
					</label>
					<div className="relative">
						<input
							type="text"
							value={input}
							onChange={handleInputChange}
							placeholder="1.000.000"
							className="w-full px-4 py-3 bg-gradient-deep-space-alt border border-white/10 rounded-lg text-accent placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
						/>
						<span className="absolute right-3 top-3 text-secondary">
							diamonds
						</span>
					</div>
				</div>

				<div className="flex gap-3 mb-6">
					<button
						onClick={calculateIncome}
						className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-accent py-3 px-4 rounded-lg shadow-md hover:shadow-lg"
					>
						Calculate
					</button>
					<button
						onClick={resetCalculator}
						className="flex-1 bg-white/10 border border-white/20 text-accent py-3 px-4 rounded-lg"
					>
						Reset
					</button>
				</div>

				{result !== null && level && bonuses && reward !== null && (
					<div className="space-y-4">
						<div className="flex mb-4 bg-gradient-deep-space-alt rounded-lg p-1">
							{(["income", "reward"] as const).map((tab) => (
								<button
									key={tab}
									className={`flex-1 py-2 rounded-md transition-all ${
										displayTab === tab
											? "bg-gradient-purple-pink text-accent shadow-md"
											: "text-accent hover:text-accent"
									}`}
									onClick={() => handleDisplayTabChange(tab)}
								>
									{tab.charAt(0).toUpperCase() + tab.slice(1)}
								</button>
							))}
						</div>

						{displayTab === "income" ? (
							<>
								<div className="text-center bg-accent-foreground p-4 rounded-lg border border-white/10">
									<div className="inline-flex w-12 h-12 rounded-full bg-white/10 mb-2 items-center justify-center">
										<Sparkles className="w-5 h-5 text-accent" />
									</div>
									<h3 className="text-xl font-bold text-accent">
										Level {level.level}
									</h3>
									<p className="text-accent text-sm">
										Range: {formatNumber(level.range[0])} -{" "}
										{level.range[1] === Infinity
											? "∞"
											: formatNumber(level.range[1])}
									</p>
								</div>

								<div className="grid grid-cols-2 gap-3 bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10">
									<div className="flex items-center gap-2">
										<Calendar className="w-5 h-5 text-accent" />
										<div>
											<p className="text-xs text-accent">Valid Days</p>
											<p className="text-lg font-semibold text-accent">
												{level.validDays}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="w-5 h-5 text-accent" />
										<div>
											<p className="text-xs text-accent">Valid Hours</p>
											<p className="text-lg font-semibold text-accent">
												{level.validHours}
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									{["basicBonus", "durationBonus"].map((key) => (
										<div
											key={key}
											className="bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10 flex justify-between items-center"
										>
											<p className="text-sm text-accent">
												{key === "basicBonus"
													? `Basic Bonus (${level.basicBonus}%)`
													: `Duration Bonus (${level.durationBonus}%)`}
											</p>
											<p className="text-sm font-semibold text-accent">
												{bonuses[key as keyof typeof bonuses].toLocaleString(
													"id-ID",
													{
														style: "currency",
														currency: "IDR",
														minimumFractionDigits: 0,
													},
												)}
											</p>
										</div>
									))}

									{activeTab === "weekly" && level.extraBonus && (
										<div className="bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10 flex justify-between items-center">
											<p className="text-sm text-accent">
												Extra Bonus ({level.extraBonus}%)
											</p>
											<p className="text-sm font-semibold text-accent">
												{bonuses.extraBonus.toLocaleString("id-ID", {
													style: "currency",
													currency: "IDR",
													minimumFractionDigits: 0,
												})}
											</p>
										</div>
									)}

									<div className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 p-4 rounded-lg border border-pink-400/20 flex justify-between items-center">
										<p className="text-sm text-accent">
											Total Income ({level.percentage}%)
										</p>
										<p className="text-xl font-bold text-accent">
											{result.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											})}
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="text-center bg-accent-foreground p-4 rounded-lg border border-white/10">
									<div className="inline-flex w-12 h-12 rounded-full bg-white/10 mb-2 items-center justify-center">
										<Sparkles className="w-5 h-5 text-accent" />
									</div>
									<h3 className="text-xl font-bold text-accent">
										Reward Level {rewardLevel?.level || "-"}
									</h3>
									<p className="text-accent text-sm">
										Range:{" "}
										{rewardLevel
											? formatNumber(rewardLevel.diamondRange[0])
											: "0"}{" "}
										-{" "}
										{rewardLevel?.diamondRange[1] === Infinity
											? "∞"
											: rewardLevel
											? formatNumber(rewardLevel.diamondRange[1])
											: "0"}
									</p>
								</div>

								<div className="grid grid-cols-2 gap-3 bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10">
									<div className="flex items-center gap-2">
										<Calendar className="w-5 h-5 text-accent" />
										<div>
											<p className="text-xs text-accent">Valid Days</p>
											<p className="text-lg font-semibold text-accent">
												{rewardLevel?.validDays || "-"}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Clock className="w-5 h-5 text-accent" />
										<div>
											<p className="text-xs text-accent">Valid Hours</p>
											<p className="text-lg font-semibold text-accent">
												{rewardLevel?.validHours || "-"}
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									<div className="bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10 flex justify-between items-center">
										<p className="text-sm text-accent">
											Reward Percentage ({rewardLevel?.percentage || "0"}%)
										</p>
										<p className="text-sm font-semibold text-accent">
											{reward?.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}) || "0"}
										</p>
									</div>

									<div className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 p-4 rounded-lg border border-pink-400/20 flex justify-between items-center">
										<p className="text-sm text-accent">Total Reward</p>
										<p className="text-xl font-bold text-accent">
											{reward?.toLocaleString("id-ID", {
												style: "currency",
												currency: "IDR",
												minimumFractionDigits: 0,
											}) || "0"}
										</p>
									</div>
								</div>
							</>
						)}

						<div className="flex items-start gap-3 p-4 bg-gradient-deep-space-alt rounded-lg border border-white/10">
							<AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
							<p className="text-sm text-pink-100">
								Salary will be received after completing the required Valid Days
								and Valid Hours
							</p>
						</div>
					</div>
				)}
			</section>
		</div>
	)
}
