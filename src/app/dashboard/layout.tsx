"use client"
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen bg-gray-50">
			{/* Sidebar - Fixed width and full height */}
			<aside className="w-64 fixed h-full bg-white border-r shadow-sm">
				<div className="flex flex-col h-full p-4">
					<div className="mb-8 p-2">
						<h2 className="text-xl font-bold text-gray-800">
							DRT Entertainment
						</h2>
					</div>

					<div className="flex-1">
						<div className="mb-6 p-2 flex items-center gap-3">
							<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
								<span className="text-gray-400 text-lg">👤</span>
							</div>
							<div>
								<p className="text-xs text-gray-500">Welcome</p>
								<p className="font-medium text-gray-800 truncate">Guest</p>
							</div>
						</div>
					</div>

					{/* Logout button disembunyikan karena tidak ada autentikasi */}
				</div>
			</aside>

			{/* Main content - Offset for sidebar */}
			<main className="flex-1 ml-64 p-6">{children}</main>
		</div>
	)
}
