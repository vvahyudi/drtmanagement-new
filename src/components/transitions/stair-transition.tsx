"use client"

import { AnimatePresence, motion } from "motion/react"
import { usePathname } from "next/navigation"
import { memo } from "react"
import Stairs from "./stairs"

const StairTransition = memo(() => {
	const pathname = usePathname()

	return (
		<AnimatePresence mode="wait">
			<div key={pathname}>
				{/* Stairs container with improved positioning */}
				<div className="fixed inset-0 z-40 flex pointer-events-none">
					<Stairs />
				</div>

				{/* Enhanced overlay with gradient and blur effect */}
				<motion.div
					className="fixed inset-0 z-30 pointer-events-none bg-gradient-to-br from-primary via-primary/95 to-primary/90"
					initial={{ opacity: 1 }}
					animate={{
						opacity: 0,
						transition: {
							delay: 1.2,
							duration: 0.6,
							ease: [0.22, 1, 0.36, 1],
						},
					}}
					style={{
						backdropFilter: "blur(4px)",
					}}
				/>

				{/* Subtle glow effect */}
				<motion.div
					className="fixed inset-0 z-20 pointer-events-none bg-gradient-radial from-accent/20 via-transparent to-transparent"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{
						opacity: [0, 0.5, 0],
						scale: [0.8, 1.2, 1],
						transition: {
							duration: 1.5,
							ease: "easeOut",
						},
					}}
				/>
			</div>
		</AnimatePresence>
	)
})

StairTransition.displayName = "StairTransition"

export default StairTransition
