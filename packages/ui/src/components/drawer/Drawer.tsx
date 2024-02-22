import { cn } from '@/lib/utils'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, ReactNode } from 'react'

interface IDrawer {
	open: boolean
	onClose: () => void
	children: ReactNode
	title: string
	className?: string
	width?: 'md' | 'lg' | 'xl' | '2xl'
}

export const Drawer = (props: IDrawer) => {
	const { open, onClose, children, title, width } = props
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-40" onClose={() => onClose()}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-background/80 backdrop-blur-sm bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className={cn('pointer-events-auto w-screen', width ? `max-w-${width}` : 'max-w-lg')}>
									<div className="flex h-full flex-col bg-popover py-4 shadow-xl">
										<div className="px-4 sm:px-6 flex items-start justify-between">
											<Dialog.Title className="text-base font-semibold leading-6">{title}</Dialog.Title>

											<div className="ml-3 flex h-7 items-center">
												<button
													onClick={onClose}
													className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
												>
													<X className="h-4 w-4" />
													<span className="sr-only">Close</span>
												</button>
											</div>
										</div>

										{children}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
