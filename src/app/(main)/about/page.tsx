import { dmSerif } from "@/styles/font"
import { Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutPage() {
	return (
		<section className="flex flex-col bg-gradient-deep-space px-4 w-full justify-center items-center py-16 relative overflow-hidden">
			{/* Floating decorative elements */}
			<Sparkles className="absolute top-20 left-10 w-6 h-6 text-purple-300/30 animate-pulse" />
			<Zap className="absolute bottom-20 right-10 w-8 h-8 text-blue-300/30 animate-pulse delay-100" />

			<div className="relative max-w-2xl p-8 backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl shadow-2xl">
				{/* Background glow effect */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-2xl blur-xl opacity-30 -z-10" />

				<p className="text-white/80 text-lg text-center leading-relaxed">
					<span
						className={cn(
							dmSerif.className,
							"text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent",
						)}
					>
						DRT
					</span>{" "}
					<span
						className={cn(
							dmSerif.className,
							"text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent",
						)}
					>
						Management
					</span>{" "}
					merupakan agensi di bidang live streaming dan broadcasting, berfokus
					pada pengembangan bakat dan manajemen di platform seperti MICO, Dazz
					Live, TikTok, dll. Kami menyediakan dukungan kreatif, dan manajemen
					profesional untuk membantu para talent meraih kesuksesan di dunia
					digital.
				</p>

				{/* Decorative elements */}
				<div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
				<div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-300" />
			</div>
		</section>
	)
}
