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
			<DialogRoot as="div" className="tw-relative tw-z-40" open={open} onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="tw-fixed tw-inset-0 tw-bg-background/80 tw-backdrop-blur-sm tw-bg-opacity-75 tw-transition-opacity" />
				</Transition.Child>

				<div className="tw-fixed tw-inset-0 tw-z-10 tw-w-screen tw-overflow-y-auto">
					<div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
						<Transition.Child
							as={Fragment}
							enter="tw-ease-out tw-duration-300"
							enterFrom="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
							enterTo="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
							leave="tw-ease-in tw-duration-200"
							leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
							leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
						>
							<DialogRoot.Panel
								className={cn(
									'tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-max-w-lg tw-bg-popover tw-p-5 tw-text-left tw-shadow-xl tw-border tw-transition-all sm:tw-my-8 sm:tw-w-full',
									contentClassName
								)}
							>
								<div className="tw-space-y-4">{children}</div>

								{showCross && (
									<button
										onClick={onClose}
										className="tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground"
									>
										<X className="tw-h-4 tw-w-4" />
										<span className="tw-sr-only">Close</span>
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
	<div className={cn('tw-flex tw-text-center sm:tw-text-left', className)} {...props}>
		{children ? <>{children}</> : <DialogTitle className={titleClassName}>{title}</DialogTitle>}
	</div>
)

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2', className)} {...props} />
)

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<DialogRoot.Title className={cn('tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight', className)} {...props} />
)

export { Dialog, DialogFooter, DialogHeader, DialogTitle }
