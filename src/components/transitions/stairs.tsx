"use client"

import { motion, type Variants } from "motion/react"
import { memo } from "react"

const TOTAL_STEPS = 8 // Increased for smoother effect
const STEP_DELAY = 0.08 // Reduced for faster, more fluid animation

const stairAnimation: Variants = {
	initial: {
		top: "0%",
		scaleY: 1,
	},
	animate: {
		top: "100%",
		scaleY: [1, 1.1, 1],
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
			scaleY: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	},
	exit: {
		top: ["100%", "0%"],
		scaleY: 1,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
}

const reverseIndex = (index: number): number => {
	return TOTAL_STEPS - index - 1
}

const Stairs = memo(() => {
	return (
		<>
			{Array.from({ length: TOTAL_STEPS }, (_, index) => (
				<motion.div
					key={index}
					variants={stairAnimation}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{
						duration: 0.5,
						ease: [0.22, 1, 0.36, 1],
						delay: reverseIndex(index) * STEP_DELAY,
					}}
					className="relative h-full w-full bg-gradient-to-b from-accent via-accent/90 to-accent/80 shadow-lg"
					style={{
						transformOrigin: "bottom",
						boxShadow:
							"inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.2)",
					}}
				>
					{/* Subtle highlight effect */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
						initial={{ x: "-100%" }}
						animate={{
							x: "100%",
							transition: {
								delay: reverseIndex(index) * STEP_DELAY + 0.2,
								duration: 0.8,
								ease: "easeOut",
							},
						}}
					/>
				</motion.div>
			))}
		</>
	)
})

Stairs.displayName = "Stairs"

export default Stairs
