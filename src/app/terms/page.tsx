import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Ketentuan Layanan | DRT Entertainment",
}

export default function TermsPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 py-12 px-4">
			<div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
					Ketentuan Layanan
				</h1>
				<p className="mb-6 text-lg text-slate-200">
					Dengan menggunakan layanan DRT Entertainment, Anda setuju untuk
					mematuhi seluruh syarat dan ketentuan yang berlaku berikut ini.
				</p>
				<div className="space-y-8">
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-blue-300">
							1. Penggunaan Layanan
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>
								Layanan hanya boleh digunakan untuk tujuan yang sah dan sesuai
								hukum.
							</li>
							<li>
								Pelanggaran terhadap ketentuan dapat berakibat penghentian
								akses.
							</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-purple-300">
							2. Akun & Keamanan
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>
								Pengguna bertanggung jawab atas keamanan akun dan data pribadi.
							</li>
							<li>
								Segala aktivitas yang terjadi pada akun menjadi tanggung jawab
								pengguna.
							</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-pink-300">
							3. Transaksi & Pembayaran
						</h2>
						<ul className="list-disc ml-6 text-slate-100">
							<li>
								Semua transaksi harus dilakukan melalui kanal resmi DRT
								Entertainment.
							</li>
							<li>
								Pembayaran yang telah dilakukan tidak dapat dikembalikan kecuali
								ada kesalahan sistem.
							</li>
						</ul>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-blue-300">
							4. Perubahan Ketentuan
						</h2>
						<p className="text-slate-100">
							DRT Entertainment berhak mengubah ketentuan layanan sewaktu-waktu.
							Perubahan akan diumumkan melalui website resmi.
						</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold mb-2 text-purple-300">
							5. Kontak & Bantuan
						</h2>
						<p className="text-slate-100">
							Untuk pertanyaan atau bantuan, silakan hubungi customer service
							kami melalui halaman kontak.
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
