import { cn } from '@/lib/utils'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, ReactNode } from 'react'

interface IDrawer {
	open: boolean
	onClose: () => void
	children: ReactNode
	title?: string
	className?: string
	width?: 'md' | 'lg' | 'xl' | '2xl'
}

export const Drawer = (props: IDrawer) => {
	const { open, onClose, children, title, width } = props
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="tw-relative tw-z-40" onClose={() => onClose()}>
				<Transition.Child
					as={Fragment}
					enter="tw-ease-out tw-duration-300"
					enterFrom="tw-opacity-0"
					enterTo="tw-opacity-100"
					leave="tw-ease-in tw-duration-200"
					leaveFrom="tw-opacity-100"
					leaveTo="tw-opacity-0"
				>
					<div className="tw-fixed tw-inset-0 tw-bg-background/80 tw-backdrop-blur-sm tw-bg-opacity-75 tw-transition-opacity" />
				</Transition.Child>

				<div className="tw-fixed tw-inset-0 tw-overflow-hidden">
					<div className="tw-absolute tw-inset-0 tw-overflow-hidden">
						<div className="tw-pointer-events-none tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10">
							<Transition.Child
								as={Fragment}
								enter="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
								enterFrom="tw-translate-x-full"
								enterTo="tw-translate-x-0"
								leave="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
								leaveFrom="tw-translate-x-0"
								leaveTo="tw-translate-x-full"
							>
								<Dialog.Panel className={cn('tw-pointer-events-auto tw-w-screen', width ? `tw-max-w-${width}` : 'tw-max-w-lg')}>
									<div className="tw-flex tw-h-full tw-flex-col tw-bg-popover tw-py-4 tw-shadow-xl">
										<div className="tw-px-4 sm:tw-px-6 tw-flex tw-items-start tw-justify-between">
											{title ? (
												<Dialog.Title className="tw-text-base tw-font-semibold tw-leading-6">{title}</Dialog.Title>
											) : null}

											<div className="tw-ml-3 tw-flex tw-h-7 tw-items-center">
												<button
													onClick={onClose}
													className="tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground"
												>
													<X className="tw-h-4 tw-w-4" />
													<span className="tw-sr-only">Close</span>
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
