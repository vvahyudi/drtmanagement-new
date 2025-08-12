"use client"

import Link from "next/link"
import { motion } from "motion/react"

export default function NotFound() {
	return (
		<main className="relative min-h-[80vh] overflow-hidden bg-background">
			{/* soft animated blobs (background) */}
			<motion.div
				aria-hidden
				className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(60% 60% at 50% 50%, hsl(var(--primary)/.35), transparent)",
				}}
				animate={{ y: [0, 12, 0], x: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
				transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
			/>
			<motion.div
				aria-hidden
				className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
				style={{
					background:
						"radial-gradient(60% 60% at 50% 50%, hsl(var(--secondary)/.3), transparent)",
				}}
				animate={{ y: [0, -10, 0], x: [0, -6, 0], opacity: [0.6, 0.9, 0.6] }}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
			/>

			<section className="relative z-10 mx-auto grid max-w-3xl place-items-center px-6 py-20 text-center">
				{/* 404 headline */}
				<motion.h1
					className="text-7xl font-extrabold tracking-tight md:text-8xl"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
						404
					</span>
				</motion.h1>

				{/* tagline */}
				<motion.p
					className="mt-4 max-w-xl text-balance text-base text-muted-foreground md:text-lg"
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.45 }}
				>
					Halaman yang kamu cari tidak ditemukan. Mungkin sudah dipindahkan atau
					URL-nya salah.
				</motion.p>

				{/* subtle underline pulse */}
				<motion.div
					aria-hidden
					className="mt-6 h-px w-24 rounded bg-gradient-to-r from-transparent via-border to-transparent"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ delay: 0.25, duration: 0.5 }}
				/>

				{/* action card */}
				<motion.div
					className="mt-8 w-full rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.25, duration: 0.5 }}
				>
					<div className="mx-auto flex max-w-lg flex-col items-center gap-3">
						<p className="text-sm text-muted-foreground">
							Kamu bisa kembali ke beranda atau lanjutkan pencarian.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-3">
							<Link
								href="/"
								className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								← Kembali ke Beranda
							</Link>
							<Link
								href="/search"
								className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								Cari sesuatu
							</Link>
						</div>
					</div>
				</motion.div>

				{/* tiny floating dot accent */}
				<motion.div
					aria-hidden
					className="mt-10 h-2 w-2 rounded-full bg-primary/70"
					animate={{ y: [0, -6, 0], opacity: [0.8, 1, 0.8] }}
					transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
				/>
			</section>
		</main>
	)
}
