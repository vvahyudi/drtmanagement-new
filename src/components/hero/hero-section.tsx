"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/hero/animated-group"

const transitionVariants = {
	item: {
		hidden: {
			opacity: 0,
			filter: "blur(12px)",
			y: 12,
		},
		visible: {
			opacity: 1,
			filter: "blur(0px)",
			y: 0,
			transition: {
				type: "spring" as const,
				bounce: 0.3,
				duration: 1.5,
			},
		},
	},
} as const

import { NewHeader } from "@/components/hero/new-header"

export function HeroSection() {
	return (
		<>
			<NewHeader />
			<main className="overflow-hidden">
				<div
					aria-hidden
					className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block"
				>
					<div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
					<div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
					<div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
				</div>
				<section>
					<div className="relative pt-24 md:pt-36">
						<AnimatedGroup
							variants={{
								container: {
									visible: {
										transition: {
											delayChildren: 1,
										},
									},
								},
								item: {
									hidden: {
										opacity: 0,
										y: 20,
									},
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											type: "spring" as const,
											bounce: 0.3,
											duration: 2,
										},
									},
								},
							}}
							className="absolute inset-0 -z-20"
						>
							<Image
								src="/night-background.webp"
								alt="background"
								className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
								width={2184}
								height={2730}
								priority
								quality={100}
								sizes="(min-width: 1024px) 100vw, 0vw"
							/>
							<Image
								src="/light-background.jpg"
								alt="background"
								className="absolute inset-x-0 top-56 -z-20 block lg:top-32 dark:hidden"
								width={2184}
								height={2730}
								priority
								quality={100}
								sizes="(min-width: 1024px) 100vw, 0vw"
							/>
						</AnimatedGroup>
						<div
							aria-hidden
							className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
						/>
						<div className="mx-auto max-w-7xl px-6">
							<div className="text-center sm:mx-auto text-foreground lg:mr-auto lg:mt-0">
								<AnimatedGroup
									variants={{
										container: undefined,
										item: transitionVariants.item,
									}}
								>
									<Link
										href="#link"
										className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
									>
										<span className="text-foreground text-sm">
											⭐ Promo Cashback 5% – Cuma di DRT!
										</span>
										<span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

										<div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
											<div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
												<span className="flex size-6">
													<ArrowRight className="m-auto size-3" />
												</span>
												<span className="flex size-6">
													<ArrowRight className="m-auto size-3" />
												</span>
											</div>
										</div>
									</Link>

									<h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
										Top Up Koin Livestreaming Murah, Cepat, & Terpercaya
									</h1>
									<p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
										Dapatkan koin Rivo, Dazz, Duku, Mico & lainnya dengan harga
										termurah, proses instan 24 jam, dan dukungan pembayaran
										paling lengkap. Cukup isi ID, pilih nominal, bayar—koin
										langsung masuk!
									</p>
								</AnimatedGroup>

								<AnimatedGroup
									variants={{
										container: {
											visible: {
												transition: {
													staggerChildren: 0.05,
													delayChildren: 0.75,
												},
											},
										},
										item: transitionVariants.item,
									}}
									className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
								>
									<div
										key={1}
										className="bg-foreground/10 rounded-[14px] border p-0.5"
									>
										<Button
											asChild
											size="lg"
											className="rounded-xl px-5 text-base"
										>
											<Link href="/topup">
												<span className="text-nowrap">Top Up Sekarang</span>
											</Link>
										</Button>
									</div>
									<Button
										key={2}
										asChild
										size="lg"
										variant="ghost"
										className="h-10.5 rounded-xl px-5"
									>
										<Link href="#link">
											<span className="text-nowrap">Join Talent</span>
										</Link>
									</Button>
								</AnimatedGroup>
							</div>
						</div>

						<AnimatedGroup
							variants={{
								container: {
									visible: {
										transition: {
											staggerChildren: 0.05,
											delayChildren: 0.75,
										},
									},
								},
								item: transitionVariants.item,
							}}
						>
							<div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
								<div
									aria-hidden
									className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
								/>
								<div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
									<Image
										className="bg-background  aspect-15/8 relative hidden rounded-2xl dark:block"
										src="/hero-banner.jpg"
										alt="app screen"
										width={2700}
										height={1440}
										priority
										quality={100}
										sizes="(min-width: 1024px) 100vw, 0vw"
									/>
									<Image
										className="bg-background border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
										src="/hero-banner.jpg"
										alt="app screen"
										width={2700}
										height={1440}
										priority
										quality={100}
										sizes="(min-width: 1024px) 100vw, 0vw"
									/>
								</div>
							</div>
						</AnimatedGroup>
					</div>
				</section>
				<section className="bg-background pb-16 pt-16 md:pb-32">
					<div className="group relative m-auto max-w-5xl px-6">
						<div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
							<Link
								href="/"
								className="block text-sm duration-150 hover:opacity-75"
							>
								<span> Pilihan Metode Pembayaran</span>

								<ChevronRight className="ml-1 inline-block size-3" />
							</Link>
						</div>
						<div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 sm:gap-x-16 sm:gap-y-14">
							{[
								{ src: "/payment/bca.png", alt: "Bank BCA" },
								{ src: "/payment/mandiri.png", alt: "Bank Mandiri" },
								{ src: "/payment/bri.png", alt: "Bank BRI" },
								{ src: "/payment/bni.png", alt: "Bank BNI" },
								{ src: "/payment/qris.png", alt: "QRIS" },
								{ src: "/payment/gopay.png", alt: "Gopay" },
								{ src: "/payment/ovo.png", alt: "OVO" },
								{ src: "/payment/dana.png", alt: "Dana" },
							].map((logo) => (
								<div
									key={logo.alt}
									className="flex items-center justify-center"
								>
									<Image
										src={logo.src}
										alt={logo.alt}
										width={80}
										height={40}
										className="h-10 w-auto"
										priority={logo.src === "/payment/bca.png"}
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
