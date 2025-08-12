"use client"

import React, { memo } from "react"
import { NewHeader } from "../hero/new-header"
interface HeaderProps {
	className?: string
}

const Header = memo<HeaderProps>(({ className }) => {
	return (
		<header className={className}>
			{/* Desktop navigation */}
			<NewHeader />
			{/* Background decoration */}
		</header>
	)
})

Header.displayName = "Header"

export default Header
