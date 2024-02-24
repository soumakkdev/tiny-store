import { useAuth } from '@/lib/AuthContext'
import { Drawer, cn } from '@tiny/ui'
import { useAtom } from 'jotai'
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isSidebarOpenAtom } from './Layout'

const navigation = [
	{ name: 'Dashboard', href: '/', icon: LayoutDashboard, current: true },
	{ name: 'Products', href: '/products', icon: Package, current: false },
	{ name: 'Orders', href: '#', icon: ShoppingBag, current: false },
	{ name: 'Customers', href: '#', icon: Users, current: false },
]

export default function Sidebar() {
	const { logout } = useAuth()
	const { pathname } = useRouter()
	const [sidebarOpen, setSidebarOpen] = useAtom(isSidebarOpenAtom)

	return (
		<>
			<Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
				<div className="p-0 bg-surface1 text-white">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto  px-6 pb-2 ring-1 ring-white/10">
						<div className="flex h-16 shrink-0 items-center">
							<img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
						</div>
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-1">
										{navigation.map((item) => (
											<li key={item.name}>
												<Link
													href={item.href}
													className={cn(
														item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
														'group flex gap-x-3 rounded-md px-3 py-2 text-sm leading-6 font-semibold'
													)}
												>
													<item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
													{item.name}
												</Link>
											</li>
										))}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</Drawer>

			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
				<div className="flex grow flex-col gap-y-2 overflow-y-auto bg-surface1 px-6">
					<div className="flex h-16 shrink-0 items-center">
						<img className="h-16 w-auto" src="/icons/nike-logo.svg" alt="Nike" />
					</div>
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-1">
									{navigation.map((item) => {
										const isActive = pathname?.endsWith(item?.href)
										return (
											<li key={item.name}>
												<Link
													href={item.href}
													className={cn(
														isActive
															? 'bg-surface2 text-foreground'
															: 'text-foreground hover:text-foreground hover:bg-surface2',
														'group flex items-center gap-x-3 rounded-lg px-3 py-1 text-sm leading-6 font-medium'
													)}
												>
													<item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
													{item.name}
												</Link>
											</li>
										)
									})}
								</ul>
							</li>

							{/* <li className="-mx-6 mt-auto">
								<Button variant="secondary" onClick={() => logout()}>
									Log out
								</Button>
								<a
									href="#"
									className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
								>
									<img
										className="h-8 w-8 rounded-full bg-gray-800"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
									<span className="sr-only">Your profile</span>
									<span aria-hidden="true">Tom Cook</span>
								</a>
							</li> */}
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}
