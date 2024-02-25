import { atom, useAtom } from 'jotai'
import { Menu } from 'lucide-react'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

export const isSidebarOpenAtom = atom(false)

interface ILayout {
	title: string
	children: ReactNode
	action?: ReactNode
}

export default function Layout({ children, title, action }: ILayout) {
	const [sidebarOpen, setSidebarOpen] = useAtom(isSidebarOpenAtom)

	return (
		<div className="h-full">
			<Sidebar />

			<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
				<button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
					<span className="sr-only">Open sidebar</span>
					<Menu className="h-6 w-6" aria-hidden="true" />
				</button>
				<div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
				<a href="#">
					<span className="sr-only">Your profile</span>
					<img
						className="h-8 w-8 rounded-full bg-gray-800"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</a>
			</div>

			<main className="lg:pl-72 h-full">
				<div className="px-4 sm:px-6 py-6 h-full">
					<header className="mb-4 flex items-center justify-between">
						<h1 className="font-bold text-2xl">{title}</h1>

						{action ? <div className="flex items-center gap-2">{action}</div> : null}
					</header>
					{children}
				</div>
			</main>
		</div>
	)
}
