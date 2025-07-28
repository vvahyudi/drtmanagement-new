import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Tentang | DRT Entertainment",
}

export default function AboutPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 py-12 px-4">
			<div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
					Tentang DRT Entertainment
				</h1>
				<p className="mb-6 text-lg text-slate-200">
					DRT Entertainment adalah platform digital yang menyediakan solusi
					broadcasting, live entertainment, dan talent management untuk era
					modern. Kami mendukung kreativitas tanpa batas di dunia live
					streaming.
				</p>
				<div className="space-y-8">
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-blue-300">Visi</h2>
						<p className="text-slate-100">
							Menjadi ekosistem digital terdepan untuk live entertainment dan
							talent management di Indonesia.
						</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-purple-300">
							Misi
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>Mendukung pertumbuhan talenta digital.</li>
							<li>
								Menyediakan layanan top up, partnership, dan rekrutmen talent.
							</li>
							<li>Menghadirkan pengalaman digital yang aman dan inovatif.</li>
						</ul>
					</section>
				</div>
				<p className="mt-12 text-sm text-slate-400 text-center">
					© {new Date().getFullYear()} DRT Entertainment. Semua hak dilindungi.
				</p>
			</div>
		</div>
	)
}
