"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Heart, Star, Sparkles } from "lucide-react"

export default function NotFound() {
	return (
		<div className="min-h-screen bg-gradient-deep-space flex items-center justify-center p-4 overflow-hidden relative">
			{/* Floating Elements Background */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="floating-hearts">
					<Heart
						className="absolute text-pink-300 opacity-60 animate-float-1"
						style={{ top: "10%", left: "10%" }}
					/>
					<Star
						className="absolute text-yellow-300 opacity-60 animate-float-2"
						style={{ top: "20%", right: "15%" }}
					/>
					<Sparkles
						className="absolute text-purple-300 opacity-60 animate-float-3"
						style={{ bottom: "20%", left: "20%" }}
					/>
					<Heart
						className="absolute text-red-300 opacity-60 animate-float-4"
						style={{ bottom: "30%", right: "25%" }}
					/>
					<Star
						className="absolute text-blue-300 opacity-60 animate-float-1"
						style={{ top: "60%", left: "80%" }}
					/>
				</div>
			</div>

			<Card className="w-full max-w-lg relative z-10 shadow-2xl border-0 bg-gradient-deep-space-alt backdrop-blur-sm">
				<CardContent className="pt-8 pb-8">
					<div className="text-center space-y-6">
						{/* Cute Character */}
						<div className="relative mx-auto w-48 h-48 mb-6">
							{/* Cat Body */}
							<div className="cat-container animate-bounce-gentle">
								<div className="cat-body bg-gradient-to-b from-orange-300 to-orange-400 w-32 h-24 rounded-full mx-auto relative">
									{/* Cat Stripes */}
									<div className="absolute top-2 left-4 w-6 h-1 bg-orange-500 rounded-full"></div>
									<div className="absolute top-4 left-6 w-4 h-1 bg-orange-500 rounded-full"></div>
									<div className="absolute top-2 right-4 w-6 h-1 bg-orange-500 rounded-full"></div>
									<div className="absolute top-4 right-6 w-4 h-1 bg-orange-500 rounded-full"></div>
								</div>

								{/* Cat Head */}
								<div className="cat-head bg-gradient-to-b from-orange-300 to-orange-400 w-28 h-28 rounded-full mx-auto -mt-6 relative">
									{/* Ears */}
									<div className="cat-ear-left absolute -top-3 left-2 w-6 h-8 bg-orange-400 rounded-full transform -rotate-12 animate-wiggle-left"></div>
									<div className="cat-ear-right absolute -top-3 right-2 w-6 h-8 bg-orange-400 rounded-full transform rotate-12 animate-wiggle-right"></div>

									{/* Inner Ears */}
									<div className="absolute -top-1 left-4 w-3 h-4 bg-pink-300 rounded-full transform -rotate-12"></div>
									<div className="absolute -top-1 right-4 w-3 h-4 bg-pink-300 rounded-full transform rotate-12"></div>

									{/* Eyes */}
									<div className="cat-eyes flex justify-center space-x-4 pt-6">
										<div className="eye-left relative">
											<div className="w-6 h-6 bg-black rounded-full animate-blink">
												<div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
											</div>
										</div>
										<div className="eye-right relative">
											<div className="w-6 h-6 bg-black rounded-full animate-blink">
												<div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
											</div>
										</div>
									</div>

									{/* Nose */}
									<div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full"></div>

									{/* Mouth */}
									<div className="absolute top-14 left-1/2 transform -translate-x-1/2">
										<div className="w-1 h-2 bg-black rounded-full"></div>
										<div className="absolute -left-2 top-2 w-4 h-0.5 bg-black rounded-full transform rotate-12"></div>
										<div className="absolute -right-1 top-2 w-4 h-0.5 bg-black rounded-full transform -rotate-12"></div>
									</div>

									{/* Whiskers */}
									<div className="whiskers">
										<div className="absolute top-10 -left-8 w-8 h-0.5 bg-gray-600 rounded-full animate-whisker-left"></div>
										<div className="absolute top-12 -left-6 w-6 h-0.5 bg-gray-600 rounded-full animate-whisker-left"></div>
										<div className="absolute top-10 -right-8 w-8 h-0.5 bg-gray-600 rounded-full animate-whisker-right"></div>
										<div className="absolute top-12 -right-6 w-6 h-0.5 bg-gray-600 rounded-full animate-whisker-right"></div>
									</div>
								</div>

								{/* Cat Tail */}
								<div className="cat-tail absolute -right-8 top-8 w-4 h-16 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full transform rotate-45 animate-tail-wag origin-top"></div>

								{/* Cat Paws */}
								<div className="cat-paws flex justify-center space-x-8 -mt-2">
									<div className="w-6 h-8 bg-orange-400 rounded-full"></div>
									<div className="w-6 h-8 bg-orange-400 rounded-full"></div>
								</div>
							</div>
						</div>

						{/* 404 Text with Animation */}
						<div className="relative">
							<h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse-gentle">
								4🐾4
							</h1>
							<div className="absolute -top-2 -right-2 animate-spin-slow">
								<Sparkles className="h-8 w-8 text-yellow-400" />
							</div>
						</div>

						{/* Cute Messages */}
						<div className="space-y-3">
							<h2 className="text-2xl font-bold text-accent animate-fade-in">
								Oops! Kucing ini tersesat! 🐱
							</h2>
							<p className="text-gray-600 leading-relaxed animate-fade-in-delay">
								Sepertinya halaman yang kamu cari sedang bermain petak umpet
								dengan kucing lucu ini. Jangan khawatir, kami akan membantumu
								menemukan jalan pulang!
								<span className="inline-block animate-bounce ml-1">🏠</span>
							</p>
						</div>

						{/* Interactive Buttons */}
						<div className="space-y-4 pt-4">
							<Button
								asChild
								className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
							>
								<Link href="/">
									<Home className="mr-2 h-4 w-4" />
									Antar Kucing Pulang 🏠
								</Link>
							</Button>
						</div>

						{/* Fun Facts */}
						<div className="pt-6 border-t border-pink-200">
							<p className="text-sm text-gray-500 mb-3 animate-fade-in-delay-2">
								💡 <strong>Fun Fact:</strong> Kucing bisa tidur 12-16 jam
								sehari!
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<style jsx>{`
				@keyframes float-1 {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-20px) rotate(180deg);
					}
				}

				@keyframes float-2 {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-30px) rotate(-180deg);
					}
				}

				@keyframes float-3 {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-25px) rotate(360deg);
					}
				}

				@keyframes float-4 {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-15px) rotate(90deg);
					}
				}

				@keyframes bounce-gentle {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
				}

				@keyframes blink {
					0%,
					90%,
					100% {
						transform: scaleY(1);
					}
					95% {
						transform: scaleY(0.1);
					}
				}

				@keyframes wiggle-left {
					0%,
					100% {
						transform: rotate(-12deg);
					}
					50% {
						transform: rotate(-20deg);
					}
				}

				@keyframes wiggle-right {
					0%,
					100% {
						transform: rotate(12deg);
					}
					50% {
						transform: rotate(20deg);
					}
				}

				@keyframes tail-wag {
					0%,
					100% {
						transform: rotate(45deg);
					}
					50% {
						transform: rotate(25deg);
					}
				}

				@keyframes whisker-left {
					0%,
					100% {
						transform: rotate(0deg);
					}
					50% {
						transform: rotate(-5deg);
					}
				}

				@keyframes whisker-right {
					0%,
					100% {
						transform: rotate(0deg);
					}
					50% {
						transform: rotate(5deg);
					}
				}

				@keyframes pulse-gentle {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.8;
					}
				}

				@keyframes spin-slow {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fade-in-delay {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes fade-in-delay-2 {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-float-1 {
					animation: float-1 6s ease-in-out infinite;
				}
				.animate-float-2 {
					animation: float-2 8s ease-in-out infinite;
				}
				.animate-float-3 {
					animation: float-3 7s ease-in-out infinite;
				}
				.animate-float-4 {
					animation: float-4 5s ease-in-out infinite;
				}
				.animate-bounce-gentle {
					animation: bounce-gentle 3s ease-in-out infinite;
				}
				.animate-blink {
					animation: blink 4s ease-in-out infinite;
				}
				.animate-wiggle-left {
					animation: wiggle-left 2s ease-in-out infinite;
				}
				.animate-wiggle-right {
					animation: wiggle-right 2s ease-in-out infinite;
				}
				.animate-tail-wag {
					animation: tail-wag 1.5s ease-in-out infinite;
				}
				.animate-whisker-left {
					animation: whisker-left 3s ease-in-out infinite;
				}
				.animate-whisker-right {
					animation: whisker-right 3s ease-in-out infinite;
				}
				.animate-pulse-gentle {
					animation: pulse-gentle 2s ease-in-out infinite;
				}
				.animate-spin-slow {
					animation: spin-slow 8s linear infinite;
				}
				.animate-fade-in {
					animation: fade-in 1s ease-out;
				}
				.animate-fade-in-delay {
					animation: fade-in-delay 1s ease-out 0.3s both;
				}
				.animate-fade-in-delay-2 {
					animation: fade-in-delay-2 1s ease-out 0.6s both;
				}
			`}</style>
		</div>
	)
}
