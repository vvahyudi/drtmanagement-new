import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Kebijakan Layanan & Privasi | DRT Entertainment",
}

export default function PrivacyPolicyPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 py-12 px-4">
			<div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
					Kebijakan Layanan & Privasi
				</h1>
				<p className="mb-6 text-lg text-slate-200">
					DRT Entertainment berkomitmen untuk menjaga privasi dan keamanan data
					pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan,
					menggunakan, dan melindungi informasi Anda saat menggunakan layanan
					kami.
				</p>
				<div className="space-y-8">
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-blue-300">
							1. Informasi yang Dikumpulkan
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>
								Data akun dan identitas yang Anda berikan saat registrasi.
							</li>
							<li>
								Informasi transaksi, seperti top up dan pembelian layanan.
							</li>
							<li>Data komunikasi melalui customer service.</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-purple-300">
							2. Penggunaan Informasi
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>Memproses transaksi dan layanan yang Anda gunakan.</li>
							<li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
							<li>Menghubungi Anda terkait layanan, promo, atau pembaruan.</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-pink-300">
							3. Perlindungan Data
						</h2>
						<p className="text-slate-100">
							Kami menggunakan teknologi dan prosedur keamanan untuk melindungi
							data Anda dari akses tidak sah, perubahan, atau pengungkapan.
						</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-blue-300">
							4. Hak Pengguna
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>
								Anda dapat meminta akses, koreksi, atau penghapusan data pribadi
								Anda.
							</li>
							<li>Hubungi customer service untuk permintaan terkait data.</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-purple-300">
							5. Perubahan Kebijakan
						</h2>
						<p className="text-slate-100">
							Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan
							diumumkan melalui website DRT Entertainment.
						</p>
					</section>
				</div>
				<p className="mt-12 text-sm text-slate-400 text-center">
					© {new Date().getFullYear()} DRT Entertainment. Semua hak dilindungi.
				</p>
			</div>
		</div>
	)
}
