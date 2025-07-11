"use client"

import React, { useState } from "react"
import { RefreshCw, Sparkles, Gift, Image as ImageIcon } from "lucide-react"
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
		rewardBeforeConvert?: number
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
		const rewardBeforeConvert = Math.round(rewardRaw)
		const rewardFinal =
			type === "cash" ? rewardBeforeConvert : Math.round(rewardRaw * 0.8)

		setRewardResult({
			target: Math.round(target),
			reward: rewardFinal,
			type,
			rewardBeforeConvert,
		})
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
				setOcrError("Gagal ekstrak data dari gambar. Coba upload ulang.")
			} finally {
				setOcrLoading(false)
			}
		}
	}

	return (
		<div className="max-w-md mx-auto p-4 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 shadow-2xl backdrop-blur-sm">
			<header className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-lg text-center mb-6 shadow-lg">
				<div className="inline-flex p-3 rounded-full bg-white/20 mb-3 shadow-md">
					<Sparkles className="w-6 h-6 text-white" />
				</div>
				<h2 className="text-2xl font-bold text-white">
					Kalkulator Reward DUKU
				</h2>
				<p className="text-white/90">
					Hitung Reward manual atau dari gambar secara otomatis
				</p>
			</header>

			<section className="space-y-6">
				<div className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
					<label className="block text-sm font-medium text-teal-300 mb-2 flex items-center gap-2">
						<ImageIcon className="w-4 h-4" /> Upload Screenshot (OCR)
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleOcrUpload}
						className="block w-full text-sm text-white bg-gray-700/50 rounded-md border border-white/10 file:bg-white/10 file:border-0 file:px-4 file:py-2 file:text-white file:text-sm file:font-medium hover:file:bg-white/20 transition-colors cursor-pointer"
					/>
					{ocrLoading && (
						<p className="text-sm text-yellow-300 mt-2 animate-pulse">
							Sedang ekstrak data dari gambar...
						</p>
					)}
					{ocrError && <p className="text-sm text-red-300 mt-2">{ocrError}</p>}
				</div>

				<div className="space-y-4">
					{(
						[
							["Lucky Gift Points", lucky, setLucky],
							["S-Lucky Gift Points", sLucky, setSLucky],
							["Deluxe Gift Points", deluxe, setDeluxe],
						] as [
							string,
							string,
							React.Dispatch<React.SetStateAction<string>>,
						][]
					).map(([label, value, setter]) => (
						<div key={label}>
							<label className="block text-sm font-medium text-gray-300 mb-1">
								{label}
							</label>
							<input
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								value={value}
								onChange={(e) => handleInputChange(e, setter)}
								placeholder="misal: 1.000.000"
								className="w-full px-4 py-2.5 bg-gray-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
							/>
						</div>
					))}
				</div>

				<div className="flex gap-3">
					<button
						onClick={calculateAll}
						className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg font-bold hover:brightness-110 transition-all"
					>
						Hitung
					</button>
					<button
						onClick={resetAll}
						className="flex-1 bg-gray-700/50 border border-white/10 text-gray-300 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
					>
						<RefreshCw className="w-4 h-4" /> Reset
					</button>
				</div>

				{(incomeResult || rewardResult) && (
					<div className="bg-gray-800/50 rounded-lg p-1 border border-white/10">
						<div className="flex">
							{[
								{
									tab: "income",
									label: (
										<>
											<Sparkles className="w-4 h-4 mr-1.5" />
											INCOME
										</>
									),
								},
								{
									tab: "reward",
									label: (
										<>
											<Gift className="w-4 h-4 mr-1.5" />
											REWARD
										</>
									),
								},
							].map(({ tab, label }) => (
								<button
									key={tab}
									onClick={() => setDisplayTab(tab as any)}
									className={`flex-1 py-2 rounded-md transition-all font-medium text-sm flex items-center justify-center ${
										displayTab === tab
											? "bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white shadow"
											: "text-gray-300 hover:text-white"
									}`}
								>
									{label}
								</button>
							))}
						</div>

						<div className="p-3">
							{displayTab === "income" && incomeResult && (
								<div className="space-y-2.5">
									<ResultItem
										label="Target Lucky Gift"
										value={formatNumber(incomeResult.luckyTarget)}
									/>
									<ResultItem
										label="Target S-Lucky Gift"
										value={formatNumber(incomeResult.sLuckyTarget)}
									/>
									<ResultItem
										label="Target Deluxe Gift"
										value={formatNumber(incomeResult.deluxeTarget)}
									/>
									<div className="h-px bg-white/10 my-2"></div>
									<ResultItem
										label="Total Target"
										value={formatNumber(incomeResult.totalTarget)}
										bold
									/>
									<ResultItem
										label="Total Income"
										value={formatNumber(incomeResult.finalIncome)}
										bold
										accent
									/>
								</div>
							)}

							{displayTab === "reward" && rewardResult && (
								<div className="space-y-2.5">
									<ResultItem
										label="Target Reward Points"
										value={formatNumber(rewardResult.target)}
									/>

									<div className="bg-gray-700/30 p-3 rounded-lg border border-white/10">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-300">
												Reward Final (
												{rewardResult.type === "cash" ? "Rupiah" : "Coins"})
											</span>
											<span
												className={`text-sm font-bold ${
													rewardResult.type === "cash"
														? "text-emerald-400"
														: "text-amber-300"
												}`}
											>
												{formatNumber(rewardResult.reward)}
											</span>
										</div>
										{rewardResult.type === "topup" ? (
											<div className="mt-2 space-y-1 text-xs text-amber-200/80">
												<p>
													Reward <b>sebelum konversi</b>:{" "}
													<span className="font-medium text-white">
														Rp
														{formatNumber(
															rewardResult.rewardBeforeConvert || 0,
														)}
													</span>
												</p>
												<p>
													Reward <b>setelah konversi (80%)</b>:{" "}
													<span className="font-medium text-white">
														{formatNumber(rewardResult.reward)}
													</span>{" "}
													koin
												</p>
												<p className="mt-1.5 pt-1.5 border-t border-white/10">
													Reward di bawah Rp100.000 akan otomatis dikonversi
													menjadi <b>koin (80%)</b>
												</p>
											</div>
										) : (
											<p className="text-xs text-emerald-300/80 mt-1.5 pt-1.5 border-t border-white/10">
												Reward di atas Rp100.000 akan dibayarkan dalam bentuk{" "}
												<b>uang tunai (cash)</b>
											</p>
										)}
									</div>

									<ResultItem
										label="Tipe Reward"
										value={
											rewardResult.type === "cash"
												? "Cash (Tunai)"
												: "Topup (Koin)"
										}
										valueColor={
											rewardResult.type === "cash"
												? "text-emerald-400"
												: "text-amber-300"
										}
									/>
								</div>
							)}
						</div>
					</div>
				)}
			</section>
		</div>
	)
}

function ResultItem({
	label,
	value,
	bold = false,
	accent = false,
	valueColor = "",
}: {
	label: string
	value: string
	bold?: boolean
	accent?: boolean
	valueColor?: string
}) {
	return (
		<div className="flex justify-between items-center">
			<span
				className={`text-sm ${bold ? "font-semibold" : "font-medium"} ${
					accent ? "text-teal-300" : "text-gray-300"
				}`}
			>
				{label}
			</span>
			<span
				className={`text-sm ${bold ? "font-bold" : "font-semibold"} ${
					valueColor || (accent ? "text-white" : "text-white")
				}`}
			>
				{value}
			</span>
		</div>
	)
}
