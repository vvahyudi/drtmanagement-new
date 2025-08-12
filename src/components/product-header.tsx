import Image from "next/image"

interface ProductHeaderProps {
	title: string
	subtitle: string
	icon: string
}

export function ProductHeader({ title, subtitle, icon }: ProductHeaderProps) {
	return (
		<div className="flex items-center gap-4 mb-8">
			<div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-1">
				<div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
					<Image
						src={icon || "/placeholder.svg"}
						alt={title}
						width={60}
						height={60}
						className="rounded-xl"
					/>
				</div>
			</div>
			<div>
				<h1 className="text-2xl font-bold text-primary dark:text-primary">
					{title}
				</h1>
				<p className="text-primary-primary/80 dark:text-primary/80">
					{subtitle}
				</p>
			</div>
		</div>
	)
}
