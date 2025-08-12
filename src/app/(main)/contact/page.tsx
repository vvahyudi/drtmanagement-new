import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Kontak | DRT Entertainment",
}

const CONTACT_INFO = [
	{
		title: "Email",
		colorClass: "text-blue-300",
		value: "support@drtentertainment.com",
	},
	{
		title: "WhatsApp",
		colorClass: "text-purple-300",
		value: "+62 823-2250-3101",
	},
	{
		title: "Alamat",
		colorClass: "text-pink-300",
		value:
			"Perum Pesona Satelit Blok M No. 17 Desa Kolor, Kec. Kota Sumenep, Kabupaten Sumenep, Jawa Timur 69417",
	},
]

export default function ContactPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 py-12 px-4">
			<div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
				<h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
					Kontak Kami
				</h1>
				<p className="mb-6 text-lg text-slate-200">
					Hubungi tim DRT Entertainment untuk pertanyaan, kerjasama, atau
					bantuan layanan. Kami siap membantu Anda 24/7 melalui customer
					service.
				</p>
				<div className="space-y-8">
					{CONTACT_INFO.map((info) => (
						<section key={info.title}>
							<h2 className={`text-2xl font-semibold mb-2 ${info.colorClass}`}>
								{info.title}
							</h2>
							<p className="text-slate-100 max-w-sm">{info.value}</p>
						</section>
					))}
				</div>
				<p className="mt-12 text-sm text-slate-400 text-center">
					© {new Date().getFullYear()} DRT Entertainment. Semua hak dilindungi.
				</p>
			</div>
		</div>
	)
}
