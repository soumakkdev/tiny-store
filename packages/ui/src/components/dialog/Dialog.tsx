import { cn } from '@/lib/utils'
import { Dialog as DialogRoot, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { Fragment, ReactNode } from 'react'

export interface DialogProps {
	open: boolean
	onClose: () => void
	children: ReactNode
	contentClassName?: string
	showCross?: boolean
}

const Dialog = (props: DialogProps) => {
	const { open, onClose, showCross, children, contentClassName } = props
	return (
		<Transition.Root show={open} as={Fragment}>
			<DialogRoot as="div" className="relative z-40" open={open} onClose={onClose}>
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

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogRoot.Panel
								className={cn(
									'relative transform overflow-hidden rounded-lg max-w-lg bg-popover p-5 text-left shadow-xl border transition-all sm:my-8 sm:w-full',
									contentClassName
								)}
							>
								<div className="space-y-4">{children}</div>

								{showCross && (
									<button
										onClick={onClose}
										className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
									>
										<X className="h-4 w-4" />
										<span className="sr-only">Close</span>
									</button>
								)}
							</DialogRoot.Panel>
						</Transition.Child>
					</div>
				</div>
			</DialogRoot>
		</Transition.Root>
	)
}

interface IDialogHeader extends React.HTMLAttributes<HTMLDivElement> {
	title?: string
	titleClassName?: string
}

const DialogHeader = ({ className, children, title, titleClassName, ...props }: IDialogHeader) => (
	<div className={cn('flex text-center sm:text-left', className)} {...props}>
		{children ? <>{children}</> : <DialogTitle className={titleClassName}>{title}</DialogTitle>}
	</div>
)

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<DialogRoot.Title className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
)

export { Dialog, DialogFooter, DialogHeader, DialogTitle }
