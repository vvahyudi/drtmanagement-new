"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import { memo, type ReactNode } from "react"

interface PageTransitionProps {
	children: ReactNode
	className?: string
}

const PageTransition = memo<PageTransitionProps>(
	({ children, className = "" }) => {
		const pathname = usePathname()

		return (
			<AnimatePresence mode="wait">
				<div key={pathname} className={className}>
					<motion.div
						initial={{ opacity: 1 }}
						animate={{
							opacity: 0,
							transition: {
								delay: 0.8,
								duration: 0.6,
								ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother animation
							},
						}}
						className="fixed inset-0 z-50 bg-gradient-to-br from-primary via-primary/90 to-primary/80 pointer-events-none"
						style={{
							backdropFilter: "blur(2px)",
						}}
					/>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								delay: 0.4,
								duration: 0.8,
								ease: [0.22, 1, 0.36, 1],
							},
						}}
						exit={{
							opacity: 0,
							y: -20,
							transition: { duration: 0.4 },
						}}
					>
						{children}
					</motion.div>
				</div>
			</AnimatePresence>
		)
	},
)

PageTransition.displayName = "PageTransition"

export default PageTransition
