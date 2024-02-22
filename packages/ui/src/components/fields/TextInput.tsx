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
		<div className="relative flex">
			{startIcon ? <span className="absolute inset-y-0 left-0 flex items-center pl-3">{startIcon}</span> : null}
			<InputBase
				{...rest}
				className={cn({
					'pl-10': startIcon,
					'pr-10': endIcon,
				})}
			/>
			{endIcon ? <span className="absolute inset-y-0 right-0 flex items-center pr-3">{endIcon}</span> : null}
		</div>
	)
}

TextInput.Action = ({ icon }: { icon: ReactNode }) => {
	return (
		<button className={cn('h-5 w-5 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground')}>
			{icon}
		</button>
	)
}
