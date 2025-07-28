// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client"

import AutoScroll from "embla-carousel-auto-scroll"

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

interface Logo {
	id: string
	description: string
	image: string
	className?: string
}

interface Logos3Props {
	heading?: string
	subheading?: string
	logos?: Logo[]
	className?: string
}

const AcceptPayment = ({
	heading = "Metode Pembayaran",
	subheading = "Kami menerima berbagai metode pembayaran untuk kenyamanan Anda.",
	logos = [
		{
			id: "logo-1",
			description: "Logo 1",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-2",
			description: "Logo 2",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-3",
			description: "Logo 3",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-4",
			description: "Logo 4",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-5",
			description: "Logo 5",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-6",
			description: "Logo 6",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/supabase-wordmark.svg",
			className: "h-7 w-auto",
		},
		{
			id: "logo-7",
			description: "Logo 7",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-wordmark.svg",
			className: "h-4 w-auto",
		},
		{
			id: "logo-8",
			description: "Logo 8",
			image:
				"https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-wordmark.svg",
			className: "h-7 w-auto",
		},
	],
}: Logos3Props) => {
	return (
		<section className="py-20">
			<div className="flex flex-col items-center justify-center text-center">
				<h1 className="my-6 text-2xl font-bold text-accent text-pretty lg:text-4xl">
					{heading}
				</h1>
				<p className="mb-12 text-lg text-muted-foreground">{subheading}</p>
			</div>
			<div className="pt-10 md:pt-16 lg:pt-20">
				<div className="relative mx-auto flex items-center justify-center lg:max-w-5xl w-full overflow-x-hidden z-[10]">
					<Carousel
						opts={{ loop: true }}
						plugins={[AutoScroll({ playOnInit: true })]}
					>
						<CarouselContent className="ml-0">
							{logos.map((logo) => (
								<CarouselItem
									key={logo.id}
									className="flex basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 justify-center pl-0"
								>
									<div className="mx-6 flex shrink-0 items-center justify-center">
										<div>
											<Image
												src={logo.image}
												alt={logo.description}
												className={logo.className}
												width={100}
												height={100}
											/>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
					<div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gradient-deep-space-alt to-transparent pointer-events-none z-[5]"></div>
					<div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gradient-deep-space-alt to-transparent pointer-events-none z-[5]"></div>
				</div>
			</div>
		</section>
	)
}

export { AcceptPayment }
