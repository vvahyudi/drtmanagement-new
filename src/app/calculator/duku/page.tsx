"use client"

import React, { useState } from "react"

import { RefreshCw, Sparkles, Image as ImageIcon } from "lucide-react"
import { formatNumber, unformatNumber } from "@/constants/constants"

export default function KalkulatorDukuPage() {
	const [lucky, setLucky] = useState("")
	const [sLucky, setSLucky] = useState("")
	const [deluxe, setDeluxe] = useState("")
	const [displayTab, setDisplayTab] = useState<"income" | "reward">("income")
	const [ocrLoading, setOcrLoading] = useState(false)
	const [ocrError, setOcrError] = useState("")

	const [incomeResult, setIncomeResult] = useState<null | {
		sLuckyTarget: number
		luckyTarget: number
		deluxeTarget: number
		totalTarget: number
		finalIncome: number
	}>(null)

	const [rewardResult, setRewardResult] = useState<null | {
		target: number
		reward: number
		type: "cash" | "topup"
	}>(null)

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<string>>,
	) => {
		const value = e.target.value.replace(/[^\d]/g, "")
		setter(value === "" ? "" : formatNumber(parseInt(value)))
	}

	const calculateAll = () => {
		const luckyVal = parseFloat(unformatNumber(lucky)) || 0
		const sLuckyVal = parseFloat(unformatNumber(sLucky)) || 0
		const deluxeVal = parseFloat(unformatNumber(deluxe)) || 0

		const luckyTarget = Math.round((luckyVal / 100) * 5)
		const sLuckyTarget = Math.round((sLuckyVal / 100) * 2)
		const deluxeTarget = Math.round((deluxeVal / 100) * 100)
		const totalTarget = luckyTarget + sLuckyTarget + deluxeTarget
		const finalIncome = Math.round(totalTarget * 0.8)
		setIncomeResult({
			luckyTarget,
			sLuckyTarget,
			deluxeTarget,
			totalTarget,
			finalIncome,
		})

		const target = luckyVal * 0.05 + sLuckyVal * 0.02 + deluxeVal
		const rewardRaw = target >= 1_000_000 ? target * 0.07 : target * 0.06
		const type = rewardRaw >= 100_000 ? "cash" : "topup"
		const rewardFinal =
			type === "cash" ? Math.round(rewardRaw) : Math.round(rewardRaw * 0.8)

		setRewardResult({ target: Math.round(target), reward: rewardFinal, type })
	}

	const resetAll = () => {
		setLucky("")
		setSLucky("")
		setDeluxe("")
		setIncomeResult(null)
		setRewardResult(null)
		setOcrError("")
	}

	const handleOcrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setOcrLoading(true)
		setOcrError("")

		const reader = new FileReader()
		reader.readAsDataURL(file)

		reader.onload = async () => {
			try {
				const base64Image = reader.result as string

				const response = await fetch("https://api.ocr.space/parse/image", {
					method: "POST",
					headers: {
						apikey: process.env.NEXT_PUBLIC_OCR_SPACE_API_KEY || "helloworld",
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						base64Image,
						language: "eng",
						isOverlayRequired: "false",
					}),
				})

				const result = await response.json()
				const text = result.ParsedResults?.[0]?.ParsedText || ""

				const luckyMatch = text.match(/(\d{3,})\s*Lucky/i)
				const sLuckyMatch = text.match(/(\d{3,})\s*S[-\s]?Lucky/i)
				const deluxeMatch = text.match(/Deluxe\s+([\d,]+)/i)
				const deluxeValue = deluxeMatch
					? deluxeMatch[1].replace(/,/g, "")
					: text.includes("Deluxe")
					? "0"
					: null
				if (deluxeValue !== null) {
					setDeluxe(formatNumber(parseInt(deluxeValue)))
				}

				if (luckyMatch)
					setLucky(formatNumber(parseInt(luckyMatch[1].replace(/,/g, ""))))
				if (sLuckyMatch)
					setSLucky(formatNumber(parseInt(sLuckyMatch[1].replace(/,/g, ""))))
			} catch (err) {
				console.error(err)
				setOcrError("Failed to extract data using OCR.space API.")
			} finally {
				setOcrLoading(false)
			}
		}
	}

	return (
		<div className="max-w-md mx-auto p-4 rounded-xl bg-gradient-deep-space-alt border border-white/10 shadow-lg backdrop-blur">
			<header className="bg-gradient-green p-6 rounded-lg text-center">
				<div className="inline-flex p-3 rounded-full bg-white/10 mb-3">
					<Sparkles className="w-6 h-6 text-accent" />
				</div>
				<h2 className="text-2xl font-bold text-accent">
					DUKU Income Calculator
				</h2>
				<p className="text-gradient-deep-space">
					Manual or OCR-based reward calculation
				</p>
			</header>

			<section className="p-6">
				<div className="mb-6">
					<label className=" text-sm font-medium text-accent mb-2 flex items-center gap-2">
						<ImageIcon className="w-4 h-4" /> Upload Screenshot (OCR)
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleOcrUpload}
						className="block w-full text-sm text-accent bg-gradient-deep-space-alt rounded-md border border-white/10 file:bg-white/10 file:border file:border-white/20 file:px-4 file:py-2 file:text-accent"
					/>
					{ocrLoading && (
						<p className="text-sm text-yellow-400 mt-2">
							Extracting text from image...
						</p>
					)}
					{ocrError && <p className="text-sm text-red-400 mt-2">{ocrError}</p>}
				</div>

				{(
					[
						["Lucky Gift Points", lucky, setLucky],
						["S-Lucky Gift Points", sLucky, setSLucky],
						["Deluxe Gift Points", deluxe, setDeluxe],
					] as [string, string, React.Dispatch<React.SetStateAction<string>>][]
				).map(([label, value, setter]) => (
					<div className="mb-4" key={label}>
						<label className="block text-sm font-medium text-accent mb-2">
							{label}
						</label>
						<input
							type="text"
							value={value}
							onChange={(e) => handleInputChange(e, setter)}
							placeholder="e.g. 100000"
							className="w-full px-4 py-3 bg-gradient-deep-space-alt border border-white/10 rounded-lg text-accent"
						/>
					</div>
				))}

				<div className="flex gap-3 mb-6">
					<button
						onClick={calculateAll}
						className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-accent py-3 px-4 rounded-lg shadow-md hover:shadow-lg"
					>
						Calculate
					</button>
					<button
						onClick={resetAll}
						className="flex-1 bg-white/10 border border-white/20 text-accent py-3 px-4 rounded-lg flex items-center justify-center gap-2"
					>
						<RefreshCw className="w-4 h-4" /> Reset
					</button>
				</div>

				{(incomeResult || rewardResult) && (
					<div className="flex mb-4 bg-gradient-deep-space-alt rounded-lg p-1">
						{["income", "reward"].map((tab) => (
							<button
								key={tab}
								onClick={() => setDisplayTab(tab as any)}
								className={`flex-1 py-2 rounded-md transition-all ${
									displayTab === tab
										? "bg-gradient-green text-accent shadow-md"
										: "text-accent hover:text-accent"
								}`}
							>
								{tab.toUpperCase()}
							</button>
						))}
					</div>
				)}

				{displayTab === "income" && incomeResult && (
					<div className="space-y-3">
						{Object.entries(incomeResult).map(([label, value]) => (
							<div
								key={label}
								className="bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10 flex justify-between"
							>
								<p className="text-sm text-accent">
									{label.replace(/([A-Z])/g, " $1").trim()}
								</p>
								<p className="text-sm font-semibold text-accent">
									{formatNumber(value)}
								</p>
							</div>
						))}
					</div>
				)}

				{displayTab === "reward" && rewardResult && (
					<div className="space-y-3">
						{["Target", "Reward (Rupiah or Koins)", "Reward Tipe Reward"].map(
							(label, i) => {
								const value =
									i === 0
										? formatNumber(rewardResult.target)
										: i === 1
										? formatNumber(rewardResult.reward)
										: rewardResult.type
								return (
									<div
										key={label}
										className="bg-gradient-deep-space-alt p-3 rounded-lg border border-white/10 flex flex-col"
									>
										<div className="flex justify-between">
											<p className="text-sm text-accent">{label}</p>
											<p className="text-sm font-semibold text-accent">
												{value}
											</p>
										</div>
										{label === "Reward (Rupiah or Coins)" &&
											rewardResult.type === "topup" && (
												<p className="text-xs text-yellow-400 mt-1">
													Reward di bawah Rp100.000 akan otomatis dikonversi
													menjadi koin (80%)
												</p>
											)}
										{label === "Reward (Rupiah or Coins)" &&
											rewardResult.type === "cash" && (
												<p className="text-xs text-green-400 mt-1">
													Reward di atas Rp100.000 akan dibayarkan dalam bentuk
													uang tunai (cash)
												</p>
											)}
									</div>
								)
							},
						)}
					</div>
				)}
			</section>
		</div>
	)
}
