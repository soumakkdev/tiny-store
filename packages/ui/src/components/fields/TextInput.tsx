import { ReactNode } from 'react'
import { Input as InputBase, InputProps as InputBaseProps } from '../ui/input'
import { cn } from '@/lib/utils'

export interface TextInputProps extends InputBaseProps {
	startIcon?: ReactNode
	endIcon?: ReactNode
}

export function TextInput(props: TextInputProps) {
	const { startIcon, endIcon, ...rest } = props

	return (
		<div className="tw-relative tw-flex">
			{startIcon ? <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3">{startIcon}</span> : null}
			<InputBase
				{...rest}
				className={cn({
					'tw-pl-10': startIcon,
					'tw-pr-10': endIcon,
				})}
			/>
			{endIcon ? <span className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-3">{endIcon}</span> : null}
		</div>
	)
}

TextInput.Action = ({ icon }: { icon: ReactNode }) => {
	return (
		<button
			className={cn(
				'tw-h-5 tw-w-5 tw-inline-flex tw-items-center tw-justify-center tw-rounded-md hover:tw-bg-accent hover:tw-text-accent-foreground'
			)}
		>
			{icon}
		</button>
	)
}
